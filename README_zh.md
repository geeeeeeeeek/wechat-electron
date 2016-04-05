# Electronic WeChat

[![Gitter](https://badges.gitter.im/geeeeeeeeek/electronic-wechat.svg)](https://gitter.im/geeeeeeeeek/electronic-wechat?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=body_badge)  [![Build Status](https://travis-ci.org/geeeeeeeeek/electronic-wechat.svg?branch=master)](https://travis-ci.org/geeeeeeeeek/electronic-wechat)  [English docs](README.md)

**Mac OS X 和 Linux下更好用的微信客户端. 使用[Electron](https://github.com/atom/electron)构建.** 

*Electronic WeChat* 是本开源项目发布的产品。网页版微信是其中重要的一部分，但请注意这是一个社区发布的产品，而 *不是* 官方微信团队发布的产品。

这个应用仍在开发中。主要在 OS X 下测试，Linux 下亦可使用。

![qq20160317-0 2x](https://cloud.githubusercontent.com/assets/7262715/13844793/ec6b6dae-ec76-11e5-934e-a388527b2ede.png)

## 应用特性 ([更新日志](CHANGELOG.md))

**Electronic WeChat v.s. Mac 官方微信客户端**

-  来自网页版微信的更现代的界面和更完备的功能
-  拖入图片、文件即可发送
-  **阻止其他人撤回消息**
-  没有原生客户端万年不修复的bug

**Electronic WeChat v.s. 网页版微信客户端**

- **能够显示贴纸消息** [[?]](https://github.com/geeeeeeeeek/electronic-wechat/issues/2)
- 原生应用的体验，独立于浏览器
- OS X中的dock未读消息计数和消息通知
- 直接打开微信重定向的链接 (如 taobao.com)

**Electronic WeChat v.s. Linux 官方微信客户端**

- 首先你需要有一个官方客户端

## 如何使用

在下载和运行这个项目之前，你需要在电脑上安装[Git](https://git-scm.com)和[Node.js](https://nodejs.org/en/download/) (来自[npm](https://www.npmjs.com/))。在命令行中输入:

``` bash
# 下载仓库
git clone https://github.com/geeeeeeeeek/electronic-wechat.git
# 进入仓库
cd electronic-wechat
# 安装依赖, 运行应用
npm install && npm start
```

根据你的平台打包应用:

``` shell
npm run build:osx
npm run build:linux
npm run build:win
```

*可选项 :* 如果你感觉到`npm install`下载缓慢，可以使用[淘宝镜像(cnpm)](http://npm.taobao.org/)替代npm。

#### 直接下载应用

如果你希望开箱即用，你可以在[release](https://github.com/geeeeeeeeek/electronic-wechat/releases)中下载到最新的稳定版本。

#### 项目使用[MIT](LICENSE.md)许可。