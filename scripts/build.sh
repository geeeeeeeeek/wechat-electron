#!/bin/bash

if ! hash electron-packager 2>/dev/null; then
  RED='\033[0;31m'
  NC='\033[0m'
  echo "${RED}Error${NC}: you need to npm install electron-packager. Aborting."
  exit 1
fi

if [ "$#" -ne 2 ]; then
  echo -e "Usage: ./script/build.sh <platform> <arch>"
  echo -e "	platform:	darwin, linux, win32"
  echo -e "	arch:		ia32, x64"
  exit 1
fi

PLATFORM=$1
ARCH=$2

echo "Start packaging for $PLATFORM $ARCH."

if [ "$PLATFORM" == "win32" ]; then
  electron-packager . "Electronic WeChat" --platform=$PLATFORM --arch=$ARCH --version=0.36.9 --overwrite --out=./dist --ignore=./dist
else
  electron-packager . "Electronic WeChat" --platform=$PLATFORM --arch=$ARCH --version=0.36.9 --icon=assets/icon.icns --overwrite --out=./dist --ignore=./dist
fi

if [ $? -eq 0 ]; then
  echo -e "Packaging for $PLATFORM $ARCH succeeded.\n"
fi