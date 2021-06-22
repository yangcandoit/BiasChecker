"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// GO TO BOTTOM
// document.children[0].scrollTo(0,document.children[0].scrollHeight)
// CAPTURE TWEETS WITH AS [TEXT_CONTENT, DATE]
// $$('div[lang]').map(e => [e.innerText, e.parentElement.querySelector('time') ? e.parentElement.querySelector('time').getAttribute('datetime') : null])
var TwitterSearch =
/*#__PURE__*/
function () {
  function TwitterSearch(page, agent) {
    _classCallCheck(this, TwitterSearch);

    this.page = page; // Puppeeter Page Object

    this.agent = agent;
    this.results = {};
  }

  _createClass(TwitterSearch, [{
    key: "setNewPage",
    value: function setNewPage(page) {
      this.page = page;
    }
  }, {
    key: "doLogin",
    value: function doLogin() {
      var LOGIN_INPUT_SELECTOR, USE_PASSWORD_SELECTOR, PASSWORD_INPUT_SELECTOR;
      return regeneratorRuntime.async(function doLogin$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(this.agent.username == '' || this.agent.password == '')) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return");

            case 2:
              // const EXPLORE_ANCHOR = 'input[id="header-search-bar"]';
              LOGIN_INPUT_SELECTOR = 'input._1Byj7';
              USE_PASSWORD_SELECTOR = 'span[class="_3dTPo"]';
              PASSWORD_INPUT_SELECTOR = 'input[type="password"]';
              _context.next = 7;
              return regeneratorRuntime.awrap(this.page["goto"]('http://tumblr.com/login', {
                waitUntil: 'load',
                timeout: 0
              }));

            case 7:
              _context.next = 9;
              return regeneratorRuntime.awrap(this.page.waitForSelector(LOGIN_INPUT_SELECTOR));

            case 9:
              _context.next = 11;
              return regeneratorRuntime.awrap(this.page.waitFor(1000));

            case 11:
              _context.next = 13;
              return regeneratorRuntime.awrap(this.page.type(LOGIN_INPUT_SELECTOR, this.agent.username, {
                delay: 50
              }));

            case 13:
              _context.next = 15;
              return regeneratorRuntime.awrap(this.page.keyboard.press('Enter'));

            case 15:
              _context.next = 17;
              return regeneratorRuntime.awrap(this.page.waitFor(1000));

            case 17:
              _context.next = 19;
              return regeneratorRuntime.awrap(this.page.click(USE_PASSWORD_SELECTOR));

            case 19:
              _context.next = 21;
              return regeneratorRuntime.awrap(this.page.waitFor(1000));

            case 21:
              _context.next = 23;
              return regeneratorRuntime.awrap(this.page.type(PASSWORD_INPUT_SELECTOR, this.agent.password, {
                delay: 50
              }));

            case 23:
              _context.next = 25;
              return regeneratorRuntime.awrap(this.page.keyboard.press('Enter'));

            case 25:
              _context.next = 27;
              return regeneratorRuntime.awrap(this.page.waitFor(10000));

            case 27:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "doSearch",
    value: function doSearch(term, maxResults) {
      return regeneratorRuntime.async(function doSearch$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              console.log('doSearch', term, 'maxResults: ', maxResults);
              _context2.next = 3;
              return regeneratorRuntime.awrap(this.doQuery(term));

            case 3:
              _context2.next = 5;
              return regeneratorRuntime.awrap(this.page.waitFor(1000));

            case 5:
              console.log('start fetch results');
              _context2.next = 8;
              return regeneratorRuntime.awrap(this.fetchResults(term, maxResults));

            case 8:
              this.results = _context2.sent;
              // console.log(this.results.posts);
              console.log('fetch results finished.');
              return _context2.abrupt("return", this.results);

            case 11:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "doQuery",
    value: function doQuery(term) {
      var SEARCH_INPUT_SELECTOR;
      return regeneratorRuntime.async(function doQuery$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              // // MAKE QUERY
              // const EXPLORE_ANCHOR = 'a[href="/explore"]';
              SEARCH_INPUT_SELECTOR = 'input[class="d6ZRB"]';
              _context3.next = 3;
              return regeneratorRuntime.awrap(this.page["goto"]('https://www.tumblr.com/dashboard', {
                waitUntil: 'load',
                timeout: 0
              }));

            case 3:
              _context3.next = 5;
              return regeneratorRuntime.awrap(this.page.waitForSelector(SEARCH_INPUT_SELECTOR));

            case 5:
              _context3.next = 7;
              return regeneratorRuntime.awrap(this.page.type(SEARCH_INPUT_SELECTOR, term, {
                delay: 50
              }));

            case 7:
              _context3.next = 9;
              return regeneratorRuntime.awrap(this.page.keyboard.press('Enter'));

            case 9:
              _context3.next = 11;
              return regeneratorRuntime.awrap(this.page.waitFor(5000));

            case 11:
              console.log('query executed');

            case 12:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "fetchResults",
    value: function fetchResults(term, maxResults) {
      var results, RELATED, POST_SELECTOR, PEOPLE_SELECTOR;
      return regeneratorRuntime.async(function fetchResults$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              results = {};
              RELATED = 'div._2jACg  a';
              POST_SELECTOR = 'article';
              PEOPLE_SELECTOR = 'a[class="_1SERh _3XjyH"]';
              _context4.prev = 4;
              _context4.next = 7;
              return regeneratorRuntime.awrap(this.page.waitForSelector(RELATED, {
                timeout: 10000
              }));

            case 7:
              _context4.next = 9;
              return regeneratorRuntime.awrap(this.page.waitForSelector(POST_SELECTOR, {
                timeout: 10000
              }));

            case 9:
              _context4.next = 11;
              return regeneratorRuntime.awrap(this.page.waitForSelector(PEOPLE_SELECTOR, {
                timeout: 10000
              }));

            case 11:
              _context4.next = 17;
              break;

            case 13:
              _context4.prev = 13;
              _context4.t0 = _context4["catch"](4);
              console.log(_context4.t0);
              return _context4.abrupt("return", []);

            case 17:
              console.log('1');
              _context4.prev = 18;
              _context4.next = 21;
              return regeneratorRuntime.awrap(this.page.evaluate(function (_ref) {
                var maxResults = _ref.maxResults,
                    RELATED = _ref.RELATED;
                var Related = [];
                document.querySelectorAll(RELATED).forEach(function (e) {
                  var url = e.innerText;
                  Related.push(url);
                });
                console.log(Related);
                return Related;
              }, {
                maxResults: maxResults,
                RELATED: RELATED
              }));

            case 21:
              results.related = _context4.sent;
              _context4.next = 27;
              break;

            case 24:
              _context4.prev = 24;
              _context4.t1 = _context4["catch"](18);
              console.log(_context4.t1);

            case 27:
              console.log('2');
              _context4.prev = 28;
              _context4.next = 31;
              return regeneratorRuntime.awrap(this.page.evaluate(function (_ref2) {
                var maxResults = _ref2.maxResults,
                    PEOPLE_SELECTOR = _ref2.PEOPLE_SELECTOR;
                var d = document.querySelectorAll(PEOPLE_SELECTOR).length;
                console.log(d);
                console.log(maxResults);
                var NEXT_BUTTON = 'button[aria-label="Scroll carousel right"]';
                var e = document.createEvent("MouseEvents");
                e.initEvent("click", true, true);
                var People = []; // while(d<maxResults){
                //     // window.scrollTo(0, document.body.scrollHeight);
                //     document.querySelector('button[aria-label="Scroll carousel right"]').dispatchEvent(e);
                //     d=document.querySelectorAll(PEOPLE_SELECTOR).length;
                //     console.log(d);
                // }

                document.querySelectorAll(PEOPLE_SELECTOR).forEach(function (e) {
                  var url = e.href;
                  People.push(url);
                });
                console.log(People);
                return People;
              }, {
                maxResults: maxResults,
                PEOPLE_SELECTOR: PEOPLE_SELECTOR
              }));

            case 31:
              results.people = _context4.sent;
              _context4.next = 37;
              break;

            case 34:
              _context4.prev = 34;
              _context4.t2 = _context4["catch"](28);
              console.log(_context4.t2);

            case 37:
              _context4.prev = 37;
              _context4.next = 40;
              return regeneratorRuntime.awrap(this.page.evaluate(function (_ref3) {
                var maxResults = _ref3.maxResults,
                    POST_SELECTOR = _ref3.POST_SELECTOR;
                var d = document.querySelectorAll(POST_SELECTOR).length;
                var Posts = {
                  'text': [],
                  'url': []
                };

                while (d < maxResults) {
                  window.scrollTo(0, document.body.scrollHeight);
                  d = document.querySelectorAll(POST_SELECTOR).length;
                }

                console.log(d);
                console.log(document.querySelectorAll(POST_SELECTOR));
                document.querySelectorAll(POST_SELECTOR).forEach(function (e) {
                  // let Link='div[class="L5OmD"] span[class="_1xyZl"] span[class="_1xyZl"] a[class="hVK3L"]';
                  var Link = 'header > div:nth-child(2)';
                  console.log(e); // alert(e.querySelector(Link));

                  try {
                    Posts['url'].push(e.querySelector(Link).querySelector('a').href);
                    Posts['text'].push(e.innerText);
                  } catch (error) {
                    console.log(error);
                  }
                }); // console.log(Posts);

                return Posts;
              }, {
                maxResults: maxResults,
                POST_SELECTOR: POST_SELECTOR
              }));

            case 40:
              results.posts = _context4.sent;
              _context4.next = 46;
              break;

            case 43:
              _context4.prev = 43;
              _context4.t3 = _context4["catch"](37);
              console.log(_context4.t3);

            case 46:
              return _context4.abrupt("return", results);

            case 47:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this, [[4, 13], [18, 24], [28, 34], [37, 43]]);
    } // async fetchBestResults(term, maxResults) {
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

  }, {
    key: "doFollow",
    value: function doFollow(profile) {
      var LIKE_BUTTON_SELECTOR, FOLLOW_BUTTON_SELECTOR;
      return regeneratorRuntime.async(function doFollow$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              LIKE_BUTTON_SELECTOR = 'div[id="like_wrapper"]';
              FOLLOW_BUTTON_SELECTOR = 'a[class="E7GmO _2MvlR M58hZ"]';

              if (!(profile.substring(0, 4) == "http")) {
                _context5.next = 17;
                break;
              }

              _context5.next = 5;
              return regeneratorRuntime.awrap(this.page["goto"]("".concat(profile)));

            case 5:
              _context5.prev = 5;
              _context5.next = 8;
              return regeneratorRuntime.awrap(this.page.waitFor(LIKE_BUTTON_SELECTOR, {
                timeout: 5000
              }));

            case 8:
              _context5.next = 10;
              return regeneratorRuntime.awrap(this.page.click(LIKE_BUTTON_SELECTOR));

            case 10:
              _context5.next = 15;
              break;

            case 12:
              _context5.prev = 12;
              _context5.t0 = _context5["catch"](5);
              console.log('already followed');

            case 15:
              _context5.next = 29;
              break;

            case 17:
              _context5.next = 19;
              return regeneratorRuntime.awrap(this.page["goto"]("https://www.tumblr.com/blog/view/".concat(profile), {
                waitUntil: 'load',
                timeout: 0
              }));

            case 19:
              _context5.prev = 19;
              _context5.next = 22;
              return regeneratorRuntime.awrap(this.page.waitFor(FOLLOW_BUTTON_SELECTOR, {
                timeout: 5000
              }));

            case 22:
              _context5.next = 24;
              return regeneratorRuntime.awrap(this.page.click(FOLLOW_BUTTON_SELECTOR));

            case 24:
              _context5.next = 29;
              break;

            case 26:
              _context5.prev = 26;
              _context5.t1 = _context5["catch"](19);
              console.log('already followed');

            case 29:
              _context5.next = 31;
              return regeneratorRuntime.awrap(this.page.waitFor(5000));

            case 31:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this, [[5, 12], [19, 26]]);
    }
  }, {
    key: "csvHeader",
    value: function csvHeader() {
      return [{
        id: 'content'
      }, {
        id: 'datetime'
      }];
    }
  }]);

  return TwitterSearch;
}();

module.exports = TwitterSearch;