/**
 * Created by Zhongyi on 5/2/16.
 */
"use strict";

const path = require('path');
const electron = require('electron');
const app = electron.app;
const shell = electron.shell;
const BrowserWindow = electron.BrowserWindow;
const Common = require('../../common');

const CSSInjector = require('../../inject/css');
const MessageHandler = require('../../handlers/message');
const UpdateHandler = require('../../handlers/update');
class WeChatWindow {
  constructor() {
    this.createWindow();
    this.isShown = false;
  }

  resizeWindow(isLogged, splashWindow) {
    const size = isLogged ? Common.WINDOW_SIZE : Common.WINDOW_SIZE_LOGIN;

    this.wechatWindow.setResizable(isLogged);
    this.wechatWindow.setSize(size.width, size.height);
    this.wechatWindow.center();
    if (this.logged != isLogged) {
      splashWindow.hide();
      this.wechatWindow.show();
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
        preload: path.join(__dirname, '../../inject/preload.js')
      }
    });

    this.wechatWindow.webContents.setUserAgent(Common.USER_AGENT);
    if (Common.DEBUG_MODE) {
      this.wechatWindow.webContents.openDevTools();
    }

    this.wechatWindow.loadURL(Common.WEB_WECHAT);

    this.wechatWindow.webContents.on('will-navigate', (ev, url) => {
      if (/(.*wx.*\.qq\.com.*)|(web.*\.wechat\.com.*)/.test(url)) return;
      ev.preventDefault();
    });

    this.wechatWindow.on('close', (e) => {
      if (this.wechatWindow.isVisible()) {
        e.preventDefault();
        this.wechatWindow.hide();
      }
    });

    this.wechatWindow.on('page-title-updated', (ev) => {
      ev.preventDefault();
    });

    this.wechatWindow.webContents.on('dom-ready', () => {
      this.wechatWindow.webContents.insertCSS(CSSInjector.commonCSS);
      if (process.platform == "darwin") {
        this.wechatWindow.webContents.insertCSS(CSSInjector.osxCSS);
      }

      new UpdateHandler().checkForUpdate(`v${app.getVersion()}`, true);
    });

    this.wechatWindow.webContents.on('new-window', (event, url) => {
      event.preventDefault();
      shell.openExternal(new MessageHandler().handleRedirectMessage(url));
    });
  }

  loadURL(url) {
    this.wechatWindow.loadURL(url);
  }

  show() {
    this.wechatWindow.show();
    this.isShown = true;
  }

  hide() {
    this.wechatWindow.hide();
    this.isShown = false;
  }

  Toggle() {
    if (this.isShown) {
      this.hide();
    } else {
      this.show();
    }
  }
}

module.exports = WeChatWindow;
