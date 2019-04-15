'use strict';

/**
 * Map of constant values used throughout the application
 * @type {Object}
 */
/* istanbul ignore next */
module.exports = {
  HTTP_STATUS_CODE : {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST : 400,
    UNAUTHENTICATED: 401,
    UNAUTHORIZED: 403,
    NOT_FOUND: 404,
    UNSUPPORTED_MEDIA_TYPE: 415,
    READ_TIMEOUT: 408,
    SERVER_ERROR: 500,
    BAD_GATEWAY: 502,
    CONNECT_TIMEOUT: 504,
    FORBIDDEN: 403,
  },
  CONTENT_TYPES : {
    JSON: 'application/json',
    FORM: 'application/x-www-form-urlencoded'
	},
	ENV: {
		DEFAULT_TIMEOUT_MINUTES: process.env.DEFAULT_TIMEOUT_MINUTES || 30,
		MONGO_DB: process.env.MONGO_CONNECTION_STRING || 'mongodb://localhost:27017/imranmac',
		PORT: process.env.PORT || 7000
	},
  SIGNALS: {
    AUTH_SUCCESS: 'authentication succeeded',
    AUTH_FAILED: 'authentication failed',
    NO_AUTH: 'User is not authenticated',
    BAD_EMAIL: 'Email not valid',
    GOOD_EMAIL: 'Forgot Password link has been sent',
  }
};
