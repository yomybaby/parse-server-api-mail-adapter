"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var path = require('path');

var fs = require('fs').promises;

var Mustache = require('mustache');

var MailAdapter = require('./MailAdapter');

var Errors = require('./Errors');
/**
 * @class ApiMailAdapter
 * @description An email adapter for Parse Server to send emails via mail provider APIs.
 */


var ApiMailAdapter = /*#__PURE__*/function (_MailAdapter) {
  _inherits(ApiMailAdapter, _MailAdapter);

  var _super = _createSuper(ApiMailAdapter);

  /**
   * Creates a new mail adapter.
   * @param {Object} options The configuration options.
   */
  function ApiMailAdapter(options) {
    var _this;

    _classCallCheck(this, ApiMailAdapter);

    // Get parameters
    var _ref = options || {},
        sender = _ref.sender,
        templates = _ref.templates,
        apiCallback = _ref.apiCallback; // Ensure required parameters are set


    if (!sender) {
      throw Errors.Error.configurationInvalid;
    } // Ensure email templates are set


    if (!templates || Object.keys(templates).length === 0) {
      throw Errors.Error.templatesInvalid;
    } // Ensure API callback is set


    if (typeof apiCallback !== 'function') {
      throw Errors.Error.apiCallbackNoFunction;
    } // Initialize


    _this = _super.call(this, options); // Validate templates

    for (var key in templates) {
      _this._validateTemplate(templates[key]);
    } // Set properties


    _this.sender = sender;
    _this.templates = templates;
    _this.apiCallback = apiCallback;
    return _this;
  }
  /**
   * @function sendPasswordResetEmail
   * @description Sends a password reset email.
   * @param {String} link The password reset link.
   * @param {String} appName The app name.
   * @param {String} user The Parse User.
   * @returns {Promise<Any>} The mail provider API response.
   */


  _createClass(ApiMailAdapter, [{
    key: "sendPasswordResetEmail",
    value: function sendPasswordResetEmail(_ref2) {
      var link = _ref2.link,
          appName = _ref2.appName,
          user = _ref2.user;
      return this._sendMail({
        templateName: 'passwordResetEmail',
        link: link,
        appName: appName,
        user: user
      });
    }
    /**
     * @function sendVerificationEmail
     * @description Sends a verification email.
     * @param {String} link The email verification link.
     * @param {String} appName The app name.
     * @param {String} user The Parse User.
     * @returns {Promise<Any>} The mail provider API response.
     */

  }, {
    key: "sendVerificationEmail",
    value: function sendVerificationEmail(_ref3) {
      var link = _ref3.link,
          appName = _ref3.appName,
          user = _ref3.user;
      return this._sendMail({
        templateName: 'verificationEmail',
        link: link,
        appName: appName,
        user: user
      });
    }
    /**
     * @function sendMail
     * @description Sends an email.
     * @param {String} [sender] The email from address.
     * @param {String} recipient The email recipient; if set overrides the email address of the `user`.
     * @param {String} [subject] The email subject.
     * @param {String} [text] The plain-text email content.
     * @param {String} [html] The HTML email content.
     * @param {String} [templateName] The template name.
     * @param {Object} [placeholders] The template placeholders.
     * @param {Object} [extra] Any additional variables to pass to the mail provider API.
     * @param {Parse.User} [user] The Parse User that the is the recipient of the email.
     * @returns {Promise<Any>} The mail provider API response.
     */

  }, {
    key: "sendMail",
    value: function () {
      var _sendMail2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref4) {
        var sender, recipient, subject, text, html, templateName, placeholders, extra, user;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                sender = _ref4.sender, recipient = _ref4.recipient, subject = _ref4.subject, text = _ref4.text, html = _ref4.html, templateName = _ref4.templateName, placeholders = _ref4.placeholders, extra = _ref4.extra, user = _ref4.user;
                _context.next = 3;
                return this._sendMail({
                  sender: sender,
                  recipient: recipient,
                  subject: subject,
                  text: text,
                  html: html,
                  templateName: templateName,
                  placeholders: placeholders,
                  extra: extra,
                  user: user,
                  direct: true
                });

              case 3:
                return _context.abrupt("return", _context.sent);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function sendMail(_x) {
        return _sendMail2.apply(this, arguments);
      }

      return sendMail;
    }()
    /**
     * @function _sendMail
     * @description Sends an email.
     * @param {Object} email The email to send.
     * @returns {Promise} The mail provider API response.
     */

  }, {
    key: "_sendMail",
    value: function () {
      var _sendMail3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(email) {
        var message, user, userEmail, templateName, template, placeholders, link, appName, apiData;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                // Define parameters
                user = email.user;
                userEmail = user ? user.get('email') || user.get('username') : undefined;
                templateName = email.templateName; // If template name is not set

                if (!(!templateName && !email.direct)) {
                  _context2.next = 5;
                  break;
                }

                throw Errors.Error.templateConfigurationNoName;

              case 5:
                // Get template
                template = this.templates[templateName]; // If template does not exist

                if (!(!template && !email.direct)) {
                  _context2.next = 8;
                  break;
                }

                throw Errors.Error.noTemplateWithName(templateName);

              case 8:
                // Add template placeholders;
                // Placeholders sources override each other in this order:
                // 1. Placeholders set in the template (default)
                // 2. Placeholders set in the email
                // 3. Placeholders returned by the placeholder callback
                placeholders = {}; // Add template placeholders

                if (template) {
                  placeholders = Object.assign(placeholders, template.placeholders || {});
                } // If the email is sent directly via Cloud Code


                if (!email.direct) {
                  _context2.next = 17;
                  break;
                }

                if (!(!email.recipient && !userEmail)) {
                  _context2.next = 13;
                  break;
                }

                throw Errors.Error.noRecipient;

              case 13:
                // Add placeholders specified in email
                Object.assign(placeholders, email.placeholders || {}); // Set message properties

                message = Object.assign({
                  from: email.sender || this.sender,
                  to: email.recipient || userEmail,
                  subject: email.subject,
                  text: email.text,
                  html: email.html
                }, email.extra || {});
                _context2.next = 20;
                break;

              case 17:
                // Get email parameters
                link = email.link, appName = email.appName; // Add default placeholders for templates

                Object.assign(placeholders, {
                  link: link,
                  appName: appName,
                  email: userEmail,
                  username: user.get('username')
                }); // Set message properties

                message = {
                  from: this.sender,
                  to: userEmail
                };

              case 20:
                _context2.next = 22;
                return this._createApiData({
                  message: message,
                  template: template,
                  placeholders: placeholders,
                  user: user
                });

              case 22:
                apiData = _context2.sent;
                _context2.next = 25;
                return this.apiCallback(apiData);

              case 25:
                return _context2.abrupt("return", _context2.sent);

              case 26:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _sendMail(_x2) {
        return _sendMail3.apply(this, arguments);
      }

      return _sendMail;
    }()
    /**
     * @typedef {Object} CreateApiDataResponse
     * @property {Object} payload The generic API payload.
     * @property {String} payload.from The sender email address.
     * @property {String} payload.to The recipient email address.
     * @property {String} payload.replyTo The reply-to address.
     * @property {String} payload.subject The subject.
     * @property {String} payload.text The plain-text content.
     * @property {String} payload.html The HTML content.
     * @property {String} payload.message The MIME content.
     * @property {String} [locale] The user locale, if it has been determined via the
     * locale callback.
     */

    /**
     * @function _createApiData
     * @description Creates the API data, includes the payload and optional meta data.
     * @param {Object} options The payload options.
     * @param {Object} options.message The message to send.
     * @param {Object} options.template The email template to use.
     * @param {Object} [options.placeholders] The email template placeholders.
     * @param {Object} [options.user] The Parse User who is the email recipient.
     * @returns {Promise<CreateApiDataResponse>} The API data.
     */

  }, {
    key: "_createApiData",
    value: function () {
      var _createApiData2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(options) {
        var message, _options$template, template, user, _options$placeholders, placeholders, placeholderCallback, localeCallback, locale, placeholderCopy, callbackPlaceholders, subject, text, html, payload;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                message = options.message;
                _options$template = options.template, template = _options$template === void 0 ? {} : _options$template, user = options.user, _options$placeholders = options.placeholders, placeholders = _options$placeholders === void 0 ? {} : _options$placeholders;
                placeholderCallback = template.placeholderCallback, localeCallback = template.localeCallback;

                if (!localeCallback) {
                  _context3.next = 8;
                  break;
                }

                _context3.next = 6;
                return localeCallback(user);

              case 6:
                locale = _context3.sent;
                locale = this._validateUserLocale(locale);

              case 8:
                if (!placeholderCallback) {
                  _context3.next = 15;
                  break;
                }

                // Copy placeholders to prevent any direct changes
                placeholderCopy = Object.assign({}, placeholders); // Add placeholders from callback

                _context3.next = 12;
                return placeholderCallback({
                  user: user,
                  locale: locale,
                  placeholders: placeholderCopy
                });

              case 12:
                callbackPlaceholders = _context3.sent;
                callbackPlaceholders = this._validatePlaceholders(callbackPlaceholders);
                Object.assign(placeholders, callbackPlaceholders);

              case 15:
                _context3.t0 = message.subject;

                if (_context3.t0) {
                  _context3.next = 20;
                  break;
                }

                _context3.next = 19;
                return this._loadFile(template.subjectPath, locale);

              case 19:
                _context3.t0 = _context3.sent;

              case 20:
                subject = _context3.t0;

                // If subject is available
                if (subject) {
                  // Set email subject
                  message.subject = subject.toString('utf8'); // Fill placeholders in subject

                  message.subject = this._fillPlaceholders(message.subject, placeholders);
                } // Get text content


                _context3.t1 = message.text;

                if (_context3.t1) {
                  _context3.next = 27;
                  break;
                }

                _context3.next = 26;
                return this._loadFile(template.textPath, locale);

              case 26:
                _context3.t1 = _context3.sent;

              case 27:
                text = _context3.t1;

                // If text content is available
                if (text) {
                  // Set email text content
                  message.text = text.toString('utf8'); // Fill placeholders in text

                  message.text = this._fillPlaceholders(message.text, placeholders);
                } // Get HTML content


                _context3.t2 = message.html;

                if (_context3.t2) {
                  _context3.next = 39;
                  break;
                }

                if (!template.htmlPath) {
                  _context3.next = 37;
                  break;
                }

                _context3.next = 34;
                return this._loadFile(template.htmlPath, locale);

              case 34:
                _context3.t3 = _context3.sent;
                _context3.next = 38;
                break;

              case 37:
                _context3.t3 = undefined;

              case 38:
                _context3.t2 = _context3.t3;

              case 39:
                html = _context3.t2;

                // If HTML content is available
                if (html) {
                  // Set email HTML content
                  message.html = html.toString('utf8'); // Fill placeholders in HTML

                  message.html = this._fillPlaceholders(message.html, placeholders);
                } // Append any additional message properties;
                // Extras sources override each other in this order:
                // 1. Extras set in the template (default)
                // 2. Extras set when sending directly via sendMail()


                message = Object.assign({}, template.extra, message); // Assemble payload

                payload = {
                  from: message.from,
                  to: message.to,
                  subject: message.subject,
                  text: message.text
                }; // Add optional message properties

                if (message.html) {
                  payload.html = message.html;
                }

                if (message.replyTo) {
                  payload.replyTo = message.replyTo;
                }

                return _context3.abrupt("return", {
                  payload: payload,
                  locale: locale
                });

              case 46:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function _createApiData(_x3) {
        return _createApiData2.apply(this, arguments);
      }

      return _createApiData;
    }()
    /**
     * @function _loadFile
     * @description Loads a file's content.
     * @param {String} path The file path.
     * @param {String} locale The locale if a localized version of the file should be
     * loaded if available, or `undefined` if no localization should occur.
     * @returns {Promise<Buffer>} The file content.
     */

  }, {
    key: "_loadFile",
    value: function () {
      var _loadFile2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(path, locale) {
        var localizedFilePath, data;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!locale) {
                  _context4.next = 5;
                  break;
                }

                _context4.next = 3;
                return this._getLocalizedFilePath(path, locale);

              case 3:
                localizedFilePath = _context4.sent;
                path = localizedFilePath;

              case 5:
                _context4.next = 7;
                return fs.readFile(path);

              case 7:
                data = _context4.sent;
                return _context4.abrupt("return", data);

              case 9:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function _loadFile(_x4, _x5) {
        return _loadFile2.apply(this, arguments);
      }

      return _loadFile;
    }()
    /**
     * @function _fillPlaceholders
     * @description Substitutes placeholders in a template with their values.
     * @param {String} template The template with placeholders, e.g. {{placeholder}}.
     * @param {Object} placeholders A map of placeholder keys with values.
     * @returns {String} The template with filled in placeholders.
     */

  }, {
    key: "_fillPlaceholders",
    value: function _fillPlaceholders(template, placeholders) {
      return Mustache.render(template, placeholders);
    }
    /**
     * @function _validateTemplate
     * @description Validates a template.
     * @param {Object} template The template to validate.
     * @returns {}
     */

  }, {
    key: "_validateTemplate",
    value: function _validateTemplate(template) {
      // Get template properties
      var subjectPath = template.subjectPath,
          textPath = template.textPath,
          htmlPath = template.htmlPath,
          placeholderCallback = template.placeholderCallback,
          localeCallback = template.localeCallback; // Validate paths

      if (typeof subjectPath !== 'string' || typeof textPath !== 'string' || htmlPath && typeof htmlPath !== 'string') {
        throw Errors.Error.templateContentPathInvalid;
      } // Validate placeholder callback


      if (placeholderCallback && typeof placeholderCallback !== 'function') {
        throw Errors.Error.templateCallbackNoFunction;
      } // Validate locale callback


      if (localeCallback && typeof localeCallback !== 'function') {
        throw Errors.Error.localeCallbackNoFunction;
      }
    }
    /**
     * @function _validatePlaceholders
     * @description Validates the template placeholders.
     * @param {Object} placeholders The template placeholders.
     * @returns {Object} The validated (cleaned) placeholders.
     */

  }, {
    key: "_validatePlaceholders",
    value: function _validatePlaceholders(placeholders) {
      var validUserVars = placeholders && placeholders.constructor === Object;
      return validUserVars ? placeholders : {};
    }
    /**
     * @function _validateUserLocale
     * @description Validates the user locale callback result.
     * @param {String} locale The user locale.
     * @returns {String|undefined} Returns the locale or undefined if the locale is invalid.
     */

  }, {
    key: "_validateUserLocale",
    value: function _validateUserLocale(locale) {
      var isValid = typeof locale === 'string' && locale.length >= 2;
      return isValid ? locale : undefined;
    }
    /**
     * @function getLocalizedFilePath
     * @description Returns a localized file path matching a given locale.
     *
     * Localized files are placed in sub-folders of the given path, for example:
     *
     * root/
     * ├── base/                    // base path to files
     * │   ├── example.html         // default file
     * │   └── de/                  // de language folder
     * │   │   └── example.html     // de localized file
     * │   └── de-AT/               // de-AT locale folder
     * │   │   └── example.html     // de-AT localized file
     *
     * Files are matched with the user locale in the following order:
     * 1. Locale match, e.g. locale `de-AT` matches file in folder `de-AT`.
     * 2. Language match, e.g. locale `de-AT` matches file in folder `de`.
     * 3. Default match: file in base folder is returned.
     *
     * @param {String} filePath The file path.
     * @param {String} locale The locale to match.
     * @returns {Promise<String>} The localized file path, or the original file path
     * if a localized file could not be determined.
     */

  }, {
    key: "_getLocalizedFilePath",
    value: function () {
      var _getLocalizedFilePath2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(filePath, locale) {
        var file, basePath, localePath, localeFileExists, languagePath, languageFileExists;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                // Get file name and base path
                file = path.basename(filePath);
                basePath = path.dirname(filePath); // If locale is not set return default file

                if (locale) {
                  _context5.next = 4;
                  break;
                }

                return _context5.abrupt("return", filePath);

              case 4:
                // Check file for locale exists
                localePath = path.join(basePath, locale, file);
                _context5.next = 7;
                return this._fileExists(localePath);

              case 7:
                localeFileExists = _context5.sent;

                if (!localeFileExists) {
                  _context5.next = 10;
                  break;
                }

                return _context5.abrupt("return", localePath);

              case 10:
                // Check file for language exists
                languagePath = path.join(basePath, locale.split("-")[0], file);
                _context5.next = 13;
                return this._fileExists(languagePath);

              case 13:
                languageFileExists = _context5.sent;

                if (!languageFileExists) {
                  _context5.next = 16;
                  break;
                }

                return _context5.abrupt("return", languagePath);

              case 16:
                return _context5.abrupt("return", filePath);

              case 17:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function _getLocalizedFilePath(_x6, _x7) {
        return _getLocalizedFilePath2.apply(this, arguments);
      }

      return _getLocalizedFilePath;
    }()
    /**
     * @function fileExists
     * @description Checks whether a file exists.
     * @param {String} path The file path.
     * @returns {Promise<Boolean>} Is true if the file can be accessed, false otherwise.
     */

  }, {
    key: "_fileExists",
    value: function () {
      var _fileExists2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(path) {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                _context6.next = 3;
                return fs.access(path);

              case 3:
                return _context6.abrupt("return", true);

              case 6:
                _context6.prev = 6;
                _context6.t0 = _context6["catch"](0);
                return _context6.abrupt("return", false);

              case 9:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[0, 6]]);
      }));

      function _fileExists(_x8) {
        return _fileExists2.apply(this, arguments);
      }

      return _fileExists;
    }()
  }]);

  return ApiMailAdapter;
}(MailAdapter);

module.exports = ApiMailAdapter;
//# sourceMappingURL=ApiMailAdapter.js.map