/**
 * Created by Zhongyi on 5/2/16.
 */

'use strict';

const path = require('path');
const isXfce = require('is-xfce');
const { app, shell, BrowserWindow } = require('electron');
const electronLocalShortcut = require('electron-localshortcut');

const AppConfig = require('../../configuration');

const CSSInjector = require('../../inject/css');
const MessageHandler = require('../../handlers/message');
const UpdateHandler = require('../../handlers/update');

const lan = AppConfig.readSettings('language');

let Common;
if (lan === 'zh-CN') {
  Common = require('../../common_cn');
} else {
  Common = require('../../common');
}

class WeChatWindow {
  constructor() {
    this.isShown = false;
    this.loginState = { NULL: -2, WAITING: -1, YES: 1, NO: 0 };
    this.loginState.current = this.loginState.NULL;
    this.inervals = {};
    this.createWindow();
    this.initWechatWindowShortcut();
    this.initWindowEvents();
    this.initWindowWebContent();
  }

  resizeWindow(isLogged, splashWindow) {
    const size = isLogged ? Common.WINDOW_SIZE : Common.WINDOW_SIZE_LOGIN;

    this.wechatWindow.setResizable(isLogged);
    this.wechatWindow.setSize(size.width, size.height);
    if (this.loginState.current === 1 - isLogged || this.loginState.current === this.loginState.WAITING) {
      splashWindow.hide();
      this.show();
      this.wechatWindow.center();
      this.loginState.current = isLogged;
    }
  }

  createWindow() {
    this.wechatWindow = new BrowserWindow({
      title: Common.ELECTRONIC_WECHAT,
      resizable: true,
      center: true,
      show: false,
      frame: true,
      autoHideMenuBar: true,
      icon: path.join(__dirname, '../../../assets/icon.png'),
      titleBarStyle: 'hidden-inset',
      webPreferences: {
        javascript: true,
        plugins: true,
        nodeIntegration: false,
        webSecurity: false,
        preload: path.join(__dirname, '../../inject/preload.js'),
      },
    });

    /* menu is always visible on xfce session */
    isXfce().then(data => {
      if(data) {
        this.wechatWindow.setMenuBarVisibility(true);
        this.wechatWindow.setAutoHideMenuBar(false);
      }
    });
  }

  loadURL(url) {
    this.wechatWindow.loadURL(url);
  }

  show() {
    this.wechatWindow.show();
    this.wechatWindow.focus();
    this.wechatWindow.webContents.send('show-wechat-window');
    this.isShown = true;
  }

  hide() {
    this.wechatWindow.hide();
    this.wechatWindow.webContents.send('hide-wechat-window');
    this.isShown = false;
  }

  connectWeChat() {
    Object.keys(this.inervals).forEach((key, index) => {
      clearInterval(key);
      delete this.inervals[key];
    });

    this.loadURL(Common.WEB_WECHAT);
    const int = setInterval(() => {
      if (this.loginState.current === this.loginState.NULL) {
        this.loadURL(Common.WEB_WECHAT);
        console.log('Reconnect.');
      }
    }, 5000);
    this.inervals[int] = true;
  }

  initWindowWebContent() {
    this.wechatWindow.webContents.setUserAgent(Common.USER_AGENT[process.platform]);
    if (Common.DEBUG_MODE) {
      this.wechatWindow.webContents.openDevTools();
    }

    this.connectWeChat();

    this.wechatWindow.webContents.on('will-navigate', (ev, url) => {
      if (/(.*wx.*\.qq\.com.*)|(web.*\.wechat\.com.*)/.test(url)) return;
      ev.preventDefault();
    });

    this.wechatWindow.webContents.on('dom-ready', () => {
      this.wechatWindow.webContents.insertCSS(CSSInjector.commonCSS);
      if (process.platform === 'darwin') {
        this.wechatWindow.webContents.insertCSS(CSSInjector.osxCSS);
      }

      if (!UpdateHandler.CHECKED) {
        new UpdateHandler().checkForUpdate(`v${app.getVersion()}`, true);
      }
    });

    this.wechatWindow.webContents.on('new-window', (event, url) => {
      event.preventDefault();
      shell.openExternal(new MessageHandler().handleRedirectMessage(url));
    });

    this.wechatWindow.webContents.on('will-navigate', (event, url) => {
      if (url.endsWith('/fake')) event.preventDefault();
    });
  }

  initWindowEvents() {
    this.wechatWindow.on('close', (e) => {
      if (this.wechatWindow.isVisible()) {
        e.preventDefault();
        this.hide();
      }
      this.unregisterLocalShortCut();
    });

    this.wechatWindow.on('page-title-updated', (ev) => {
      if (this.loginState.current === this.loginState.NULL) {
        this.loginState.current = this.loginState.WAITING;
      }
      ev.preventDefault();
    });

    this.wechatWindow.on('show', () => {
      this.registerLocalShortcut();
    });
  }

  registerLocalShortcut() {
    electronLocalShortcut.register(this.wechatWindow, 'CommandOrControl + H', () => {
      this.wechatWindow.hide();
    });
  }

  unregisterLocalShortCut() {
    electronLocalShortcut.unregisterAll(this.wechatWindow);
  }

  initWechatWindowShortcut() {
    this.registerLocalShortcut();
  }
}

module.exports = WeChatWindow;
