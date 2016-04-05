# Electronic WeChat

[![Gitter](https://badges.gitter.im/geeeeeeeeek/electronic-wechat.svg)](https://gitter.im/geeeeeeeeek/electronic-wechat?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=body_badge)  [![Build Status](https://travis-ci.org/geeeeeeeeek/electronic-wechat.svg?branch=master)](https://travis-ci.org/geeeeeeeeek/electronic-wechat)  [中文文档](README_zh.md)

**A better WeChat client on Mac OS X and Linux. Build with [Electron](https://github.com/atom/electron).** 

*Electronic WeChat* is released by this open source project. While Web WeChat is a major component  in the app, it should be noted that this is a community release and not an official WeChat release.

This app is still under development. Mainly tested on OS X, but should work on Linux.

![qq20160317-0 2x](https://cloud.githubusercontent.com/assets/7262715/13844793/ec6b6dae-ec76-11e5-934e-a388527b2ede.png)

## Features ([CHANGELOG](CHANGELOG.md))

**Electronic WeChat v.s. Mac WeChat**

- Modern UI and full features from Web WeChat.
- Drag-to-send pictures.
- Bug free.
- **Prevent others from recalling messages.**

**Electronic WeChat v.s. Web WeChat**

- **Compatible with sticker messages.** [[?]](https://github.com/geeeeeeeeek/electronic-wechat/issues/2)
- Independent app out of browser. Behaves like native.
- Open inhibited links without redirects (like taobao.com).

**Electronic WeChat v.s. Linux WeChat**

- Well, you don't actually have a choice.

## How To Use

To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](https://www.npmjs.com/)) installed on your computer. From your command line:

``` bash
# Clone this repository
git clone https://github.com/geeeeeeeeek/electronic-wechat.git
# Go into the repository
cd electronic-wechat
# Install dependencies and run the app
npm install && npm start
```

To pack into an app, simply type one of these:

``` shell
npm run build:osx
npm run build:linux
npm run build:win
```

*OPTIONAL:* If you find `npm install` going slowly, you can use [taobao's cnpm mirror](http://npm.taobao.org/) instead.

#### Download App

If you only care about the app, you can find it out in the [release](https://github.com/geeeeeeeeek/electronic-wechat/releases) section.

#### License [MIT](LICENSE.md)