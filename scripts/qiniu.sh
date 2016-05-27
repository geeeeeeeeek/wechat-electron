#!/bin/bash

wget http://devtools.qiniu.com/qiniu-devtools-linux_amd64-current.tar.gz /home/travis/build/geeeeeeeeek/electronic-wechat
tar -xvf /home/travis/build/geeeeeeeeek/electronic-wechat/qiniu-devtools-linux_amd64-current.tar.gz
mkdir /home/travis/build/geeeeeeeeek/electronic-wechat/output
mv /home/travis/build/geeeeeeeeek/electronic-wechat/dist/mac-osx.tar.gz /home/travis/build/geeeeeeeeek/electronic-wechat/output
mv /home/travis/build/geeeeeeeeek/electronic-wechat/dist/linux-x64.tar.gz /home/travis/build/geeeeeeeeek/electronic-wechat/output
mv /home/travis/build/geeeeeeeeek/electronic-wechat/dist/linux-ia32.tar.gz /home/travis/build/geeeeeeeeek/electronic-wechat/output
./home/travis/build/geeeeeeeeek/electronic-wechat/qrsync /home/travis/build/geeeeeeeeek/electronic-wechat/conf.json
