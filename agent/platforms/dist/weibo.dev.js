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
      var LOGIN_INPUT_SELECTOR, PASSWORD_INPUT_SELECTOR;
      return regeneratorRuntime.async(function doLogin$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // const EXPLORE_ANCHOR = 'input[id="header-search-bar"]';
              LOGIN_INPUT_SELECTOR = 'input[id="loginname"]';
              PASSWORD_INPUT_SELECTOR = 'div[class="info_list password"] div[class="input_wrap"] input[class="W_input"]';
              _context.next = 4;
              return regeneratorRuntime.awrap(this.page["goto"]('https://weibo.com/overseas'));

            case 4:
              _context.next = 6;
              return regeneratorRuntime.awrap(this.page.waitForSelector(LOGIN_INPUT_SELECTOR));

            case 6:
              _context.next = 8;
              return regeneratorRuntime.awrap(this.page.waitFor(500));

            case 8:
              _context.next = 10;
              return regeneratorRuntime.awrap(this.page.type(LOGIN_INPUT_SELECTOR, this.agent.username, {
                delay: 50
              }));

            case 10:
              _context.next = 12;
              return regeneratorRuntime.awrap(this.page.keyboard.press('Tab'));

            case 12:
              _context.next = 14;
              return regeneratorRuntime.awrap(this.page.waitFor(500));

            case 14:
              _context.next = 16;
              return regeneratorRuntime.awrap(this.page.type(PASSWORD_INPUT_SELECTOR, this.agent.password, {
                delay: 50
              }));

            case 16:
              _context.next = 18;
              return regeneratorRuntime.awrap(this.page.keyboard.press('Enter'));

            case 18:
              _context.next = 20;
              return regeneratorRuntime.awrap(this.page.waitFor(10000));

            case 20:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "doSearch",
    value: function doSearch(term, maxResults) {
      var POST_TAB, COMMUNITIES_USERS_TAB;
      return regeneratorRuntime.async(function doSearch$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              console.log('doSearch', term, 'maxResults: ', maxResults);
              _context2.next = 3;
              return regeneratorRuntime.awrap(this.doQuery(term));

            case 3:
              POST_TAB = 'a[href$="type=link"]';
              COMMUNITIES_USERS_TAB = 'a[href$="type=sr%2Cuser"]';
              console.log('start fetch results');
              _context2.next = 8;
              return regeneratorRuntime.awrap(this.fetchBestResults(term, maxResults));

            case 8:
              this.results.best_result_tab = _context2.sent;
              _context2.next = 11;
              return regeneratorRuntime.awrap(this.fetchPost(term, maxResults));

            case 11:
              this.results.post_tab = _context2.sent;
              _context2.next = 14;
              return regeneratorRuntime.awrap(this.fetchCommunities(term, maxResults));

            case 14:
              this.results.communities_users_tab = _context2.sent;
              console.log('fetch results finished.');
              return _context2.abrupt("return", this.results);

            case 17:
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
              SEARCH_INPUT_SELECTOR = 'div[class="gn_search_v2 "] input';
              _context3.next = 3;
              return regeneratorRuntime.awrap(this.page["goto"]('https://d.weibo.com/'));

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
              return regeneratorRuntime.awrap(this.page.waitFor(2000));

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
      var POST_SELECTOR, COMMUNITIES_SELECTOR, results;
      return regeneratorRuntime.async(function fetchResults$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              POST_SELECTOR = 'a[class="SQnoC3ObvgnGjWt90zD9Z _2INHSNB8V5eaWp4P0rY_mE"]'; // const TOP_POSTS_ACROSS_REDDIT = 'div[data-click-id="post_carousel_item"]'

              COMMUNITIES_SELECTOR = 'a[class="_2D7eYuDY6cYGtybECmsxvE"]';
              _context4.prev = 2;
              _context4.next = 5;
              return regeneratorRuntime.awrap(this.page.waitForSelector(POST_SELECTOR, {
                timeout: 5000
              }));

            case 5:
              _context4.next = 7;
              return regeneratorRuntime.awrap(this.page.waitForSelector(COMMUNITIES_SELECTOR, {
                timeout: 5000
              }));

            case 7:
              _context4.next = 13;
              break;

            case 9:
              _context4.prev = 9;
              _context4.t0 = _context4["catch"](2);
              console.log('timeout... or other error...');
              return _context4.abrupt("return", []);

            case 13:
              _context4.next = 15;
              return regeneratorRuntime.awrap(this.page.evaluate(function (_ref) {
                var COMMUNITIES_SELECTOR = _ref.COMMUNITIES_SELECTOR,
                    POST_SELECTOR = _ref.POST_SELECTOR;
                var topPost = [];
                var user = [];
                var m = {
                  topPost: topPost,
                  user: user
                };
                document.querySelectorAll(POST_SELECTOR).forEach(function (e) {
                  var url = e.href;
                  m.topPost.push(url);
                });
                document.querySelectorAll(COMMUNITIES_SELECTOR).forEach(function (e) {
                  var url = e.href;
                  m.user.push(url);
                });
                return m;
              }, {
                COMMUNITIES_SELECTOR: COMMUNITIES_SELECTOR,
                POST_SELECTOR: POST_SELECTOR
              }));

            case 15:
              results = _context4.sent;
              return _context4.abrupt("return", results);

            case 17:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this, [[2, 9]]);
    }
  }, {
    key: "fetchBestResults",
    value: function fetchBestResults(term, maxResults) {
      var POST_SELECTOR, COMMUNITIES_SELECTOR, results;
      return regeneratorRuntime.async(function fetchBestResults$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              POST_SELECTOR = 'a[class="SQnoC3ObvgnGjWt90zD9Z _2INHSNB8V5eaWp4P0rY_mE"]'; // const TOP_POSTS_ACROSS_REDDIT = 'div[data-click-id="post_carousel_item"]'

              COMMUNITIES_SELECTOR = 'a[class="_2D7eYuDY6cYGtybECmsxvE"]';
              _context5.prev = 2;
              _context5.next = 5;
              return regeneratorRuntime.awrap(this.page.waitForSelector(POST_SELECTOR, {
                timeout: 5000
              }));

            case 5:
              _context5.next = 7;
              return regeneratorRuntime.awrap(this.page.waitForSelector(COMMUNITIES_SELECTOR, {
                timeout: 5000
              }));

            case 7:
              _context5.next = 13;
              break;

            case 9:
              _context5.prev = 9;
              _context5.t0 = _context5["catch"](2);
              console.log('timeout... or other error...');
              return _context5.abrupt("return", []);

            case 13:
              _context5.next = 15;
              return regeneratorRuntime.awrap(this.page.evaluate(function (_ref2) {
                var COMMUNITIES_SELECTOR = _ref2.COMMUNITIES_SELECTOR,
                    POST_SELECTOR = _ref2.POST_SELECTOR;
                var topPost = [];
                var user = [];
                var m = {
                  topPost: topPost,
                  user: user
                };
                document.querySelectorAll(POST_SELECTOR).forEach(function (e) {
                  var url = e.href;
                  m.topPost.push(url);
                });
                document.querySelectorAll(COMMUNITIES_SELECTOR).forEach(function (e) {
                  var url = e.href;
                  m.user.push(url);
                });
                return m;
              }, {
                COMMUNITIES_SELECTOR: COMMUNITIES_SELECTOR,
                POST_SELECTOR: POST_SELECTOR
              }));

            case 15:
              results = _context5.sent;
              return _context5.abrupt("return", results);

            case 17:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this, [[2, 9]]);
    }
  }, {
    key: "fetchPost",
    value: function fetchPost(term, maxResults) {
      var POST_SELECTOR, POST_TAB, TAB_ELEMENT, results;
      return regeneratorRuntime.async(function fetchPost$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              POST_SELECTOR = 'a[class="SQnoC3ObvgnGjWt90zD9Z _2INHSNB8V5eaWp4P0rY_mE"]';
              POST_TAB = 'a[href$="type=link"]';
              _context6.prev = 2;
              _context6.next = 5;
              return regeneratorRuntime.awrap(this.page.waitForSelector(POST_TAB));

            case 5:
              _context6.next = 7;
              return regeneratorRuntime.awrap(this.page.$$(POST_TAB));

            case 7:
              TAB_ELEMENT = _context6.sent;
              _context6.next = 10;
              return regeneratorRuntime.awrap(TAB_ELEMENT[0].tap());

            case 10:
              _context6.next = 12;
              return regeneratorRuntime.awrap(this.page.waitFor(1000));

            case 12:
              _context6.next = 14;
              return regeneratorRuntime.awrap(this.page.waitForSelector(POST_SELECTOR, {
                timeout: 5000
              }));

            case 14:
              _context6.next = 20;
              break;

            case 16:
              _context6.prev = 16;
              _context6.t0 = _context6["catch"](2);
              console.log(_context6.t0);
              return _context6.abrupt("return", []);

            case 20:
              _context6.next = 22;
              return regeneratorRuntime.awrap(this.page.evaluate(function (_ref3) {
                var maxResults = _ref3.maxResults,
                    POST_SELECTOR = _ref3.POST_SELECTOR;
                var previousHeight;
                var d = document.querySelectorAll(POST_SELECTOR).length;
                var Posts = [];

                while (d < maxResults) {
                  window.scrollTo(0, document.body.scrollHeight);
                  d = document.querySelectorAll(POST_SELECTOR).length;
                }

                document.querySelectorAll(POST_SELECTOR).forEach(function (e) {
                  var url = e.href;
                  Posts.push(url);
                });
                console.log(Posts);
                return Posts;
              }, {
                maxResults: maxResults,
                POST_SELECTOR: POST_SELECTOR
              }));

            case 22:
              results = _context6.sent;
              return _context6.abrupt("return", results);

            case 24:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this, [[2, 16]]);
    }
  }, {
    key: "fetchCommunities",
    value: function fetchCommunities(term, maxResults) {
      var COMMUNITIES_USERS_SELECTOR, COMMUNITIES_USERS_TAB, TAB_ELEMENT, results;
      return regeneratorRuntime.async(function fetchCommunities$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              COMMUNITIES_USERS_SELECTOR = 'a[class="ei8_Bq_te0jjwNIqmk8Tw _12I4LEbhoIMSoIIXC_OHwT"]';
              COMMUNITIES_USERS_TAB = 'a[href$="type=sr%2Cuser"]';
              _context7.prev = 2;
              _context7.next = 5;
              return regeneratorRuntime.awrap(this.page.waitForSelector(COMMUNITIES_USERS_TAB));

            case 5:
              _context7.next = 7;
              return regeneratorRuntime.awrap(this.page.$$(COMMUNITIES_USERS_TAB));

            case 7:
              TAB_ELEMENT = _context7.sent;
              _context7.next = 10;
              return regeneratorRuntime.awrap(TAB_ELEMENT[0].tap());

            case 10:
              _context7.next = 12;
              return regeneratorRuntime.awrap(this.page.waitFor(1000));

            case 12:
              _context7.next = 14;
              return regeneratorRuntime.awrap(this.page.waitForSelector(COMMUNITIES_USERS_SELECTOR, {
                timeout: 5000
              }));

            case 14:
              _context7.next = 20;
              break;

            case 16:
              _context7.prev = 16;
              _context7.t0 = _context7["catch"](2);
              console.log(_context7.t0);
              return _context7.abrupt("return", []);

            case 20:
              _context7.next = 22;
              return regeneratorRuntime.awrap(this.page.evaluate(function (_ref4) {
                var COMMUNITIES_USERS_SELECTOR = _ref4.COMMUNITIES_USERS_SELECTOR,
                    COMMUNITIES_USERS_TAB = _ref4.COMMUNITIES_USERS_TAB;
                var Communities_User = [];
                document.querySelectorAll(COMMUNITIES_USERS_SELECTOR).forEach(function (e) {
                  var url = e.href;
                  Communities_User.push(url);
                });
                return Communities_User;
              }, {
                COMMUNITIES_USERS_SELECTOR: COMMUNITIES_USERS_SELECTOR,
                COMMUNITIES_USERS_TAB: COMMUNITIES_USERS_TAB
              }));

            case 22:
              results = _context7.sent;
              return _context7.abrupt("return", results);

            case 24:
            case "end":
              return _context7.stop();
          }
        }
      }, null, this, [[2, 16]]);
    }
  }, {
    key: "doFollow",
    value: function doFollow(profile) {
      var FOLLOW_BUTTON_SELECTOR;
      return regeneratorRuntime.async(function doFollow$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              FOLLOW_BUTTON_SELECTOR = 'a[class="W_btn_c btn_34px"]';
              _context8.next = 3;
              return regeneratorRuntime.awrap(this.page["goto"]("https://weibo.com/".concat(profile)));

            case 3:
              _context8.prev = 3;
              _context8.next = 6;
              return regeneratorRuntime.awrap(this.page.waitFor(FOLLOW_BUTTON_SELECTOR, {
                timeout: 3000
              }));

            case 6:
              _context8.next = 8;
              return regeneratorRuntime.awrap(this.page.click(FOLLOW_BUTTON_SELECTOR));

            case 8:
              _context8.next = 13;
              break;

            case 10:
              _context8.prev = 10;
              _context8.t0 = _context8["catch"](3);
              console.log('already followed');

            case 13:
              _context8.next = 15;
              return regeneratorRuntime.awrap(this.page.waitFor(5000));

            case 15:
            case "end":
              return _context8.stop();
          }
        }
      }, null, this, [[3, 10]]);
    }
  }, {
    key: "csvHeader",
    value: function csvHeader() {
      return [{
        id: 'content'
      }, {
        id: 'datetime'
      }];
    } //
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

  }]);

  return TwitterSearch;
}();

module.exports = TwitterSearch;