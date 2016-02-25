# Electronic WeChat

**A better WeChat client on Mac OS X and Linux. Build with [Electron](https://github.com/atom/electron).** 

*Electronic WeChat* is released by this open source project. While Web WeChat is a major component  in the app, it should be noted that this is a community release and not an official WeChat release.

This app is still under development. Mainly tested on OS X, but should work on Linux.

## Features

- Modern UI and full features from Web WeChat.
- Auto resize window.
- Drag-to-send pictures.
- **Compatible with sticker messages.**
- Open inhibited links without redirects (like taobao.com).

![qq20160224-0 2x](https://cloud.githubusercontent.com/assets/7262715/13275230/96b81776-daed-11e5-98ce-3ee3bd82082e.png)

## How To Use

To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

``` bash
# Clone this repository
git clone https://github.com/geeeeeeeeek/electronic-wechat.git
# Go into the repository
cd electronic-wechat
# Install dependencies and run the app
npm install && npm start
```

You can also get a stable version via npm:

```shell
# via npm
npm i electronic-wechat
```

To pack into an OSX app, simply type:

``` shell
npm run build:osx
```

#### Download App

If you only cares about the app, you can find it out in the [~~release (not available yet~~)](https://github.com/geeeeeeeeek/wechat-electron/releases) section.

#### License [MIT](LICENSE.md)