/**
 * Created by Zhongyi on 5/2/16.
 */
"use strict";

const path = require('path');
const {app, Menu, nativeImage, Tray} = require('electron');

const Common = require('../../common');

class AppTray {
  constructor(splashWindow, wechatWindow) {
    this.splashWindow = splashWindow;
    this.wechatWindow = wechatWindow;

    let image;
    if (process.platform == "linux") {
      image = nativeImage.createFromPath(path.join(__dirname, '../../../assets/status_bar_linux.png'));
    } else {
      image = nativeImage.createFromPath(path.join(__dirname, '../../../assets/status_bar.png'));
    }
    image.setTemplateImage(true);

    this.tray = new Tray(image);
    this.tray.setToolTip(Common.ELECTRONIC_WECHAT);

    if (process.platform == "linux") {
      let contextMenu = Menu.buildFromTemplate([
        {label: 'Show', click: () => this.hideSplashAndShowWeChat()},
        {label: 'Exit', click: () => app.exit(0)}
      ]);
      this.tray.setContextMenu(contextMenu);
//    } else {
//      this.tray.on('click', () => this.hideSplashAndShowWeChat());
    }
    this.tray.on('click', () => this.hideSplashAndShowWeChat());
  }

  setTitle(title) {
    this.tray.setTitle(title);
  }

  setToolTip(tip) {
    this.tray.setToolTip(tip);
  }

  IconSet(icon){
    let img;
    if ( icon == 'normal' ) {
      img = nativeImage.createFromPath(path.join(__dirname, '../../../assets/icon.png'));
    } else {
      img = nativeImage.createFromPath(path.join(__dirname, '../../../assets/unread_icon.png'));
    }
    this.tray.setImage(img);
  }

  hideSplashAndShowWeChat() {
    if (this.splashWindow.isShown) return;
    this.wechatWindow.show();
  }
}

module.exports = AppTray;
