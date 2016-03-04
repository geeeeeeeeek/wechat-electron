"use strict";

let menuHandler = {};

menuHandler.create = () => {
  let remote = require('remote');
  let Menu = remote.require('menu');
  let shell = require('shell');
  let platform = remote.process.platform;

  let templates = {
    darwin: [
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
            accelerator: 'Command+Shift+H',
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
            selector: 'terminate:'
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
            label: 'Toggle DevTools',
            accelerator: 'Alt+Command+I',
            click: () => {
              remote.getCurrentWindow().toggleDevTools();
            }
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
            click: () => {
              shell.openExternal('https://github.com/geeeeeeeeek/electronic-wechat');
            }
          },
          {
            type: 'separator'
          },{
            label: 'Report Issues',
            click: () => {
              shell.openExternal('https://github.com/geeeeeeeeek/electronic-wechat/issues');
            }
          },{
            label: 'Check for New Release',
            click: () => {
              shell.openExternal('https://github.com/geeeeeeeeek/electronic-wechat/releases');
            }
          }]
      }
    ],
    linux: [
      {
        label: 'Edit',
        submenu: [
          {
            label: 'Undo',
            accelerator: 'Ctrl+Z',
            role: 'undo'
          },
          {
            label: 'Redo',
            accelerator: 'Ctrl+Y',
            role: 'redo'
          },
          {
            type: 'separator'
          },
          {
            label: 'Cut',
            accelerator: 'Ctrl+X',
            role: 'cut'
          },
          {
            label: 'Copy',
            accelerator: 'Ctrl+C',
            role: 'copy'
          },
          {
            label: 'Paste',
            accelerator: 'Ctrl+V',
            role: 'paste'
          },
          {
            label: 'Select All',
            accelerator: 'Ctrl+A',
            role: 'selectall'
          }
        ]
      },
      {
        label: 'View',
        submenu: [
          {
            label: 'Toggle DevTools',
            accelerator: 'Ctrl+Shift+I',
            click: () => {
              remote.getCurrentWindow().toggleDevTools();
            }
          }
        ]
      },
      {
        label: 'Window',
        submenu: [
          {
            label: 'Minimize',
            accelerator: 'Ctrl+M',
            role: 'minimize'
          },
          {
            label: 'Close',
            accelerator: 'Ctrl+W',
            role: 'close'
          }
        ]
      },
      {
        label: 'Help',
        submenu: [
          {
            label: 'GitHub Repository',
            click: () => {
              shell.openExternal('https://github.com/geeeeeeeeek/electronic-wechat');
            }
          },
          {
            type: 'separator'
          },{
            label: 'Report Issues',
            click: () => {
              shell.openExternal('https://github.com/geeeeeeeeek/electronic-wechat/issues');
            }
          },{
            label: 'Check for New Release',
            click: () => {
              shell.openExternal('https://github.com/geeeeeeeeek/electronic-wechat/releases');
            }
          }]
      }
    ]
  };

  let menu = null;
  if (templates[remote.process.platform]) {
    menu = Menu.buildFromTemplate(templates[remote.process.platform]);
  }
  Menu.setApplicationMenu(menu);
};

module.exports = menuHandler;
