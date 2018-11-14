'use strict';
const {ipcRenderer}= require('electron');
const notify = require('./notify');

class NotificationInjector {
  static init() {
    const NativeNotification = window.Notification;
    const _Notification = function (title, options) {
      options.icon = location.origin + options.icon;
      options.username = new URL(options.icon).searchParams.get("username");
      ipcRenderer.send('notify-show', {
        title: title,
        options: options
      });
      return this;
    };
    _Notification.prototype = {
      close: function () {
      }
    };
    _Notification.permission = NativeNotification.permission;
    _Notification.requestPermission = NativeNotification.requestPermission.bind(_Notification);
    window.Notification = _Notification;
  }
}


module.exports = NotificationInjector;