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
      var EXPLORE_ANCHOR, LOGIN_INPUT_SELECTOR, PASSWORD_INPUT_SELECTOR;
      return regeneratorRuntime.async(function doLogin$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              EXPLORE_ANCHOR = 'a[href="/explore"]';
              LOGIN_INPUT_SELECTOR = 'input[name="session[username_or_email]"]';
              PASSWORD_INPUT_SELECTOR = 'input[type="password"]';
              0;
              _context.next = 6;
              return regeneratorRuntime.awrap(this.page["goto"]('https://twitter.com/login'));

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
              return regeneratorRuntime.awrap(this.page.waitForSelector(EXPLORE_ANCHOR));

            case 22:
              _context.next = 24;
              return regeneratorRuntime.awrap(this.page.waitFor(10000));

            case 24:
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
              return regeneratorRuntime.awrap(this.fetchTweetResults(term, maxResults));

            case 5:
              this.results = _context2.sent;
              return _context2.abrupt("return", this.results);

            case 7:
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
              SEARCH_INPUT_SELECTOR = 'input[id="search"]';
              _context3.next = 3;
              return regeneratorRuntime.awrap(this.page["goto"]('https://www.youtube.com/'));

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
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "fetchVideoResults",
    value: function fetchVideoResults(term, maxResults) {
      var videoSelector, allTweets, retries, previousHeight, TWEETS_SELECTOR, TAB_ELEMENT, results;
      return regeneratorRuntime.async(function fetchVideoResults$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              videoSelector = 'a[id="video-title"]';
              allTweets = [];
              retries = 0;
              _context4.prev = 3;
              console.log("FETCH RESULTS for tab", TAB);
              TWEETS_SELECTOR = 'article';

              if (TAB && TAB.indexOf('user') !== -1) {
                TWEETS_SELECTOR = 'div[aria-label*=Timeline] div[data-testid="UserCell"]';
              }

              if (!TAB) {
                _context4.next = 17;
                break;
              }

              _context4.next = 10;
              return regeneratorRuntime.awrap(this.page.waitForSelector(TAB));

            case 10:
              _context4.next = 12;
              return regeneratorRuntime.awrap(this.page.$$(TAB));

            case 12:
              TAB_ELEMENT = _context4.sent;
              _context4.next = 15;
              return regeneratorRuntime.awrap(TAB_ELEMENT[1].tap());

            case 15:
              _context4.next = 17;
              return regeneratorRuntime.awrap(this.page.waitFor(1000));

            case 17:
              _context4.next = 19;
              return regeneratorRuntime.awrap(this.page.waitForSelector(TWEETS_SELECTOR, {
                timeout: 5000
              }));

            case 19:
              _context4.next = 25;
              break;

            case 21:
              _context4.prev = 21;
              _context4.t0 = _context4["catch"](3);
              console.log('timeout... or other error...');
              return _context4.abrupt("return", []);

            case 25:
              if (!(Object.keys(allTweets).length < maxResults)) {
                _context4.next = 63;
                break;
              }

              _context4.prev = 26;
              _context4.next = 29;
              return regeneratorRuntime.awrap(this.page.evaluate(function (_ref) {
                var allTweets = _ref.allTweets,
                    TWEETS_SELECTOR = _ref.TWEETS_SELECTOR,
                    TAB = _ref.TAB;
                var tweets = [];
                document.querySelectorAll(TWEETS_SELECTOR).forEach(function (e) {
                  try {
                    if (TAB && TAB.indexOf('user') !== -1) {
                      var name, profile, description;
                      var nameObj = e.querySelector('div>div>div>div>div>div>div>div>div>div div>div');

                      if (nameObj) {
                        name = nameObj.textContent;
                      }

                      var profileObj = e.querySelector('div>div>div>div>div>div>div>div>div>div div:nth-child(2) span');

                      if (profileObj) {
                        profile = profileObj.textContent;
                      }

                      var descriptionObj = e.querySelector('div>div>div>div>div>div>div:nth-child(2)>div:nth-of-type(2) span');

                      if (descriptionObj) {
                        description = descriptionObj.textContent;
                      }

                      var index = allTweets.findIndex(function (v) {
                        return v.profile == profile;
                      });

                      if (index === -1) {
                        tweets.push({
                          name: name,
                          profile: profile,
                          description: description
                        });
                      }
                    } else {
                      var text = e.querySelector('div[lang]').innerText;
                      var datetime = e.querySelector('time').getAttribute('datetime');
                      var url = e.querySelector('time').parentElement.getAttribute('href');
                      var generalData = [];
                      e.querySelectorAll('div[dir]').forEach(function (c) {
                        return generalData.push(c.textContent);
                      });

                      var _index = allTweets.findIndex(function (v) {
                        return v.url == url;
                      });

                      if (_index === -1) {
                        tweets.push({
                          text: text,
                          datetime: datetime,
                          url: url,
                          generalData: generalData
                        });
                      }
                    }
                  } catch (e) {
                    console.log('skiped a tweet...');
                  }
                });
                return tweets;
              }, {
                allTweets: allTweets,
                TWEETS_SELECTOR: TWEETS_SELECTOR,
                TAB: TAB
              }));

            case 29:
              results = _context4.sent;

              if (!(results.length == 0)) {
                _context4.next = 32;
                break;
              }

              return _context4.abrupt("break", 63);

            case 32:
              allTweets = allTweets.concat(results);
              console.log(Object.keys(allTweets).length);
              _context4.next = 36;
              return regeneratorRuntime.awrap(this.page.evaluate('document.body.scrollHeight'));

            case 36:
              previousHeight = _context4.sent;
              _context4.next = 39;
              return regeneratorRuntime.awrap(this.page.evaluate('window.scrollTo(0, document.body.scrollHeight)'));

            case 39:
              _context4.next = 41;
              return regeneratorRuntime.awrap(this.page.waitForFunction("document.body.scrollHeight > ".concat(previousHeight), {
                timeout: 6000
              }));

            case 41:
              _context4.next = 43;
              return regeneratorRuntime.awrap(this.page.waitFor(500));

            case 43:
              _context4.next = 61;
              break;

            case 45:
              _context4.prev = 45;
              _context4.t1 = _context4["catch"](26);
              console.log('timeout... moving page to continue...');

              if (!(retries > 1)) {
                _context4.next = 50;
                break;
              }

              return _context4.abrupt("break", 63);

            case 50:
              _context4.next = 52;
              return regeneratorRuntime.awrap(this.page.evaluate('window.scrollTo(0, 0)'));

            case 52:
              _context4.next = 54;
              return regeneratorRuntime.awrap(this.page.waitFor(1000));

            case 54:
              _context4.next = 56;
              return regeneratorRuntime.awrap(this.page.evaluate('window.scrollTo(0, document.body.scrollHeight-500)'));

            case 56:
              _context4.next = 58;
              return regeneratorRuntime.awrap(this.page.waitFor(1000));

            case 58:
              _context4.next = 60;
              return regeneratorRuntime.awrap(this.page.evaluate('window.scrollTo(0, document.body.scrollHeight)'));

            case 60:
              retries++;

            case 61:
              _context4.next = 25;
              break;

            case 63:
              return _context4.abrupt("return", allTweets);

            case 64:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this, [[3, 21], [26, 45]]);
    }
  }, {
    key: "doFollow",
    value: function doFollow(profile) {
      var FOLLOW_BUTTON_SELECTOR;
      return regeneratorRuntime.async(function doFollow$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              FOLLOW_BUTTON_SELECTOR = "div[id='subscribe-button'][class='style-scope ytd-c4-tabbed-header-renderer']";
              _context5.next = 3;
              return regeneratorRuntime.awrap(this.page["goto"]("https://www.youtube.com/channel/".concat(profile)));

            case 3:
              _context5.prev = 3;
              _context5.next = 6;
              return regeneratorRuntime.awrap(this.page.waitFor(FOLLOW_BUTTON_SELECTOR, {
                timeout: 3000
              }));

            case 6:
              _context5.next = 8;
              return regeneratorRuntime.awrap(this.page.click(FOLLOW_BUTTON_SELECTOR));

            case 8:
              _context5.next = 13;
              break;

            case 10:
              _context5.prev = 10;
              _context5.t0 = _context5["catch"](3);
              console.log('already followed');

            case 13:
              _context5.next = 15;
              return regeneratorRuntime.awrap(this.page.waitFor(5000));

            case 15:
            case "end":
              return _context5.stop();
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