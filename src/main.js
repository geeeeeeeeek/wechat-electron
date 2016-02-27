'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcMain;
const shell = electron.shell;
const globalShortcut = electron.globalShortcut;

const injectBundle = require('./inject-onload.js');
const messageHandler = require('./message.js');
const shortcutBundle = require('./shortcut.js');

const WINDOW_TITLE = 'Electronic WeChat';

let browserWindow = null;

let createWindow = () => {
  browserWindow = new BrowserWindow({
    title: WINDOW_TITLE,
    width: 800,
    height: 600,
    resizable: true,
    center: true,
    show: true,
    frame: true,
    icon: 'icon.png',
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
    if (/.*wx.*\.qq\.com.*/.test(url)) return;
    // Prevent navigation off the site.
    ev.preventDefault();
  });

  browserWindow.on('closed', () => {
    browserWindow = null;
  });

  browserWindow.on('page-title-updated', (ev) => {
    ev.preventDefault();
  });


  try {
    browserWindow.webContents.debugger.attach("1.1");
  } catch (err) {
    console.log("Debugger attach failed : ", err);
  }


  browserWindow.webContents.debugger.on('detach', (event, reason) => {
    console.log("Debugger detached due to : ", reason);
  });

  browserWindow.webContents.debugger.sendCommand("Network.enable");

  browserWindow.webContents.on('dom-ready', () => {
    browserWindow.webContents.insertCSS(injectBundle.loginCSS);
    browserWindow.webContents.insertCSS(injectBundle.wechatCSS);
    browserWindow.webContents.executeJavaScript(`injectBundle.getBadgeJS()`);
  });

  browserWindow.webContents.on('new-window', (event, url) => {
    event.preventDefault();
    shell.openExternal(messageHandler.handleRedirectMessage(url));
  });

  // register all the shortcuts
  for (var i = 0; i < shortcutBundle.shortcuts.length; i++) {
    globalShortcut.register(shortcutBundle.shortcuts[i].key, shortcutBundle.shortcuts[i].func);
  }
};

app.on('ready', createWindow);

app.on('browserWindow-all-closed', () => {
  globalShortcut.unregisterAll();
  app.quit();
});

app.on('activate', () => {
  if (browserWindow == null) {
    createWindow();
  }
});

ipcMain.on('badge-changed', (event, num) => {
  if (process.platform == "darwin") {
    app.dock.setBadge(num);
  }
});

ipcMain.on('log', (event, message) => {
  console.log(message)
});
