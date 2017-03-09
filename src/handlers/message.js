'use strict';

const qs = require('querystring');
const url = require('url');

class MessageHandler {
  handleRedirectMessage(origin) {
    return qs.parse(url.parse(origin).query).requrl || origin;
  }
}

module.exports = MessageHandler;
