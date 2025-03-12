// app/index.js
const path = require('path');
const { app, BrowserWindow, Menu, nativeImage, Tray } = require('electron');
const { electron } = require('process');
const { type } = require('os');


// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}


function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    titleBarStyle: 'hiddenInset',
    trafficLightPosition: { x: 8, y: 18 },
    titleBarOverlay: {
      color: '#2f324150',
      symbolColor: '#74b1be',
      height: 60
    }
  });

  mainWindow.loadURL('http://localhost:5173');
  mainWindow.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

const isMac = process.platform === 'darwin'

app.setName("Electra");

const template = [
  // { role: 'appMenu' }
  ...(isMac
    ? [{
        label: "Citron",
        submenu: [
          { role: 'about' },
          { type: 'separator' },
          { role: 'services' },
          { type: 'separator' },
          {role: 'toggleDevTools'},
          {type: 'separator'},
          { role: 'hide' },
          { role: 'hideOthers' },
          { role: 'unhide' },
          { type: 'separator' },
          { role: 'quit' }
        ]
      }]
    : []),
  { role: 'fileMenu'}
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)