"use strict";

const {remote, shell, ipcRenderer} = require('electron');
const {Menu, app} = remote;
const Common = require("../common");

class MenuHandler {
  create() {
    let template = this.getTemplate(remote.process.platform);
    if (template) {
      let menuFromTemplate = Menu.buildFromTemplate(template);
      Menu.setApplicationMenu(menuFromTemplate);
    }
  }

  getTemplate(platform) {
    let darwinTemplate = [
      {
        label: 'Electronic WeChat',
        submenu: [
          {
            label: 'About Electronic WeChat',
            selector: 'orderFrontStandardAboutPanel:'
          },
          {
            type: 'separator'
          },
          {
            label: 'Services',
            submenu: []
          },
          {
            type: 'separator'
          },
          {
            label: 'Hide Electron',
            accelerator: 'Command+H',
            selector: 'hide:'
          },
          {
            label: 'Hide Others',
            accelerator: 'Command+Alt+H',
            selector: 'hideOtherApplications:'
          },
          {
            label: 'Show All',
            selector: 'unhideAllApplications:'
          },
          {
            type: 'separator'
          },
          {
            label: 'Quit',
            accelerator: 'Command+Q',
            click: MenuHandler._quitApp
          }
        ]
      },
      {
        label: 'Edit',
        submenu: [
          {
            label: 'Undo',
            accelerator: 'Command+Z',
            selector: 'undo:'
          },
          {
            label: 'Redo',
            accelerator: 'Shift+Command+Z',
            selector: 'redo:'
          },
          {
            type: 'separator'
          },
          {
            label: 'Cut',
            accelerator: 'Command+X',
            selector: 'cut:'
          },
          {
            label: 'Copy',
            accelerator: 'Command+C',
            selector: 'copy:'
          },
          {
            label: 'Paste',
            accelerator: 'Command+V',
            selector: 'paste:'
          },
          {
            label: 'Select All',
            accelerator: 'Command+A',
            selector: 'selectAll:'
          }
        ]
      },
      {
        label: 'View',
        submenu: [
          {
            label: 'Reload This Window',
            accelerator: 'Command+R',
            click: MenuHandler._reload
          },
          {
            label: 'Toggle DevTools',
            accelerator: 'Alt+Command+I',
            click: MenuHandler._devTools
          }
        ]
      },
      {
        label: 'Window',
        submenu: [
          {
            label: 'Minimize',
            accelerator: 'Command+M',
            selector: 'performMiniaturize:'
          },
          {
            label: 'Close',
            accelerator: 'Command+W',
            selector: 'performClose:'
          },
          {
            type: 'separator'
          },
          {
            label: 'Bring All to Front',
            selector: 'arrangeInFront:'
          }
        ]
      },
      {
        label: 'Help',
        submenu: [
          {
            label: 'GitHub Repository',
            click: MenuHandler._github
          },
          {
            type: 'separator'
          }, {
            label: 'Report Issues',
            click: MenuHandler._githubIssues
          }, {
            label: 'Check for New Release',
            click: MenuHandler._update
          }]
      }
    ];
    let linuxTemplate = [
      {
        label: 'Window',
        submenu: [
          {
            label: 'Reload This Window',
            accelerator: 'Ctrl+R',
            click: () => MenuHandler._reload
          },
          {
            label: 'Toggle DevTools',
            accelerator: 'Ctrl+Shift+I',
            click: () => MenuHandler._devTools
          },
          {
            type: 'separator'
          },
          {
            label: 'Quit The App',
            accelerator: 'Ctrl+Q',
            click: () => MenuHandler._quitApp
          }
        ]
      },
      {
        label: 'Help',
        submenu: [
          {
            label: 'GitHub Repository',
            click: MenuHandler._github
          },
          {
            type: 'separator'
          }, {
            label: 'Report Issues',
            click: MenuHandler._githubIssues
          }, {
            label: 'Check for New Release',
            click: MenuHandler._update
          }]
      }
    ];

    if (platform == "darwin") {
      return darwinTemplate;
    } else if (platform == "linux") {
      return linuxTemplate;
    }
  }

  static _quitApp() {
    app.exit(0);
  }

  static _reload() {
    ipcRenderer.send('reload');
  }

  static _devTools() {
    remote.getCurrentWindow().toggleDevTools();
  }

  static _github() {
    shell.openExternal(Common.GITHUB);
  }

  static _githubIssues() {
    shell.openExternal(Common.GITHUB_ISSUES);
  }

  static _update() {
    ipcRenderer.send('update');
  }
}
module.exports = MenuHandler;
