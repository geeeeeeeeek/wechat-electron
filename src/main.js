/* eslint-disable */
'use strict';

const path = require('path');
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcMain;
const shell = electron.shell;
const Menu = electron.Menu;

const injectBundle = require('./inject-onload.js');
const messageHandler = require('./message.js');

const WINDOW_TITLE = 'Electronic WeChat';

let browserWindow = null;
let appIcon = null;

let createWindow = () => {
  browserWindow = new BrowserWindow({
    title: WINDOW_TITLE,
    width: 800,
    height: 600,
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
      preload: __dirname + '/inject-preload.js'
    }
  });

  browserWindow.webContents.setUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2227.1 Safari/537.36");
  //browserWindow.webContents.openDevTools();

  browserWindow.loadURL("https://wx.qq.com/");

  browserWindow.webContents.on('will-navigate', (ev, url) => {
    if (/(.*wx.*\.qq\.com.*)|(web2?.wechat.com)/.test(url)) return;
    ev.preventDefault();
  });

  browserWindow.on('close', (e) => {
    if (browserWindow.isVisible()) {
      e.preventDefault();
      browserWindow.hide();
    }
  });

  browserWindow.on('closed', () => {
    browserWindow = null;
    appIcon.destroy();
    appIcon = null;
  });

  browserWindow.on('page-title-updated', (ev) => {
    ev.preventDefault();
  });

  browserWindow.webContents.on('dom-ready', () => {
    browserWindow.webContents.insertCSS(injectBundle.wechatCSS);
    if (process.platform == "darwin") {
      browserWindow.webContents.insertCSS(injectBundle.osxCSS);
    }
    browserWindow.webContents.executeJavaScript(`injectBundle.getBadgeJS()`);
  });

  browserWindow.webContents.on('new-window', (event, url) => {
    event.preventDefault();
    shell.openExternal(messageHandler.handleRedirectMessage(url));
  });

  createTray();
};

app.on('ready', createWindow);

app.on('activate', () => {
  if (browserWindow == null) {
    createWindow();
  } else {
    browserWindow.show();
  }
});

ipcMain.on('badge-changed', (event, num) => {
  if (process.platform == "darwin") {
    app.dock.setBadge(num);
    if (num) appIcon.setTitle(` ${num}`);
    else appIcon.setTitle('');
  }
});

ipcMain.on('log', (event, message) => {
  console.log(message);
});

ipcMain.on('reload', (event, message) => {
  browserWindow.loadURL("https://wx.qq.com/");
});

let createTray = () => {
  appIcon = new electron.Tray(path.join(__dirname, '../assets/icon20x20.png'));
  appIcon.setToolTip('Electronic WeChat');

  if (process.platform == "linux") {
    let contextMenu = Menu.buildFromTemplate([
         {label: 'Show', click: () => browserWindow.show()},
         {label: 'Exit', click: () => app.exit(0)}
    ]);
    appIcon.setContextMenu(contextMenu);
  }else {
    appIcon.on('click', () => browserWindow.show());
  }
}
