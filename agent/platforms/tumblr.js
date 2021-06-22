// GO TO BOTTOM
// document.children[0].scrollTo(0,document.children[0].scrollHeight)

// CAPTURE TWEETS WITH AS [TEXT_CONTENT, DATE]
// $$('div[lang]').map(e => [e.innerText, e.parentElement.querySelector('time') ? e.parentElement.querySelector('time').getAttribute('datetime') : null])




class TwitterSearch {
    constructor(page, agent) {
        this.page = page; // Puppeeter Page Object
        this.agent = agent;
        this.results = {};
    }

    setNewPage(page) {
        this.page = page;
    }

    async doLogin() {
        if (this.agent.username == '' || this.agent.password == '') {
            return;
        }
        // const EXPLORE_ANCHOR = 'input[id="header-search-bar"]';
        const LOGIN_INPUT_SELECTOR = 'input._1Byj7';
        const USE_PASSWORD_SELECTOR = 'span[class="_3dTPo"]';
        const PASSWORD_INPUT_SELECTOR = 'input[type="password"]';
        await this.page.goto('http://tumblr.com/login',{waitUntil: 'load', timeout: 0});
        await this.page.waitForSelector(LOGIN_INPUT_SELECTOR);
        await this.page.waitFor(1000);
        await this.page.type(LOGIN_INPUT_SELECTOR, this.agent.username, {
            delay: 50
        });
        await this.page.keyboard.press('Enter');
        await this.page.waitFor(1000);
        await this.page.click(USE_PASSWORD_SELECTOR);
        await this.page.waitFor(1000);
        await this.page.type(PASSWORD_INPUT_SELECTOR, this.agent.password, {
            delay: 50
        });
        await this.page.keyboard.press('Enter');
        // await this.page.waitForSelector(EXPLORE_ANCHOR);
        await this.page.waitFor(10000);

    }


    async doSearch(term, maxResults) {
        console.log('doSearch', term, 'maxResults: ', maxResults);
        await this.doQuery(term);


        await this.page.waitFor(1000);
        console.log('start fetch results');
        this.results = await this.fetchResults(term, maxResults);
        // console.log(this.results.posts);
        console.log('fetch results finished.');

        return this.results;
    }


    async doQuery(term) {
        // // MAKE QUERY
        // const EXPLORE_ANCHOR = 'a[href="/explore"]';
        const SEARCH_INPUT_SELECTOR = 'input[class="d6ZRB"]';

        await this.page.goto('https://www.tumblr.com/dashboard',{waitUntil: 'load', timeout: 0});
        // await this.page.waitForSelector(EXPLORE_ANCHOR);
        // await this.page.click(EXPLORE_ANCHOR);
        await this.page.waitForSelector(SEARCH_INPUT_SELECTOR);

        await this.page.type(SEARCH_INPUT_SELECTOR, term, {
            delay: 50
        });
        await this.page.keyboard.press('Enter');

        await this.page.waitFor(5000);
        console.log('query executed')
    }


