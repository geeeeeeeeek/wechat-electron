#!/bin/bash

case "$(uname -s)" in

    Linux*)
        wget http://devtools.qiniu.com/qiniu-devtools-linux_amd64-current.tar.gz -O dist/qiniu-devtools.tar.gz
        ;;

    Darwin)
        wget http://devtools.qiniu.io/qiniu-devtools-darwin_amd64-current.tar.gz -O dist/qiniu-devtools.tar.gz
        ;;

    *)
        ;;

esac

mkdir dist/qiniu-devtools
tar -xvf dist/qiniu-devtools.tar.gz -C dist/qiniu-devtools
rm -rf /tmp/qiniu
mkdir /tmp/qiniu
cp dist/mac-osx.tar.gz /tmp/qiniu
cp dist/linux-x64.tar.gz /tmp/qiniu
cp dist/linux-ia32.tar.gz /tmp/qiniu

echo '{
    "src": "/tmp/qiniu",
    "dest": "qiniu:access_key='$QINIU_ACCESS_KEY'&secret_key='$QINIU_SECRET_KEY'&bucket=flymeos-cancro",
    "debug_level": 1
}' > qiniu-config.json
./dist/qiniu-devtools/qrsync qiniu-config.json
