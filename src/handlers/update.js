/**
 * Created by Zhongyi on 3/25/16.
 */
"use strict";
const {dialog, shell, app, nativeImage} = require('electron');
const https = require('https');
const Common = require('../common');

class UpdateHandler {
  checkForUpdate(version, silent) {
    let promise = new Promise((res, rej) => {
      if (Common.ELECTRON == app.getName()) {
        rej(Common.UPDATE_ERROR_ELECTRON);
      }
      let req = https.get({
        host: Common.GITHUB_API_HOST,
        headers: {'user-agent': Common.USER_AGENT},
        path: Common.GITHUB_API_RELEASE_LATEST_PATH
      }, (response) => {
        let body = '';
        response.on('data', (d) => {
          body += d;
        });
        response.on('end', () => {
          this._parseUpdateData(body, version, res, rej);
        });
      });
      req.on('error', (err) => {
        rej(Common.UPDATE_ERROR_NETWORK);
      });
      req.end();
    }).then((fetched) => {
      this.showDialog(fetched.name, fetched.description, "Update", (response) => {
        if (!response) return;
        shell.openExternal(fetched.url);
      });
    }).catch((message) => {
      if (silent) return;
      if (!message) {
        message = Common.UPDATE_ERROR_UNKNOWN;
      }
      this.showDialog(Common.UPDATE_NA_TITLE, message, "OK");
    });
  }

  showDialog(message, detail, positive_button, callback) {
    const path = require('path');
    let iconImage = nativeImage.createFromPath(path.join(__dirname, '../assets/icon.png'));

    dialog.showMessageBox({
      type: 'info',
      buttons: ['Cancel', positive_button],
      defaultId: 1,
      cancelId: 0,
      title: message,
      message: message,
      detail: detail,
      icon: iconImage
    }, callback);
  }

  _parseUpdateData(body, version, res, rej) {
    let data = JSON.parse(body);
    if (!data || !data.tag_name) rej(Common.UPDATE_ERROR_EMPTY_RESPONSE);
    let fetched = {
      version: data.tag_name,
      is_prerelease: data.prerelease,
      name: data.name,
      url: data.html_url,
      description: data.body
    };

    let version_regex = /^v[0-9]+\.[0-9]+\.*[0-9]*$/;
    if (version_regex.test(fetched.version) && fetched.version > version && !fetched.is_prerelease) {
      res(fetched);
    } else {
      rej(Common.UPDATE_ERROR_LATEST(version));
    }
  };
}


module.exports = UpdateHandler;