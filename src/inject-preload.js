"use strict";
const ipcRenderer = require('electron').ipcRenderer;
const webFrame = require('web-frame');
const menu = require('./menu.js');

const lock = (object, key, value) => Object.defineProperty(object, key, {
  get: () => value,
  set: () => {
  }
});

webFrame.setZoomLevelLimits(1, 1);

lock(window, 'console', window.console);

let angular = window.angular = {};
let angularBootstrapReal;
Object.defineProperty(angular, 'bootstrap', {
  get: () => angularBootstrapReal ? function (element, moduleNames) {
    const moduleName = 'webwxApp';
    if (moduleNames.indexOf(moduleName) >= 0) {
      let constants;
      angular.injector(['ng', 'Services']).invoke(['confFactory', (confFactory) => (constants = confFactory)]);
      angular.module(moduleName).config([
        '$httpProvider',
        ($httpProvider) => {
          $httpProvider.defaults.transformResponse.push((value) => {
            if (typeof value === 'object' && value !== null && value.AddMsgList instanceof Array) {
              value.AddMsgList.forEach((msg) => {
                switch (msg.MsgType) {
                  case constants.MSGTYPE_EMOTICON:
                    lock(msg, 'MMDigest', '[Emoticon]');
                    lock(msg, 'MsgType', constants.MSGTYPE_EMOTICON);
                    break;
                  case constants.MSGTYPE_RECALLED:
                    lock(msg, 'MsgType', constants.MSGTYPE_SYS);
                    lock(msg, 'MMActualContent', '阻止了一次撤回');
                    lock(msg, 'MMDigest', '阻止了一次撤回');
                    break;
                }
              });
            }
            return value;
          });
        }
      ]);
    }
    return angularBootstrapReal.apply(angular, arguments);
  } : angularBootstrapReal,
  set: (real) => (angularBootstrapReal = real)
});

window.injectBundle = {};
injectBundle.getBadgeJS = () => {
  setInterval(() => {
    var count = 0;
    $(".icon.web_wechat_reddot_middle").each(function () {
      count += parseInt(this.textContent);
    });
    if (count > 0) {
      ipcRenderer.send("badge-changed", count.toString());
    } else {
      ipcRenderer.send("badge-changed", "");
    }
  }, 1500);
};

injectBundle.injectAtUserDom = () => {
  var div = document.createElement('div');
  div.setAttribute('id', 'at_user');
  div.style.display = 'none',
  div.style.position = 'fixed',
  div.style.bottom = '182px',
  div.style.left = '50%',
  div.style.backgroundColor = 'white',
  div.style.padding = '20px';
  div.innerHTML = '<select multiple style="width: 200px;"></select>';
  document.body.appendChild(div);

  (function atUser() {
    const $editArea = document.querySelector('#editArea');

    if (!$editArea) {
      return setTimeout(atUser, 3000);
    }

    const $atUser = document.querySelector('#at_user');

    $atUser.querySelector('select').onchange = function() {
      $editArea.innerHTML = $editArea.innerHTML.replace(/@\S*$/ig, `@${this.value} `);
      $atUser.style.display = 'none';
    };

    const trim = nick => nick.replace(/<span.*>.*<\/span>/, '');

    $editArea.oninput = function() {
      const name = /@(\S*)$/.exec($editArea.innerHTML);
      if (name) {
        const $scope = angular.element('.box_hd').scope();
        const nameRe = new RegExp(name[1], 'ig');
        $atUser.querySelector('select').innerHTML = $scope.currentContact.MemberList.map(m => {
          if (!nameRe.test(trim(m.NickName))) return '';
          return `<option value="${trim(m.NickName)}">${trim(m.NickName)}</option>`;
        });
        $atUser.querySelector('select').value = '';
        $atUser.style.display = '';
        $atUser.focus();
      } else {
        $atUser.style.display = 'none';
      }
    };
  })();
}

menu.create();
