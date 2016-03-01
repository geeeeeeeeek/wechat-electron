#!/bin/bash

if ! hash electron-packager 2>/dev/null; then
  RED='\033[0;31m'
  NC='\033[0m'
  echo "${RED}Error${NC}: you need to npm install electron-packager. Aborting."
  exit 1
fi

function build() {
	./scripts/build.sh $@
}

build darwin x64
build linux ia32
build linux x64
#build win32 ia32
