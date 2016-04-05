/* eslint-disable */
'use strict';

const path = require('path');
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcMain;
const shell = electron.shell;
const Menu = electron.Menu;
const nativeImage = electron.nativeImage;

const injectBundle = require('./inject/onload');
const MessageHandler = require('./handler/message');
const UpdateHandler = require('./handler/update');
const Common = require('./common');

class ElectronicWeChat {
  constructor() {
    this.browserWindow = null;
    this.tray = null;
    this.logged = null;
  }

  init() {
    this.initApp();
    this.initIPC();
  }

  initApp() {
    app.on('ready', ()=> {
      this.createWindow();
      this.createTray();
    });

    app.on('activate', () => {
      if (this.browserWindow == null) {
        this.createWindow();
      } else {
        this.browserWindow.show();
      }
    });
  };

  initIPC() {
    ipcMain.on('badge-changed', (event, num) => {
      if (process.platform == "darwin") {
        app.dock.setBadge(num);
        if (num) {
          this.tray.setTitle(` ${num}`);
        } else {
          this.tray.setTitle('');
        }
      }
    });

    ipcMain.on('user-logged', () => this.resizeWindow(true));

    ipcMain.on('wx-rendered', (event, isLogged) => this.resizeWindow(isLogged));

    ipcMain.on('log', (event, message) => {
      console.log(message);
    });

    ipcMain.on('reload', (event, message) => {
      this.browserWindow.loadURL("https://wx.qq.com/");
    });

    ipcMain.on('update', (event, message) => {
      let updateHandler = new UpdateHandler();
      updateHandler.checkForUpdate(`v${app.getVersion()}`, false);
    });
  };

  createTray() {
    let image = nativeImage.createFromPath(path.join(__dirname, '../assets/status_bar.png'));
    image.setTemplateImage(true);

    this.tray = new electron.Tray(image);
    this.tray.setToolTip(Common.ELECTRONIC_WECHAT);

    if (process.platform == "linux") {
      let contextMenu = Menu.buildFromTemplate([
        {label: 'Show', click: () => this.browserWindow.show()},
        {label: 'Exit', click: () => app.exit(0)}
      ]);
      this.tray.setContextMenu(contextMenu);
    } else {
      this.tray.on('click', () => this.browserWindow.show());
    }
  }

  resizeWindow(isLogged) {
    const size = isLogged ? Common.WINDOW_SIZE : Common.WINDOW_SIZE_LOGIN;

    this.browserWindow.setResizable(isLogged);
    this.browserWindow.setSize(size.width, size.height);
    this.browserWindow.center();
    if (this.logged != isLogged) this.browserWindow.show();
    this.logged = isLogged;
  }

  createWindow() {
    this.browserWindow = new BrowserWindow({
      title: Common.ELECTRONIC_WECHAT,
      resizable: true,
      center: true,
      show: true,
      frame: true,
      autoHideMenuBar: true,
      icon: 'assets/icon.png',
      titleBarStyle: 'hidden-inset',
      'web-preferences': {
        javascript: true,
        plugins: true,
        nodeIntegration: false,
        webSecurity: false,
        preload: __dirname + '/inject/preload.js'
      }
    });

    this.browserWindow.webContents.setUserAgent(Common.USER_AGENT);
    // this.browserWindow.webContents.openDevTools();

    this.browserWindow.loadURL(Common.WEB_WECHAT);

    this.browserWindow.webContents.on('will-navigate', (ev, url) => {
      if (/(.*wx.*\.qq\.com.*)|(web.*\.wechat\.com.*)/.test(url)) return;
      ev.preventDefault();
    });

    this.browserWindow.on('close', (e) => {
      if (this.browserWindow.isVisible()) {
        e.preventDefault();
        this.browserWindow.hide();
      }
    });

    this.browserWindow.on('closed', () => {
      this.browserWindow = null;
      this.tray.destroy();
      this.tray = null;
    });

    this.browserWindow.on('page-title-updated', (ev) => {
      ev.preventDefault();
    });

    this.browserWindow.webContents.on('dom-ready', () => {
      this.browserWindow.webContents.insertCSS(injectBundle.commonCSS);
      if (process.platform == "darwin") {
        this.browserWindow.webContents.insertCSS(injectBundle.osxCSS);
      }
      this.browserWindow.webContents.executeJavaScript(`injectBundle.getBadgeJS()`);
      this.browserWindow.webContents.executeJavaScript(`injectBundle.injectAtUserDom()`);

      new UpdateHandler().checkForUpdate(`v${app.getVersion()}`, true);
    });

    this.browserWindow.webContents.on('new-window', (event, url) => {
      event.preventDefault();
      shell.openExternal(new MessageHandler().handleRedirectMessage(url));
    });

    this.browserWindow.hide();
  }
}

new ElectronicWeChat().init();
