#!/bin/bash

echo 'Start compressing for Mac OS X.'
tar zcf 'dist/mac-osx.tar.gz' 'dist/Electronic WeChat-darwin-x64'
echo 'Compressing for Mac OS X succeed.'

echo 'Start compressing for Linux x64.'
tar zcf 'dist/linux-x64.tar.gz' 'dist/Electronic WeChat-linux-x64'
echo 'Compressing for Linux x64 succeed.'

echo 'Start compressing for Linux ia32.'
tar zcf 'dist/linux-ia32.tar.gz' 'dist/Electronic WeChat-linux-ia32'
echo 'Compressing for Linux ia32 succeed.'
