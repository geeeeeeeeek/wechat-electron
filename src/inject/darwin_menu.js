"use strict";
let DarwinMenu = [
  {
    label: 'Electronic WeChat',
    submenu: [
      {
        label: '服务',
        submenu: []
      },
      {
        type: 'separator'
      },
      {
        label: '隐藏',
        accelerator: 'Cmd+H',
        selector: 'hide:'
      },
      {
        label: '隐藏其他',
        accelerator: 'Cmd+Shift+H',
        selector: 'hideOtherApplications:'
      },
      {
        label: '显示全部',
        selector: 'unhideAllApplications:'
      },
      {
        type: 'separator'
      },
      {
        label: '退出',
        accelerator: 'Cmd+Q',
        selector: 'terminate:'
      },
    ]
  },
  {
    label: '编辑',
    submenu: [
      {
        label: '撤销',
        accelerator: 'Cmd+Z',
        selector: 'undo:'
      },
      {
        label: '重做',
        accelerator: 'Shift+Cmd+Z',
        selector: 'redo:'
      },
      {
        type: 'separator'
      },
      {
        label: '剪切',
        accelerator: 'Cmd+X',
        selector: 'cut:'
      },
      {
        label: '拷贝',
        accelerator: 'Cmd+C',
        selector: 'copy:'
      },
      {
        label: '粘贴',
        accelerator: 'Cmd+V',
        selector: 'paste:'
      },
      {
        label: '全选',
        accelerator: 'Cmd+A',
        selector: 'selectAll:'
      }
    ]
  },
  {
    label: '显示',
    submenu: [
      {
        label: '重新载入页面',
        accelerator: 'Cmd+R',
        click: function() { webview.reload(); }
      },
      {
        label: '停止',
        accelerator: 'Cmd+.',
        click: function() { webview.stop(); }
      },
      {
        label: '显示开发者工具',
        accelerator: 'Alt+Cmd+I',
        click: function() { webview.openDevTools(); }
      },
    ]
  },
  {
    label: '窗口',
    submenu: [
      {
        label: '最小化',
        accelerator: 'Cmd+M',
        selector: 'performMiniaturize:'
      },
      {
        type: 'separator'
      },
      {
        label: '前置全部窗口',
        selector: 'arrangeInFront:'
      }
    ]
  },
  {
    label: '帮助',
    submenu: []
  }
];

module.exports = DarwinMenu;
