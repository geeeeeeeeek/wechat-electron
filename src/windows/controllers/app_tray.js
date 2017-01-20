/**
 * Created by Zhongyi on 5/2/16.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const { app, Menu, nativeImage, Tray } = require('electron');

const Common = require('../../common');

class AppTray {
  constructor(splashWindow, wechatWindow) {
    this.splashWindow = splashWindow;
    this.wechatWindow = wechatWindow;
    this.TRAY_CONFIG_PATH = path.join(app.getPath('appData'), 'electronic-wechat/trayConfig.json');
    this.lastUnreadStat = 0;

    fs.readFile(this.TRAY_CONFIG_PATH, (err, data) => {
      if (err) {
        this.trayColor = 'white';
        fs.writeFile(this.TRAY_CONFIG_PATH, '{"color":"white"}');
      } else {
        this.trayColor = JSON.parse(data.toString()).color;
      }
      this.createTray();
    });
  }

  createTray() {
    let image;
    if (process.platform === 'linux') {
      image = nativeImage.createFromPath(path.join(__dirname, `../../../assets/tray_${this.trayColor}.png`));
      this.trayIcon = image;
      this.trayIconUnread = nativeImage.createFromPath(path.join(__dirname, `../../../assets/tray_unread_${this.trayColor}.png`));
    } else {
      image = nativeImage.createFromPath(path.join(__dirname, '../../../assets/status_bar.png'));
    }
    image.setTemplateImage(true);

    this.tray = new Tray(image);
    this.tray.setToolTip(Common.ELECTRONIC_WECHAT);

    if (process.platform === 'linux') {
      const contextMenu = Menu.buildFromTemplate([
        { label: 'Hide', click: () => this.toggleSplashAndWeChat() },
        { label: 'ChangeIconColor', click: () => this.changeIconColor() },
        { label: 'Exit', click: () => app.exit(0) },
      ]);
      this.tray.setContextMenu(contextMenu);
    }
    this.tray.on('click', () => this.toggleSplashAndWeChat());
  }

  setTitle(title) {
    this.tray.setTitle(title);
  }

  toggleSplashAndWeChat() {
    if (this.splashWindow.isShown) return;
    if (this.wechatWindow.isShown) {
      this.wechatWindow.hide();
    } else {
      this.wechatWindow.show();
    }
  }

  setWechatShown() {
    const contextMenu = Menu.buildFromTemplate([
      { label: 'Hide', click: () => this.toggleSplashAndWeChat() },
      { label: 'ChangeIconColor', click: () => this.changeIconColor() },
      { label: 'Exit', click: () => app.exit(0) },
    ]);
    this.tray.setContextMenu(contextMenu);
  }

  setWechatHidden() {
    const contextMenu = Menu.buildFromTemplate([
      { label: 'Show', click: () => this.toggleSplashAndWeChat() },
      { label: 'ChangeIconColor', click: () => this.changeIconColor() },
      { label: 'Exit', click: () => app.exit(0) },
    ]);
    this.tray.setContextMenu(contextMenu);
  }

  changeIconColor() {
    if (this.trayColor === 'white') {
      this.trayColor = 'black';
    } else if (this.trayColor === 'black') {
      this.trayColor = 'white';
    }
    this.trayIcon = nativeImage.createFromPath(path.join(__dirname, `../../../assets/tray_${this.trayColor}.png`));
    this.trayIconUnread = nativeImage.createFromPath(path.join(__dirname, `../../../assets/tray_unread_${this.trayColor}.png`));
    if (this.lastUnreadStat === 0) {
      this.tray.setImage(this.trayIcon);
    } else {
      this.tray.setImage(this.trayIconUnread);
    }
    fs.writeFile(this.TRAY_CONFIG_PATH, `{"color":"${this.trayColor}"}`);
  }

  setUnreadStat(stat) {
    if (stat === this.lastUnreadStat) return;
    this.lastUnreadStat = stat;
    if (stat === 0) {
      this.tray.setImage(this.trayIcon);
    } else {
      this.tray.setImage(this.trayIconUnread);
    }
  }
}

module.exports = AppTray;
