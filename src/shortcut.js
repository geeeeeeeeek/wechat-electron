"use strict";

let shortcutBundle = {};

let cmdT = () => {
  console.log("Test for shortcut");
}

shortcutBundle.shortcuts = [{
  "key": "Command+T",
  "func": cmdT
}]

module.exports = shortcutBundle;
