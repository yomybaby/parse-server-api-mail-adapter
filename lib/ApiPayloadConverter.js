"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @class ApiPayloadConverter
 * @description Converter of mail payload for various mail provider APIs.
 */
var ApiPayloadConverter = /*#__PURE__*/function () {
  function ApiPayloadConverter() {
    _classCallCheck(this, ApiPayloadConverter);
  }

  _createClass(ApiPayloadConverter, null, [{
    key: "mailgun",
    value:
    /**
     * @description Converts the mail payload for the official Mailgun client.
     * @param {Object} originalPayload The original payload (provider agnostic).
     * @returns {Object} The payload according to Mailgun client specification.
     */
    function mailgun(originalPayload) {
      // Clone payload
      var payload = Object.assign({}, originalPayload); // Substitute keys

      if (payload.replyTo) {
        payload['h:Reply-To'] = payload.replyTo;
        delete payload.replyTo;
      }

      return payload;
    }
  }]);

  return ApiPayloadConverter;
}();

module.exports = ApiPayloadConverter;
//# sourceMappingURL=ApiPayloadConverter.js.map