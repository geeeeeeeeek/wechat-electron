/**
 * Created by Zhongyi on 2/23/16.
 */
'use strict';

let injectBundle = {};

injectBundle.wechatCSS = `
    img.custom_emoji {
      height: initial !important;
      width: 120px !important;
    }
    div.main {
      height: 100% !important;
      min-height: 0 !important;
      padding-top: 0 !important;
    }
    div.main_inner {
      max-width: none !important;
      min-width: 0 !important;
    }
    div.message_empty {
      margin-top: 50px;
    }
    div.img_preview_container div.img_opr_container {
      bottom: 50px !important;
    }
    p.copyright {
      display: none !important
    }
    a.web_wechat_screencut {
      display: none !important;
    }
    * {
      -webkit-user-select: none;
      cursor: default !important;
      -webkit-user-drag: none;
    }
    pre, input {
      -webkit-user-select: initial;
      cursor: initial !important;
    }
    html, body {
      width: 100%;
      height: 100%;
      overflow: hidden;
    }

    div.login_box {
      top: initial;
      left: initial;
      margin-left: initial;
      margin-top: initial;
      width: 100%;
      height: 100%;
    }
    div.login {
      min-width: 0;
      min-height: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
    div.lang, div.copyright {
      display: none !important
    }
  `;

injectBundle.osxCSS = `
    div.header div.avatar img.img {
      width: 24px;
      height: 24px;
    }
    div.header {
      padding-top: 38px;
      padding-bottom: 7px;
    }
`;

module.exports = injectBundle;