    async fetchResults(term, maxResults) {

        let results = {};

        const RELATED = 'div._2jACg  a';

        const POST_SELECTOR = 'article';

        const PEOPLE_SELECTOR = 'a[class="_1SERh _3XjyH"]';

        try {
            await this.page.waitForSelector(RELATED, {
                timeout: 10000
            });
            await this.page.waitForSelector(POST_SELECTOR, {
                timeout: 10000
            });

            await this.page.waitForSelector(PEOPLE_SELECTOR, {
                timeout: 10000
            });

        } catch (e) {
            console.log(e);
            return [];
        }


        console.log('1');
        try {
            results.related = await this.page.evaluate(({
                maxResults,
                RELATED
            }) => {

                const Related = [];

                document.querySelectorAll(RELATED).forEach(e => {
                    let url = e.innerText;
                    Related.push(url);
                });
                console.log(Related);
                return Related;
            }, {
                maxResults,
                RELATED
            });
        } catch (e) {
            console.log(e)
        }


        console.log('2');
        try {
            results.people = await this.page.evaluate(({
                maxResults,
                PEOPLE_SELECTOR
            }) => {

                let d = document.querySelectorAll(PEOPLE_SELECTOR).length;

                console.log(d);
                console.log(maxResults);
                const NEXT_BUTTON = 'button[aria-label="Scroll carousel right"]';

                var e = document.createEvent("MouseEvents");
                e.initEvent("click", true, true);

                const People = [];
                // while(d<maxResults){
                //     // window.scrollTo(0, document.body.scrollHeight);
                //     document.querySelector('button[aria-label="Scroll carousel right"]').dispatchEvent(e);
                //     d=document.querySelectorAll(PEOPLE_SELECTOR).length;
                //     console.log(d);
                // }

                document.querySelectorAll(PEOPLE_SELECTOR).forEach(e => {
                    let url = e.href;
                    People.push(url);
                });
                console.log(People);
                return People;
            }, {
                maxResults,
                PEOPLE_SELECTOR
            });
        } catch (e) {
            console.log(e)
        }

        // console.log('3');
        try {
            results.posts = await this.page.evaluate(({
                maxResults,
                POST_SELECTOR
            }) => {

                let d = document.querySelectorAll(POST_SELECTOR).length;

                const Posts = {
                    'text': [],
                    'url': []
                };
                while (d < maxResults) {
                    window.scrollTo(0, document.body.scrollHeight);
                    d = document.querySelectorAll(POST_SELECTOR).length;
                }

                console.log(d)
                console.log(document.querySelectorAll(POST_SELECTOR))
                document.querySelectorAll(POST_SELECTOR).forEach(e => {
                    // let Link='div[class="L5OmD"] span[class="_1xyZl"] span[class="_1xyZl"] a[class="hVK3L"]';
                    let Link = 'header > div:nth-child(2)'
                    console.log(e);
                    // alert(e.querySelector(Link));
                    try {
                        Posts['url'].push(e.querySelector(Link).querySelector('a').href);
                        Posts['text'].push(e.innerText);
                    } catch (error) {
                        console.log(error)
                    }


                });
                // console.log(Posts);
                return Posts;
            }, {
                maxResults,
                POST_SELECTOR
            });

        } catch (e) {
            console.log(e)
        }


        return results;
    }

    // async fetchBestResults(term, maxResults) {
    //     const POST_SELECTOR = 'a[class="SQnoC3ObvgnGjWt90zD9Z _2INHSNB8V5eaWp4P0rY_mE"]'
    //     // const TOP_POSTS_ACROSS_REDDIT = 'div[data-click-id="post_carousel_item"]'
    //     const COMMUNITIES_SELECTOR ='a[class="_2D7eYuDY6cYGtybECmsxvE"]'
    //     try{

    //         // const COMMUNITIES_USERS_TAB ='div[class="_2torGbn_fNOMbGw3UAasPl"]'  

    //         await this.page.waitForSelector(POST_SELECTOR, {timeout:5000});
    //         await this.page.waitForSelector(COMMUNITIES_SELECTOR, {timeout:5000});

    //     }catch(e) {
    //         console.log('timeout... or other error...');
    //         return [];
    //     }


    //     let results = await this.page.evaluate(({COMMUNITIES_SELECTOR, POST_SELECTOR}) => {

    //         var topPost=[];
    //         var user=[];
    //         const m={topPost,user};
    //         document.querySelectorAll(POST_SELECTOR).forEach(e => {                       
    //             let url = e.href;
    //             m.topPost.push(url);                                
    //         });

    //         document.querySelectorAll(COMMUNITIES_SELECTOR).forEach(e => {                       
    //             let url = e.href;
    //             m.user.push(url);                                
    //         });

    //         return m;

    //     }, {COMMUNITIES_SELECTOR, POST_SELECTOR});
    //     // console.log(results);
    //     return results;

    // }

    // async fetchPost(term, maxResults) {

