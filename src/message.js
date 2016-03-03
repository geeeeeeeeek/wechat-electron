'use strict';

let handler = {};

handler.handleEmojiMessage = (response, requestId, debug) => {
  const urlReg = /.+wx.*\.qq\.com\/cgi-bin\/mmwebwx-bin\/webwxsync.+/;

  return new Promise((resolve) => {
    if (urlReg.test(response.url)) {
      // console.log(response);
      debug.sendCommand('Network.getResponseBody', {
        'requestId': requestId
      }, (error, networkResponse) => {
        let emojiList = {};
        let body;
        try {
          body = JSON.parse(networkResponse.body);
        } catch (e) {
          resolve(emojiList);
        }
        if (body.AddMsgCount && body.AddMsgCount > 0) {
          let msgList = body.AddMsgList;
          for (let msg of msgList) {
            let msgId = msg.MsgId;
            const MSGTYPE_EMOTICON = 47;
            if (msg.MsgType === MSGTYPE_EMOTICON) {
              let cdnUrlReg = /cdnurl\s*\=\s*\"(\S*)\"/;
              let result = cdnUrlReg.exec(msg.Content);
              if (result) {
                emojiList[`${msgId}`] = result[1];
              }
            }
          }
        }
        resolve(emojiList);
      });
    }
  });
};

handler.handleRedirectMessage = (originalUrl) => {
  let regex = new RegExp('[\\?&]requrl=([^&#]*)');
  let redirectedUrl = regex.exec(originalUrl);
  if (redirectedUrl) {
    return decodeURIComponent(redirectedUrl[1].replace(/\+/g, ' '));
  } else {
    return redirectedUrl;
  }
};

module.exports = handler;
