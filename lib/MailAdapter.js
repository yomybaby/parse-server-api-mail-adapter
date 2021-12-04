"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* eslint-disable no-unused-vars */

/**
 * Mail Adapter prototype
 * A MailAdapter should implement at least sendMail()
 */
var MailAdapter = /*#__PURE__*/function () {
  function MailAdapter() {
    _classCallCheck(this, MailAdapter);
  }

  _createClass(MailAdapter, [{
    key: "sendMail",
    value:
    /*
     * A method for sending mail
     * @param options would have the parameters
     * - to: the recipient
     * - text: the raw text of the message
     * - subject: the subject of the email
     */
    function sendMail(options) {}
  }, {
    key: "sendVerificationEmail",
    value: function sendVerificationEmail(_ref) {
      var link = _ref.link,
          appName = _ref.appName,
          user = _ref.user;
    }
  }, {
    key: "sendPasswordResetEmail",
    value: function sendPasswordResetEmail(_ref2) {
      var link = _ref2.link,
          appName = _ref2.appName,
          user = _ref2.user;
    }
  }]);

  return MailAdapter;
}();

module.exports = MailAdapter;
//# sourceMappingURL=MailAdapter.js.map