    //     const POST_SELECTOR = 'a[class="SQnoC3ObvgnGjWt90zD9Z _2INHSNB8V5eaWp4P0rY_mE"]';
    //     const POST_TAB = 'a[href$="type=link"]';

    //     try{
    //         await this.page.waitForSelector(POST_TAB);
    //         let TAB_ELEMENT = await this.page.$$(POST_TAB);
    //         await TAB_ELEMENT[0].tap();
    //         await this.page.waitFor(1000);            

    //         await this.page.waitForSelector(POST_SELECTOR, {timeout:5000});

    //     }catch(e){
    //         console.log(e);
    //         return [];
    //     }

    //     const results = await this.page.evaluate(({maxResults, POST_SELECTOR}) => {
    //         let previousHeight;
    //         let d=document.querySelectorAll(POST_SELECTOR).length;

    //         const Posts=[];
    //         while(d<maxResults){
    //             window.scrollTo(0, document.body.scrollHeight);
    //             d=document.querySelectorAll(POST_SELECTOR).length;
    //         }

    //         document.querySelectorAll(POST_SELECTOR).forEach(e => {                       
    //             let url = e.href;
    //             Posts.push(url);                           
    //         });
    //         console.log(Posts);
    //         return Posts;
    //     },{maxResults, POST_SELECTOR});
    //     // console.log(results);
    //     return results;        
    // }



    // async fetchCommunities(term, maxResults) {

    //     const COMMUNITIES_USERS_SELECTOR ='a[class="ei8_Bq_te0jjwNIqmk8Tw _12I4LEbhoIMSoIIXC_OHwT"]'
    //     const COMMUNITIES_USERS_TAB = 'a[href$="type=sr%2Cuser"]';

    //     try{
    //         await this.page.waitForSelector(COMMUNITIES_USERS_TAB);
    //         let TAB_ELEMENT = await this.page.$$(COMMUNITIES_USERS_TAB);

    //         await TAB_ELEMENT[0].tap();
    //         await this.page.waitFor(1000);

    //         await this.page.waitForSelector(COMMUNITIES_USERS_SELECTOR, {timeout:5000});

    //     }catch(e){
    //         console.log(e);
    //         return [];
    //     }


    //     const results = await this.page.evaluate(({COMMUNITIES_USERS_SELECTOR,COMMUNITIES_USERS_TAB}) => {

    //         const Communities_User=[];
    //         document.querySelectorAll(COMMUNITIES_USERS_SELECTOR).forEach(e => {                       
    //             let url = e.href;
    //             Communities_User.push(url);                                
    //         });

    //         return Communities_User;
    //     },{COMMUNITIES_USERS_SELECTOR,COMMUNITIES_USERS_TAB});

    //     // console.log(results);
    //     return results;
    // }

    async doFollow(profile) {

        const LIKE_BUTTON_SELECTOR = 'div[id="like_wrapper"]';

        const FOLLOW_BUTTON_SELECTOR = 'a[class="E7GmO _2MvlR M58hZ"]';

        if (profile.substring(0, 4) == "http") {
            await this.page.goto(`${profile}`);
            try {
                await this.page.waitFor(LIKE_BUTTON_SELECTOR, {
                    timeout: 5000
                });
                await this.page.click(LIKE_BUTTON_SELECTOR);
            } catch (e) {
                console.log('already followed')
            }
        } else {
            await this.page.goto(`https://www.tumblr.com/blog/view/${profile}`,{waitUntil: 'load', timeout: 0});
            try {
                await this.page.waitFor(FOLLOW_BUTTON_SELECTOR, {
                    timeout: 5000
                });
                await this.page.click(FOLLOW_BUTTON_SELECTOR);
            } catch (e) {
                console.log('already followed')
            }
        }


        await this.page.waitFor(5000);

    }

    csvHeader() {
        return [{
                id: 'content'
            },
            {
                id: 'datetime'
            },
        ]
    }


}

module.exports = TwitterSearch;