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
  'freebsd': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36',
  'sunos': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36',
  'win32': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36',
  'linux': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36',
  'darwin': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2227.1 Safari/537.36'
}

Common.WEB_WECHAT = 'https://wx.qq.com/?lang=zh_CN';
Common.GITHUB = 'https://github.com/geeeeeeeeek/electronic-wechat';
Common.GITHUB_RELEASES = 'https://github.com/geeeeeeeeek/electronic-wechat/releases';
Common.GITHUB_ISSUES = 'https://github.com/geeeeeeeeek/electronic-wechat/issues';
Common.GITHUB_API_HOST = 'api.github.com';
Common.GITHUB_API_RELEASE_LATEST_PATH = '/repos/geeeeeeeeek/electronic-wechat/releases/latest';

Common.UPDATE_ERROR_ELECTRON = 'Failed to get the local version. If you are using debug mode(by `npm start`), this error would happen. Use packed app instead or manually check for updates.\n\n' + Common.GITHUB_RELEASES;
Common.UPDATE_ERROR_EMPTY_RESPONSE = '没能获取最新的更新信息';
Common.UPDATE_ERROR_UNKNOWN = '不造什么出错了...';
Common.UPDATE_NA_TITLE = '没有可用的更新';
Common.UPDATE_ERROR_NETWORK = '网络连接出错，请检查你的网络';
Common.UPDATE_ERROR_LATEST = (version) => {
  return `已经在使用最新版 － (${version})`;
};

Common.MENTION_MENU_INITIAL_X = 300;
Common.MENTION_MENU_OFFSET_X = 30;
Common.MENTION_MENU_INITIAL_Y = 140;
Common.MENTION_MENU_OFFSET_Y = 45;
Common.MENTION_MENU_WIDTH = 120;
Common.MENTION_MENU_OPTION_HEIGHT = 30;
Common.MENTION_MENU_OPTION_DEFAULT_NUM = 4;

Common.MENTION_MENU_HINT_TEXT = '选择回复的人:';

Common.MESSAGE_PREVENT_RECALL = '阻止了一次撤回';

Common.EMOJI_MAXIUM_SIZE = 120;

Common.MENU = {
  about: '关于 Electronic Wechat',
  service: '服务',
  hide: '隐藏应用',
  hideOther: '隐藏其他窗口',
  showAll: '显示全部窗口',
  pref: '偏好',
  quit: '退出',
  edit: '编辑',
  undo: '撤销',
  redo: '取消撤销',
  cut: '剪切',
  copy: '复制',
  paste: '粘贴',
  selectAll: '选择全部',
  view: '视图',
  reload: '重新加载当前窗口',
  toggleFullScreen:'切换全屏',
  searchContacts:'搜索联系人',
  devtool: '开发者工具',
  window: '窗口',
  min: '最小化',
  close: '关闭',
  allFront: '全部打开',
  help: '帮助',
  repo: 'GitHub 目录',
  feedback: '联系我们',
  checkRelease: '检查更新',
};

module.exports = Common;
