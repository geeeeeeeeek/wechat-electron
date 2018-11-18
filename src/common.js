/**
 * Created by Zhongyi on 3/26/16.
 */

'use strict';

class Common {

}
Common.ELECTRON = 'Electron';
Common.ELECTRONIC_WECHAT = 'Electronic WeChat';
Common.DEBUG_MODE = false;
Common.WINDOW_SIZE = {
  width: 800,
  height: 600,
};
Common.WINDOW_SIZE_LOGIN = {
  width: 380,
  height: 540,
};
Common.WINDOW_SIZE_LOADING = {
  width: 380,
  height: 120,
};
Common.WINDOW_SIZE_SETTINGS = {
  width: 800,
  height: 600,
};

Common.USER_AGENT = {
  freebsd: 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36',
  sunos: 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36',
  win32: 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36',
  linux: 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36',
  darwin: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2227.1 Safari/537.36',
};

Common.WEB_WECHAT = 'https://wx.qq.com/?lang=en_US';
Common.GITHUB = 'https://github.com/geeeeeeeeek/electronic-wechat';
Common.GITHUB_RELEASES = 'https://github.com/geeeeeeeeek/electronic-wechat/releases';
Common.GITHUB_ISSUES = 'https://github.com/geeeeeeeeek/electronic-wechat/issues';
Common.GITHUB_API_HOST = 'api.github.com';
Common.GITHUB_API_RELEASE_LATEST_PATH = '/repos/geeeeeeeeek/electronic-wechat/releases/latest';

Common.UPDATE_ERROR_ELECTRON = `Failed to get the local version. If you are using debug mode(by \`npm start\`), this error would happen. Use packed app instead or manually check for updates.\n\n${Common.GITHUB_RELEASES}`;
Common.UPDATE_ERROR_EMPTY_RESPONSE = 'Failed to fetch release info.';
Common.UPDATE_ERROR_UNKNOWN = 'Something went wrong.';
Common.UPDATE_NA_TITLE = 'No Update Available';
Common.UPDATE_ERROR_NETWORK = 'Connection hang up unexpectedly. Check your network settings.';
Common.UPDATE_ERROR_LATEST = (version) => {
  return `You are using the latest version(${version}).`;
};

Common.MENTION_MENU_INITIAL_X = 300;
Common.MENTION_MENU_OFFSET_X = 30;
Common.MENTION_MENU_INITIAL_Y = 140;
Common.MENTION_MENU_OFFSET_Y = 45;
Common.MENTION_MENU_WIDTH = 120;
Common.MENTION_MENU_OPTION_HEIGHT = 30;
Common.MENTION_MENU_OPTION_DEFAULT_NUM = 4;
Common.MENTION_MENU_HINT_TEXT = 'Mention:';

Common.MESSAGE_PREVENT_RECALL = 'Blocked a message recall.';
Common.EMOJI_MAXIUM_SIZE = 120;

Common.languageTitle = 'Language (Restart Required)';
Common.languageDesc = 'Select a default language for WeChat!';
Common.recallTitle = 'Prevent Message Recall';
Common.recallDesc = 'Message recall feature might be annoying';
Common.instanceTitle = 'Allow Multiple Instance';
Common.instanceDesc = 'Multiple instance can login with different accounts';
Common.iconTitle = 'File Path (In Development)';
Common.iconDesc = 'Set a default file path';
Common.zoomTitle = 'Zoom (Restart Required)';
Common.zoomDesc = 'Set the size of the interface.'
Common.zoomSmall = 'Small';
Common.zoomNormal = 'Normal';
Common.trayTitle = 'Tray Icon color (Black/White)';
Common.trayDesc = 'Select a color to match your desktop theme';

Common.UPGRADE = 'UPGRADE';
Common.FEEDBACK = 'FEEDBACK';

Common.MENU = {
  about: 'About Electronic Wechat',
  service: 'Service',
  hide: 'Hide Application',
  hideOther: 'Hide Others',
  showAll: 'Show All',
  pref: 'Preference',
  quit: 'Quit',
  edit: 'Edit',
  undo: 'Undo',
  redo: 'Redo',
  cut: 'Cut',
  copy: 'Copy',
  paste: 'Paste',
  selectAll: 'Select All',
  view: 'View',
  reload: 'Reload This Window',
  toggleFullScreen: 'Toggle Full Screen',
  searchContacts: 'Search Contacts',
  devtool: 'Toggle DevTools',
  window: 'Window',
  min: 'Minimize',
  close: 'Close',
  allFront: 'Bring All to Front',
  help: 'Help',
  repo: 'GitHub Repository',
  feedback: 'Report Issue',
  checkRelease: 'Check for New Release',
};

module.exports = Common;
