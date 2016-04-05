/**
 * Created by Zhongyi on 3/26/16.
 */
"use strict";
class Common {
}
Common.ELECTRON = "Electron";
Common.ELECTRONIC_WECHAT = "Electronic WeChat";
Common.WINDOW_SIZE = {width: 800, height: 600};
Common.WINDOW_SIZE_LOGIN = {width: 380, height: 540};
Common.USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) " +
    "Chrome/41.0.2227.1 Safari/537.36";

Common.WEB_WECHAT = "https://wx.qq.com/";
Common.GITHUB = "https://github.com/geeeeeeeeek/electronic-wechat";
Common.GITHUB_RELEASES = "https://github.com/geeeeeeeeek/electronic-wechat/releases";
Common.GITHUB_ISSUES = "https://github.com/geeeeeeeeek/electronic-wechat/issues";
Common.GITHUB_API_HOST = "api.github.com";
Common.GITHUB_API_RELEASE_LATEST_PATH = "/repos/geeeeeeeeek/electronic-wechat/releases/latest";

Common.UPDATE_ERROR_ELECTRON = "Failed to get the local version. If you are using debug mode(by `npm start`), " +
    "this error would happen. Use packed app instead or manually check for updates.\n\n" + Common.GITHUB_RELEASES;
Common.UPDATE_ERROR_EMPTY_RESPONSE = "Failed to fetch release info.";
Common.UPDATE_ERROR_UNKNOWN = "Something went wrong.";
Common.UPDATE_NA_TITLE = "No Update Available";
Common.UPDATE_ERROR_NETWORK = "Connection hang up unexpectedly. Check your network settings.";
Common.UPDATE_ERROR_LATEST = (version)=> {
  return `You are using the latest version(${version}).`
};
module.exports = Common;