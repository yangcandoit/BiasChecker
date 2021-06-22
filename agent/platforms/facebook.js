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

    setNewPage(page){
        this.page = page;
    }

    async doLogin() {
        // const EXPLORE_ANCHOR = 'input[id="header-search-bar"]';
        const LOGIN_INPUT_SELECTOR = 'input[id="loginUsername"]';
        const PASSWORD_INPUT_SELECTOR = 'input[type="password"]';
        await this.page.goto('https://www.reddit.com/login/');
        await this.page.waitForSelector(LOGIN_INPUT_SELECTOR);
        await this.page.waitFor(500);
        await this.page.type(LOGIN_INPUT_SELECTOR, this.agent.username, {delay: 50});
        await this.page.keyboard.press('Tab');
        await this.page.waitFor(500);
        await this.page.type(PASSWORD_INPUT_SELECTOR, this.agent.password, {delay: 50});
        await this.page.keyboard.press('Enter');
        // await this.page.waitForSelector(EXPLORE_ANCHOR);
        await this.page.waitFor(10000);
    }


    async doSearch(term, maxResults) {
        console.log('doSearch', term, 'maxResults: ', maxResults);
        await this.doQuery(term);

        const POST_TAB = 'a[href$="type=link"]';
        const COMMUNITIES_USERS_TAB = 'a[href$="type=sr%2Cuser"]';
        
        console.log('start fetch results');
        this.results.best_result_tab = await this.fetchBestResults(term, maxResults);
        this.results.post_tab = await this.fetchPost(term, maxResults);
        this.results.communities_users_tab = await this.fetchCommunities(term, maxResults);

        console.log('fetch results finished.');

        return this.results;
    }


    async doQuery(term) {
        // // MAKE QUERY
        // const EXPLORE_ANCHOR = 'a[href="/explore"]';
        const SEARCH_INPUT_SELECTOR = 'input[type="search"]';
        
        await this.page.goto('https://www.reddit.com/');
        // await this.page.waitForSelector(EXPLORE_ANCHOR);
        // await this.page.click(EXPLORE_ANCHOR);
        await this.page.waitForSelector(SEARCH_INPUT_SELECTOR);

        await this.page.type(SEARCH_INPUT_SELECTOR, term, {delay: 50});
        await this.page.keyboard.press('Enter');

        await this.page.waitFor(2000);
        console.log('query executed')
    }

    async fetchBestResults(term, maxResults) {
        const POST_SELECTOR = 'a[class="SQnoC3ObvgnGjWt90zD9Z _2INHSNB8V5eaWp4P0rY_mE"]'
        // const TOP_POSTS_ACROSS_REDDIT = 'div[data-click-id="post_carousel_item"]'
        const COMMUNITIES_SELECTOR ='a[class="_2D7eYuDY6cYGtybECmsxvE"]'
        try{

            // const COMMUNITIES_USERS_TAB ='div[class="_2torGbn_fNOMbGw3UAasPl"]'  
            
            await this.page.waitForSelector(POST_SELECTOR, {timeout:5000});
            await this.page.waitForSelector(COMMUNITIES_SELECTOR, {timeout:5000});
            
        }catch(e) {
            console.log('timeout... or other error...');
            return [];
        }
                

        let results = await this.page.evaluate(({COMMUNITIES_SELECTOR, POST_SELECTOR}) => {

            var topPost=[];
            var user=[];
            const m={topPost,user};
            document.querySelectorAll(POST_SELECTOR).forEach(e => {                       
                let url = e.href;
                m.topPost.push(url);                                
            });

            document.querySelectorAll(COMMUNITIES_SELECTOR).forEach(e => {                       
                let url = e.href;
                m.user.push(url);                                
            });
           
            return m;

        }, {COMMUNITIES_SELECTOR, POST_SELECTOR});
        // console.log(results);
        return results;

    }

    async fetchPost(term, maxResults) {

        const POST_SELECTOR = 'a[class="SQnoC3ObvgnGjWt90zD9Z _2INHSNB8V5eaWp4P0rY_mE"]';
        const POST_TAB = 'a[href$="type=link"]';

        try{
            await this.page.waitForSelector(POST_TAB);
            let TAB_ELEMENT = await this.page.$$(POST_TAB);
            await TAB_ELEMENT[0].tap();
            await this.page.waitFor(1000);            

            await this.page.waitForSelector(POST_SELECTOR, {timeout:5000});

        }catch(e){
            console.log(e);
            return [];
        }

        const results = await this.page.evaluate(({maxResults, POST_SELECTOR}) => {
            let previousHeight;
            let d=document.querySelectorAll(POST_SELECTOR).length;

            const Posts=[];
            while(d<maxResults){
                window.scrollTo(0, document.body.scrollHeight);
                d=document.querySelectorAll(POST_SELECTOR).length;
            }
            
            document.querySelectorAll(POST_SELECTOR).forEach(e => {                       
                let url = e.href;
                Posts.push(url);                           
            });
            console.log(Posts);
            return Posts;
        },{maxResults, POST_SELECTOR});
        // console.log(results);
        return results;        
    }


    
    async fetchCommunities(term, maxResults) {

        const COMMUNITIES_USERS_SELECTOR ='a[class="ei8_Bq_te0jjwNIqmk8Tw _12I4LEbhoIMSoIIXC_OHwT"]'
        const COMMUNITIES_USERS_TAB = 'a[href$="type=sr%2Cuser"]';

        try{
            await this.page.waitForSelector(COMMUNITIES_USERS_TAB);
            let TAB_ELEMENT = await this.page.$$(COMMUNITIES_USERS_TAB);

            await TAB_ELEMENT[0].tap();
            await this.page.waitFor(1000);
            
            await this.page.waitForSelector(COMMUNITIES_USERS_SELECTOR, {timeout:5000});

        }catch(e){
            console.log(e);
            return [];
        }


        const results = await this.page.evaluate(({COMMUNITIES_USERS_SELECTOR,COMMUNITIES_USERS_TAB}) => {
            
            const Communities_User=[];
            document.querySelectorAll(COMMUNITIES_USERS_SELECTOR).forEach(e => {                       
                let url = e.href;
                Communities_User.push(url);                                
            });
            
            return Communities_User;
        },{COMMUNITIES_USERS_SELECTOR,COMMUNITIES_USERS_TAB});

        // console.log(results);
        return results;
    }

    async doFollow(profile) {
        const FOLLOW_BUTTON_SELECTOR = 'button[class="_3VgTjAJVNNV7jzlnwY-OFY _2ilDLNSvkCHD3Cs9duy9Q_ _2ilDLNSvkCHD3Cs9duy9Q_ _2JBsHFobuapzGwpHQjrDlD "]';
        await this.page.goto(`https://www.reddit.com/r/${profile}`);
        try{
            await this.page.waitFor(FOLLOW_BUTTON_SELECTOR, {timeout: 3000});
            await this.page.click(FOLLOW_BUTTON_SELECTOR);
        }catch(e){
            console.log('already followed')
        }
        await this.page.waitFor(5000);

    }

    csvHeader() {
        return [
            {id: 'content'},
            {id: 'datetime'},
        ]
    }

    //
    // async fetchCards(labelMap) {
    //     await this.page.waitForSelector(GOOGLE_SECTIONS_SELECTOR);
    //     const lang = await this.page.evaluate(() => document.querySelector('html').lang);
    //     let label = this.getLabelForLang(lang, labelMap);
    //     console.log("FETCHING ", label);
    //     const topStories = await this.page.evaluate(({ GOOGLE_SECTIONS_SELECTOR, label }) => {
    //         const links = [];
    //         document.querySelectorAll(GOOGLE_SECTIONS_SELECTOR).forEach(section => {
    //             const h3 = section.querySelector('h3[role="heading"]');
    //             if (h3 && h3.innerText.indexOf(label) !== -1) {
    //                 section.querySelectorAll('a[ping]').forEach(a => links.push(a.href));
    //             }
    //         });
    //         return links;
    //     }, { GOOGLE_SECTIONS_SELECTOR, label });
    //
    //     return topStories;
    // }

}

module.exports = TwitterSearch;
