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
              if (!(this.agent.username == '' || this.agent.password == '')) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return");

            case 2:
              // const EXPLORE_ANCHOR = 'input[id="header-search-bar"]';
              LOGIN_INPUT_SELECTOR = 'input[id="loginUsername"]';
              PASSWORD_INPUT_SELECTOR = 'input[type="password"]';
              _context.next = 6;
              return regeneratorRuntime.awrap(this.page["goto"]('https://www.reddit.com/login/', {
                waitUntil: 'load',
                timeout: 0
              }));

            case 6:
              _context.next = 8;
              return regeneratorRuntime.awrap(this.page.waitForSelector(LOGIN_INPUT_SELECTOR));

            case 8:
              _context.next = 10;
              return regeneratorRuntime.awrap(this.page.waitFor(500));

            case 10:
              _context.next = 12;
              return regeneratorRuntime.awrap(this.page.type(LOGIN_INPUT_SELECTOR, this.agent.username, {
                delay: 50
              }));

            case 12:
              _context.next = 14;
              return regeneratorRuntime.awrap(this.page.keyboard.press('Tab'));

            case 14:
              _context.next = 16;
              return regeneratorRuntime.awrap(this.page.waitFor(500));

            case 16:
              _context.next = 18;
              return regeneratorRuntime.awrap(this.page.type(PASSWORD_INPUT_SELECTOR, this.agent.password, {
                delay: 50
              }));

            case 18:
              _context.next = 20;
              return regeneratorRuntime.awrap(this.page.keyboard.press('Enter'));

            case 20:
              _context.next = 22;
              return regeneratorRuntime.awrap(this.page.waitFor(10000));

            case 22:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "doSearch",
    value: function doSearch(term, maxResults, interval) {
      var POST_TAB, COMMUNITIES_USERS_TAB;
      return regeneratorRuntime.async(function doSearch$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              this.queries;
              console.log('doSearch', term, 'maxResults: ', maxResults);
              _context2.next = 4;
              return regeneratorRuntime.awrap(this.doQuery(term));

            case 4:
              POST_TAB = 'a[href$="type=link"]';
              COMMUNITIES_USERS_TAB = 'a[href$="type=sr%2Cuser"]';
              console.log('start fetch results');
              _context2.next = 9;
              return regeneratorRuntime.awrap(this.fetchBestResults(term, maxResults));

            case 9:
              this.results.best_result_tab = _context2.sent;
              _context2.next = 12;
              return regeneratorRuntime.awrap(this.fetchPost(term, maxResults));

            case 12:
              this.results.post_tab = _context2.sent;
              _context2.next = 15;
              return regeneratorRuntime.awrap(this.fetchCommunities(term, maxResults));

            case 15:
              this.results.communities_users_tab = _context2.sent;
              // setTimeout(function(){},interval);
              // await new Promise(resolve =>setTimeout(() =>resolve(), interval));
              console.log('fetch results finished.'); // this.page.close();

              return _context2.abrupt("return", this.results);

            case 18:
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
              SEARCH_INPUT_SELECTOR = 'input[type="search"]';
              _context3.prev = 1;
              _context3.next = 4;
              return regeneratorRuntime.awrap(this.page["goto"]('https://www.reddit.com/'));

            case 4:
              _context3.next = 24;
              break;

            case 6:
              _context3.prev = 6;
              _context3.t0 = _context3["catch"](1);
              _context3.prev = 8;
              _context3.next = 11;
              return regeneratorRuntime.awrap(this.page["goto"]('https://www.reddit.com/'));

            case 11:
              _context3.next = 24;
              break;

            case 13:
              _context3.prev = 13;
              _context3.t1 = _context3["catch"](8);
              _context3.prev = 15;
              _context3.next = 18;
              return regeneratorRuntime.awrap(this.page["goto"]('https://www.reddit.com/'));

            case 18:
              _context3.next = 24;
              break;

            case 20:
              _context3.prev = 20;
              _context3.t2 = _context3["catch"](15);
              _context3.next = 24;
              return regeneratorRuntime.awrap(this.page["goto"]('https://www.reddit.com/'));

            case 24:
              _context3.next = 26;
              return regeneratorRuntime.awrap(this.page.waitForSelector(SEARCH_INPUT_SELECTOR));

            case 26:
              _context3.next = 28;
              return regeneratorRuntime.awrap(this.page.type(SEARCH_INPUT_SELECTOR, term, {
                delay: 50
              }));

            case 28:
              _context3.next = 30;
              return regeneratorRuntime.awrap(this.page.keyboard.press('Enter'));

            case 30:
              _context3.next = 32;
              return regeneratorRuntime.awrap(this.page.waitFor(2000));

            case 32:
              console.log('query executed');

            case 33:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this, [[1, 6], [8, 13], [15, 20]]);
    }
  }, {
    key: "fetchBestResults",
    value: function fetchBestResults(term, maxResults) {
      var POST_SELECTOR, COMMUNITIES_SELECTOR, results;
      return regeneratorRuntime.async(function fetchBestResults$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              console.log('best');
              POST_SELECTOR = 'a[class="SQnoC3ObvgnGjWt90zD9Z _2INHSNB8V5eaWp4P0rY_mE"]'; // const TOP_POSTS_ACROSS_REDDIT = 'div[data-click-id="post_carousel_item"]'

              COMMUNITIES_SELECTOR = 'a[class="ei8_Bq_te0jjwNIqmk8Tw _3MfNPE_vLKliHPkiYMAtZm"]';
              _context4.next = 5;
              return regeneratorRuntime.awrap(this.page.waitFor(2000));

            case 5:
              _context4.prev = 5;
              _context4.next = 8;
              return regeneratorRuntime.awrap(this.page.waitForSelector(POST_SELECTOR, {
                timeout: 10000
              }));

            case 8:
              _context4.next = 10;
              return regeneratorRuntime.awrap(this.page.waitForSelector(COMMUNITIES_SELECTOR, {
                timeout: 10000
              }));

            case 10:
              _context4.next = 16;
              break;

            case 12:
              _context4.prev = 12;
              _context4.t0 = _context4["catch"](5);
              console.log(_context4.t0);
              return _context4.abrupt("return", []);

            case 16:
              _context4.next = 18;
              return regeneratorRuntime.awrap(this.page.evaluate(function (_ref) {
                var COMMUNITIES_SELECTOR = _ref.COMMUNITIES_SELECTOR,
                    POST_SELECTOR = _ref.POST_SELECTOR;
                var topPost = {
                  'url': [],
                  'text': []
                };
                var user = [];
                var m = {
                  topPost: topPost,
                  user: user
                };
                document.querySelectorAll(POST_SELECTOR).forEach(function (e) {
                  var url = e.href;
                  var text = e.innerText;
                  m.topPost['url'].push(url);
                  m.topPost['text'].push(text);
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

            case 18:
              results = _context4.sent;
              return _context4.abrupt("return", results);

            case 20:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this, [[5, 12]]);
    }
  }, {
    key: "fetchPost",
    value: function fetchPost(term, maxResults) {
      var POST_SELECTOR, POST_TAB, TAB_ELEMENT, results;
      return regeneratorRuntime.async(function fetchPost$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              POST_SELECTOR = 'a[class="SQnoC3ObvgnGjWt90zD9Z _2INHSNB8V5eaWp4P0rY_mE"]';
              POST_TAB = 'a[href$="type=link"]';
              _context5.prev = 2;
              _context5.next = 5;
              return regeneratorRuntime.awrap(this.page.waitForSelector(POST_TAB));

            case 5:
              _context5.next = 7;
              return regeneratorRuntime.awrap(this.page.$$(POST_TAB));

            case 7:
              TAB_ELEMENT = _context5.sent;
              _context5.next = 10;
              return regeneratorRuntime.awrap(TAB_ELEMENT[0].tap());

            case 10:
              _context5.next = 12;
              return regeneratorRuntime.awrap(this.page.waitFor(2000));

            case 12:
              _context5.next = 14;
              return regeneratorRuntime.awrap(this.page.waitFor(5000));

            case 14:
              _context5.next = 16;
              return regeneratorRuntime.awrap(this.page.waitForSelector(POST_SELECTOR, {
                timeout: 10000
              }));

            case 16:
              _context5.next = 22;
              break;

            case 18:
              _context5.prev = 18;
              _context5.t0 = _context5["catch"](2);
              console.log(_context5.t0);
              return _context5.abrupt("return", []);

            case 22:
              _context5.next = 24;
              return regeneratorRuntime.awrap(this.page.evaluate(function (_ref2) {
                var maxResults = _ref2.maxResults,
                    POST_SELECTOR = _ref2.POST_SELECTOR;
                var previousHeight;
                var d = document.querySelectorAll(POST_SELECTOR).length;
                var Posts = {
                  'url': [],
                  'text': []
                };

                while (d < maxResults) {
                  window.scrollTo(0, document.body.scrollHeight);

                  if (document.querySelectorAll(POST_SELECTOR).length == d) {
                    break;
                  }

                  d = document.querySelectorAll(POST_SELECTOR).length;
                }

                document.querySelectorAll(POST_SELECTOR).forEach(function (e) {
                  var url = e.href;
                  var text = e.innerText;
                  Posts['url'].push(url);
                  Posts['text'].push(text);
                });
                console.log(Posts);
                return Posts;
              }, {
                maxResults: maxResults,
                POST_SELECTOR: POST_SELECTOR
              }));

            case 24:
              results = _context5.sent;
              return _context5.abrupt("return", results);

            case 26:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this, [[2, 18]]);
    }
  }, {
    key: "fetchCommunities",
    value: function fetchCommunities(term, maxResults) {
      var COMMUNITIES_USERS_SELECTOR, COMMUNITIES_USERS_TAB, TAB_ELEMENT, results;
      return regeneratorRuntime.async(function fetchCommunities$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              console.log('comm');
              COMMUNITIES_USERS_SELECTOR = 'a[class="ei8_Bq_te0jjwNIqmk8Tw _12I4LEbhoIMSoIIXC_OHwT"]';
              COMMUNITIES_USERS_TAB = 'a[href$="type=sr%2Cuser"]';
              _context6.next = 5;
              return regeneratorRuntime.awrap(this.page.waitFor(2000));

            case 5:
              _context6.prev = 5;
              _context6.next = 8;
              return regeneratorRuntime.awrap(this.page.waitForSelector(COMMUNITIES_USERS_TAB));

            case 8:
              _context6.next = 10;
              return regeneratorRuntime.awrap(this.page.$$(COMMUNITIES_USERS_TAB));

            case 10:
              TAB_ELEMENT = _context6.sent;
              _context6.next = 13;
              return regeneratorRuntime.awrap(TAB_ELEMENT[0].tap());

            case 13:
              _context6.next = 15;
              return regeneratorRuntime.awrap(this.page.waitFor(1000));

            case 15:
              _context6.next = 17;
              return regeneratorRuntime.awrap(this.page.waitForSelector(COMMUNITIES_USERS_SELECTOR, {
                timeout: 10000
              }));

            case 17:
              _context6.next = 23;
              break;

            case 19:
              _context6.prev = 19;
              _context6.t0 = _context6["catch"](5);
              console.log(_context6.t0);
              return _context6.abrupt("return", []);

            case 23:
              _context6.next = 25;
              return regeneratorRuntime.awrap(this.page.evaluate(function (_ref3) {
                var COMMUNITIES_USERS_SELECTOR = _ref3.COMMUNITIES_USERS_SELECTOR,
                    COMMUNITIES_USERS_TAB = _ref3.COMMUNITIES_USERS_TAB;
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

            case 25:
              results = _context6.sent;
              return _context6.abrupt("return", results);

            case 27:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this, [[5, 19]]);
    }
  }, {
    key: "doFollow",
    value: function doFollow(profile) {
      var UPvote_BUTTON_SELECTOR, Save_BUTTON_SELECTOR, _UPvote_BUTTON_SELECTOR, _Save_BUTTON_SELECTOR, FOLLOW_BUTTON_SELECTOR;

      return regeneratorRuntime.async(function doFollow$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              if (!(profile.substring(0, 4) == "http")) {
                _context7.next = 21;
                break;
              }

              UPvote_BUTTON_SELECTOR = 'i[class="icon icon-upvote _2Jxk822qXs4DaXwsN7yyHA"]';
              Save_BUTTON_SELECTOR = 'i[class="icon icon-save _3n1jtdyipCtmS0HkOM1Tfd va_0c4n4YKyMsW0Pl5cQu"]';
              _context7.next = 5;
              return regeneratorRuntime.awrap(this.page["goto"]("".concat(profile), {
                waitUntil: 'load'
              }));

            case 5:
              _context7.prev = 5;
              _context7.next = 8;
              return regeneratorRuntime.awrap(this.page.waitFor(UPvote_BUTTON_SELECTOR, {
                timeout: 3000
              }));

            case 8:
              _context7.next = 10;
              return regeneratorRuntime.awrap(this.page.click(UPvote_BUTTON_SELECTOR));

            case 10:
              _context7.next = 12;
              return regeneratorRuntime.awrap(this.page.waitFor(Save_BUTTON_SELECTOR, {
                timeout: 3000
              }));

            case 12:
              _context7.next = 14;
              return regeneratorRuntime.awrap(this.page.click(Save_BUTTON_SELECTOR));

            case 14:
              _context7.next = 19;
              break;

            case 16:
              _context7.prev = 16;
              _context7.t0 = _context7["catch"](5);
              console.log('already followed');

            case 19:
              _context7.next = 55;
              break;

            case 21:
              if (!(profile.substring(0, 4) == "user_")) {
                _context7.next = 42;
                break;
              }

              _UPvote_BUTTON_SELECTOR = 'i[class="icon icon-upvote _2Jxk822qXs4DaXwsN7yyHA"]';
              _Save_BUTTON_SELECTOR = 'i[class="icon icon-save _3n1jtdyipCtmS0HkOM1Tfd va_0c4n4YKyMsW0Pl5cQu"]';
              _context7.next = 26;
              return regeneratorRuntime.awrap(this.page["goto"]("".concat(profile), {
                waitUntil: 'load'
              }));

            case 26:
              _context7.prev = 26;
              _context7.next = 29;
              return regeneratorRuntime.awrap(this.page.waitFor(_UPvote_BUTTON_SELECTOR, {
                timeout: 3000
              }));

            case 29:
              _context7.next = 31;
              return regeneratorRuntime.awrap(this.page.click(_UPvote_BUTTON_SELECTOR));

            case 31:
              _context7.next = 33;
              return regeneratorRuntime.awrap(this.page.waitFor(_Save_BUTTON_SELECTOR, {
                timeout: 3000
              }));

            case 33:
              _context7.next = 35;
              return regeneratorRuntime.awrap(this.page.click(_Save_BUTTON_SELECTOR));

            case 35:
              _context7.next = 40;
              break;

            case 37:
              _context7.prev = 37;
              _context7.t1 = _context7["catch"](26);
              console.log('already followed');

            case 40:
              _context7.next = 55;
              break;

            case 42:
              FOLLOW_BUTTON_SELECTOR = 'button[class="_3VgTjAJVNNV7jzlnwY-OFY _2ilDLNSvkCHD3Cs9duy9Q_ _2ilDLNSvkCHD3Cs9duy9Q_ _2JBsHFobuapzGwpHQjrDlD "]';
              _context7.next = 45;
              return regeneratorRuntime.awrap(this.page["goto"]("https://www.reddit.com/r/".concat(profile), {
                waitUntil: 'load',
                timeout: 0
              }));

            case 45:
              _context7.prev = 45;
              _context7.next = 48;
              return regeneratorRuntime.awrap(this.page.waitFor(FOLLOW_BUTTON_SELECTOR, {
                timeout: 3000
              }));

            case 48:
              _context7.next = 50;
              return regeneratorRuntime.awrap(this.page.click(FOLLOW_BUTTON_SELECTOR));

            case 50:
              _context7.next = 55;
              break;

            case 52:
              _context7.prev = 52;
              _context7.t2 = _context7["catch"](45);
              console.log('already followed');

            case 55:
              _context7.next = 57;
              return regeneratorRuntime.awrap(this.page.waitFor(5000));

            case 57:
            case "end":
              return _context7.stop();
          }
        }
      }, null, this, [[5, 16], [26, 37], [45, 52]]);
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