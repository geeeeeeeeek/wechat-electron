/**
 * Created by chenwl on 9/26/16.
 */
'use strict';
const {ipcRenderer} = require('electron');

class EscClose {
    static inject($event) {
        if ($event.keyCode === 27) {
            ipcRenderer.send('close-wechat');
        }
    }
}

module.exports = EscClose;