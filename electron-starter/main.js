const { app, BrowserWindow } = require('electron');
const fs = require('fs');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        fullscreen: true
    });

    win.webContents.session.clearCache(function(){
    //some callback.
    });

    win.loadFile("index.html");
}

app.whenReady().then(createWindow);
