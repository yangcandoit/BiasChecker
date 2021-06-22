const puppeteer = require('puppeteer');
const saveResults = require('./save_results');

const newPage = async (browser) => {
    let page = await browser.newPage();

    await page.setViewport({
        width: 1200,
        height: 1500,
        deviceScaleFactor: 1,
    });

    return page;
};


const initAgent = (async (socket, agent) => {
    console.log('initAgent', agent.id)
    const browser = await puppeteer.launch({
        headless: true
    }); //{headless: false}
    let page = await newPage(browser);
    console.log('page created')
    let close = false;

    const platform = new(require(`../platforms/${agent.platform}`))(page, agent);
    console.log('1')
    socket.on('login', async (data) => {
        console.log('login');
        await platform.doLogin();
        console.log('logined')
        socket.emit('ack_login', {
            agent_id: agent.id
        })
    })

    socket.on('login_agent', async (agent_id) => {
        if (agent_id == agent.id)
            await platform.doLogin();
    })

    socket.on('run_query', async ({
        agent_id,
        query,
        date_intervals = [""],
        max_results,
        session_id,
        interval,
        cookie,
        wait
    }) => {
        // await page.close();
        if (agent_id != agent.id) return;
        page = await newPage(browser);
        platform.setNewPage(page);
        for (let date in date_intervals) {
            let term = query;
            if (date !== "") {
                term = `${query} ${date_intervals[date]}`;
            }
            if (query != '$carry-over$') {
                let results = await platform.doSearch(term, max_results, interval);

                saveResults(agent, session_id, term, results, interval);
                console.log('result saved')
            }

            if (wait == 't') {
                await new Promise(resolve => setTimeout(() => resolve(), interval));
            }
            if (cookie == 1) {
                console.log('cookie', agent_id, cookie)
                const client = await page.target().createCDPSession();
                await client.send('Network.clearBrowserCookies');
                await client.send('Network.clearBrowserCache');
            }
            page.close()

        }


        setTimeout(function () {
            console.log('delay 50s')
        }, 50000);
        socket.emit('end_query', {
            agent_id: agent.id,
            query
        });


    })

    socket.on('run_follow', async ({
        agent_id,
        profile
    }) => {
        if (agent_id != agent.id) return;
        console.log('run_follow', agent_id, profile);
        await platform.doFollow(profile);
        socket.emit('end_follow', {
            agent_id: agent.id,
            profile
        })
    })


    let init_socket = async (data) => {
        console.log('asdasdf')

        close = true;

        try {
            await page.close();
            await browser.close();
            console.log('browserclosed')
        } catch (e) {
            console.log(e)
        }
        socket.removeAllListeners('login');
        socket.removeAllListeners('login_agent');
        socket.removeAllListeners('run_query');
        socket.removeAllListeners('run_follow');
        socket.removeListener('init', init_socket);



    }

    socket.on('init', init_socket);

    socket.emit('ack_init_agent', agent.id);
    console.log('3')
    // await (async () => {

    //     while (!close) {
    //         if (page && page.screenshot) {

    //             try {
    //                 // console.log('screen' )
    //                 let image = await page.screenshot({
    //                     encoding: 'base64'
    //                 });

    //                 socket.emit('screenshot', {
    //                     id: agent.id,
    //                     data: image
    //                 });
    //                 // console.log('asd')
    //                 await page.waitFor(500);
    //             } catch (e) {
    //                 console.log(e)
    //                 await page.reload();
    //                 await new Promise((res, rej) => setTimeout(() => res(), 5000));
    //                 console.log('page closed... waiting new...')

    //                 try {
    //                     await page.reload(); // soft fix
    //                 } catch (recoveringErr) {
    //                     // break;
    //                     // unable to reload the page, hard fix
    //                     try {
    //                         await browser.close();
    //                     } catch (err) { // browser close was not necessary
    //                         // you might want to log this error
    //                         console.log(err)
    //                     }
    //                     const browser = await puppeteer.launch({
    //                         headless: false
    //                     }); //{headless: false}
    //                     page = await newPage(browser);
    //                 }
    //                 break;
    //             }

    //         }
    //     }
    // })();

    await (async () => {
        while (!close) {
            if (page && page.screenshot){
                try{
                    let image = await page.screenshot({ encoding: 'base64' });
                    socket.emit('screenshot', { id: agent.id, data: image });
                    await page.waitFor(500);
                }catch(e){
                    await new Promise((res,rej)=>setTimeout(()=>res(), 1000));
                    console.log('page closed... waiting new...')
                }

            }
        }
    })();

    console.log('FINISH AGENT!!');
});

module.exports = initAgent;