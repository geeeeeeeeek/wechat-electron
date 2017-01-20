/**
 * Created by Zhongyi on May 1, 2016
 */
'use strict';

const path = require('path');
const { BrowserWindow } = require('electron');
const AppConfig = require('../../configuration');

const lan = AppConfig.readSettings('language');
let Common;
if (lan === 'zh-CN') {
  Common = require('../../common_cn');
} else {
  Common = require('../../common');
}

class SplashWindow {
  constructor(bounds) {
    const { width, height } = Common.WINDOW_SIZE_LOADING;
    this.splashWindow = new BrowserWindow({
      type: 'splash', // for linux
      width,
      height,
      title: Common.ELECTRONIC_WECHAT,
      resizable: false,
      // center: true,
      x: bounds.x + (bounds.width - width) / 2,
      y: bounds.y + (bounds.height - height) / 2,
      show: true,
      frame: false,
      autoHideMenuBar: true,
      alwaysOnTop: true,
      icon: 'assets/icon.png',
      titleBarStyle: 'hidden',
    });

    this.splashWindow.loadURL('file://' + path.join(__dirname, '/../views/splash.html'));
    this.isShown = false;
  }

  show() {
    this.splashWindow.show();
    this.isShown = true;
  }

  hide() {
    this.splashWindow.hide();
    this.isShown = false;
  }
}

module.exports = SplashWindow;
