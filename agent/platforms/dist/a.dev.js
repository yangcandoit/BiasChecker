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
              return regeneratorRuntime.awrap(this.page["goto"]('https://www.reddit.com/login/'));

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
    key: "downloadyml",
    value: function downloadyml(term, maxResults, interval) {
      var selector;
      return regeneratorRuntime.async(function downloadyml$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              selector = 'a[data-original-title="Download"]';
              _context2.next = 3;
              return regeneratorRuntime.awrap(this.page["goto"]('https://gitlab.com/fdroid/fdroiddata/-/blob/master/metadata/io.treehouses.remote.yml'));

            case 3:
              _context2.next = 5;
              return regeneratorRuntime.awrap(this.page.waitForSelector(selector));

            case 5:
              _context2.next = 7;
              return regeneratorRuntime.awrap(this.page.click(selector));

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }]);

  return TwitterSearch;
}();

module.exports = TwitterSearch;