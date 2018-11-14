'use strict';
const {BrowserWindow, ipcMain} = require('electron');
const electron = require('electron');
const path = require('path');
const async = require('async');

let Gid = 0;

let Config = {
  width: 320, /* notification width */
  height: 80, /* notification height */
  margin: 10, /* margin to show the shadow */
  position: 1, /* 0 top left 1, top right, 2 bottom right, 3 bottom left */
  notifyDuration: 10000, /* notification duration (ms) */
  garbageDuration: 10000, /* inactive window will be destroyed after some time. (ms) */
  defaultMaxVisibleNotify: 5 /* maximum allowed notification */
};

let NotifyManager = function () {
  this.busy = false;
  this.queue = [];
  this.activeWindows = [];
  this.inactiveWindows = [];
  this.windowsExtension = new WeakMap();
  this.notifyQueue = [];
};

NotifyManager.prototype.enqueue = function (data) {
  if (this.busy) {
    this.queue.push(data);
  } else {
    this.busy = true;
    this.dequeue(data);
  }
};

NotifyManager.prototype.dequeue = function (data) {
  let _this = this;
  data.func.apply(this, data.args)
    .then(function () {
      if (_this.queue.length > 0) {
        
        _this.dequeue(_this.queue.shift());
      } else {
        _this.busy = false;
      }
    });
};

NotifyManager.prototype.getWindow = function () {
  let _this = this;
  return new Promise(function (resolve) {

    let notificationWindow;

    /* check recyclable windows */
    if (_this.inactiveWindows.length > 0) {
      notificationWindow = _this.inactiveWindows.pop();
      let notifyWinExt = _this.windowsExtension.get(notificationWindow);
      clearTimeout(notifyWinExt.timeoutId);
      delete notifyWinExt.timeoutId;
      delete notifyWinExt.pendingClose;
      resolve(notificationWindow);
      return;
    }

    notificationWindow = new BrowserWindow({
      width: Config.width + 2 * Config.margin,
      height: Config.height + 2 * Config.margin,
      alwaysOnTop: true,
      skipTaskbar: true,
      resizable: false,
      show: false,
      frame: false,
      transparent: true,
      acceptFirstMouse: true,
      webPreferences: {
        plugins: true,
        preload: path.join(__dirname, 'preload.js'),
        allowDisplayingInsecureContent: true
      }
    });
    
    notificationWindow.loadURL('file://' + path.join(__dirname, 'notification.html'));
    notificationWindow.setVisibleOnAllWorkspaces(true);
    notificationWindow.webContents.on('did-finish-load', function () {
      resolve(notificationWindow);
    });
    _this.windowsExtension.set(notificationWindow, {});
  });
};

NotifyManager.prototype.showNotification = function (notify) {
  let _this = this;

  return new Promise(function (resolve) {
    let activeWindows = _this.activeWindows;
    _this.calMaxVisibleNotifications();

    if (activeWindows.length >= Config.maxVisibleNotify) {
      /* insert the close window immediately so that new incoming notification can be shown afterwards. */
      let removeWindows = activeWindows.slice(0, activeWindows.length - Config.maxVisibleNotify + 1);
      removeWindows.forEach(function (window) {
        /* avoid double insertion of close window function */
        if(!_this.windowsExtension.get(window).pendingClose) {
          notifyManager.closeWindow(window);
        }
      });
      _this.notifyQueue.push(notify);
      resolve();
    } else {
      _this.getWindow()
        .then(function (notificationWindow) {

          let position = _this.calPosition();
          notificationWindow.setPosition(position.x, position.y);

          _this.activeWindows.push(notificationWindow);
          
          let timeoutId = setTimeout(function () {
            notifyManager.closeWindow(notificationWindow);
          }, Config.notifyDuration);

          let notifyWinExt = _this.windowsExtension.get(notificationWindow);
          notifyWinExt.notify = notify;
          notifyWinExt.notifyTimeoutId = timeoutId;

          notificationWindow.webContents.send('electron-Notify-set-contents', notify.serialize());
          notificationWindow.showInactive();
          notificationWindow.setAlwaysOnTop(true);

          resolve(notificationWindow);
        });
    }
  });
};

NotifyManager.prototype.closeWindow = function (window) {
  let notifyWinExt = this.windowsExtension.get(window);
  notifyWinExt.pendingClose = true;
  clearTimeout(notifyWinExt.notifyTimeoutId);
  this.enqueue({
    func: NotifyManager.prototype.closeNotification,
    args: [window]
  });
};

