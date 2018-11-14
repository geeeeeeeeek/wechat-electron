'use strict';
const {ipcRenderer, remote} = require('electron');
const winId = remote.getCurrentWindow().id;

let initEvent = false;
let notifyObj;

function setContents(event, data) {
  let doc = window.document;
  let options = data.options;
  
  /* title */
  let title = doc.getElementById('title');
  title.innerHTML = data.title || '';

  /* message */
  let message = doc.getElementById('message');
  message.innerHTML = options.body || '';

  /* icon */
  let icon = doc.getElementById('icon');
  if (options.icon) {
    icon.src = options.icon;
    icon.style.display = "block";
  } else {
    icon.style.display = "none";
  }

  /* image */
  let image = doc.getElementById('image');
  if (options.image) {
    image.src = options.image;
    image.style.display = "block";
  } else {
    image.style.display = "none";
  }

  notifyObj = data;

  /* init event binding */
  if (!initEvent) {
    let closeButton = doc.getElementById('close');
    closeButton.addEventListener("click", closeHandler);
    let container = doc.getElementById('container');
    container.addEventListener("click", clickHandler);
  }
}

function closeHandler(e) {
  ipcRenderer.send('notify-close', winId, notifyObj);
  e.stopPropagation();
  e.preventDefault();
}

function clickHandler(e) {
  ipcRenderer.send('notify-click', winId, notifyObj);
  e.stopPropagation();
  e.preventDefault();
}

ipcRenderer.on('electron-Notify-set-contents', setContents);