NotifyManager.prototype.closeNotification = function (notificationWindow) {
  let notifyWinExt = this.windowsExtension.get(notificationWindow);
  delete notifyWinExt.notify;
  let activeWindows = this.activeWindows;
  let inactiveWindows = this.inactiveWindows;
  let index = activeWindows.indexOf(notificationWindow);
  
  activeWindows.splice(index, 1);
  notificationWindow.hide();
  /* cache inactive window, closed after Config.garbageDuration seconds */
  inactiveWindows.push(notificationWindow);
  notifyWinExt.timeoutId = setTimeout(function () {
    let index = inactiveWindows.indexOf(notificationWindow);
    inactiveWindows.splice(index, 1);
    notificationWindow.close();
  }, Config.garbageDuration);
  
  /* check if there exists some queued notification. */
  if (this.notifyQueue.length > 0 &&
    activeWindows.length < Config.maxVisibleNotify) {
    notifyManager.enqueue({
      func: NotifyManager.prototype.showNotification,
      args: [this.notifyQueue.shift()]
    });
  }

  return new Promise(function (resolve) {

    if (index >= activeWindows.length || index === -1) {
      resolve();
      return;
    }

    /* move position of active notification */
    async.map(activeWindows.slice(index), function (notificationWindow, done) {
      let position = notificationWindow.getPosition();
      let relativeY = Config.height + Config.margin;
      switch (Config.position) {
        case 0: /* top left */
        case 1: /* top right */
          notificationWindow.setPosition(position[0], position[1] - relativeY);
          break;
        case 2: /* bottom right */
        case 3: /* bottom left */
          notificationWindow.setPosition(position[0], position[1] + relativeY);
          break;
      }
      done();
    }, function () {
      resolve();
    });
  });
};

/* calculate maximum number visible notification which depends on the screen resolution*/
NotifyManager.prototype.calMaxVisibleNotifications = function () {
  let display = electron.screen.getPrimaryDisplay();
  let maxVisibleNotify = Math.floor(display.workArea.height / (Config.height + Config.margin));
  Config.maxVisibleNotify = maxVisibleNotify > Config.defaultMaxVisibleNotify
    ? Config.defaultMaxVisibleNotify : maxVisibleNotify;
};

NotifyManager.prototype.calPosition = function () {
  let display = electron.screen.getPrimaryDisplay();
  let workArea = display.workArea;
  let left = workArea.x;
  let top = workArea.y;
  let width = workArea.width;
  let height = workArea.height;
  let x, y;
  let winWidth = Config.width;
  let winHeight = Config.height;
  let winMargin = Config.margin;
  let activeWindows = this.activeWindows;
  let relativeY = (winHeight + winMargin) * activeWindows.length;


  switch (Config.position) {
    case 0: /* top left */
      x = left;
      y = top + relativeY;
      break;
    case 1: /* top right */
      x = left + width - winWidth - winMargin * 2;
      y = top + relativeY;
      break;
    case 2: /* bottom right */
      x = left + width - winWidth - winMargin * 2;
      y = top + height - winHeight - winMargin - relativeY;
      break;
    case 3: /* bottom left */
      x = left;
      y = top + height - winHeight - winMargin - relativeY;
      break;
  }

  return {x: x, y: y};
};

let notifyManager = new NotifyManager();

function Notify(title, options) {
  this.id = Gid++;
  this.title = title;
  this.options = options;
  notifyManager.enqueue({
    func: NotifyManager.prototype.showNotification,
    args: [this]
  });
}

Notify.prototype.serialize = function () {
  return {
    id: this.id,
    title: this.title,
    options: this.options
  }
};

Notify.init = function () {
  ipcMain.on('notify-show', function (event, data) {
    new Notify(data.title, data.options);
  });

  ipcMain.on('notify-close', function (event, winId, notifyObj) {
    let window = BrowserWindow.fromId(winId);
    notifyManager.closeWindow(window);
  });
};

Notify.closeAll = function () {
  notifyManager.busy = false;
  notifyManager.queue = [];
  let windowsExtension = notifyManager.windowsExtension;

  notifyManager.activeWindows.forEach(function (window) {
    /* clear all scheduled closeNotification */
    clearTimeout(windowsExtension.get(window).notifyTimeoutId);
    window.close();
  });
  notifyManager.inactiveWindows.forEach(function (window) {
    /* clear all scheduled garbage timer function */
    clearTimeout(windowsExtension.get(window).timeoutId);
    window.close();
  });
  notifyManager.activeWindows = [];
  notifyManager.inactiveWindows = [];
};

module.exports = Notify;