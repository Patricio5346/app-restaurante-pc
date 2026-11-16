const { app, BrowserWindow, globalShortcut, Menu } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    title: "D'COMPRAS by FREYSA",
    icon: path.join(__dirname, 'DCOMPRAS.ico'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  Menu.setApplicationMenu(null);

  // ⚠️ REEMPLAZA ESTA URL CON LA DIRECCIÓN WEB DE TU GOOGLE APPS SCRIPT
  const urlAppsScript = 'https://script.google.com/macros/s/AKfycby0SYoEusF5NNUllEn3KY7Y8bm7Cc60xTkCZzme1nUEvzVyRaZBR00qPAbpGXUjQ8jE/exec';

  mainWindow.loadURL(urlAppsScript).catch(err => {
    console.error("Fallo al cargar la URL remota:", err);
  });

  mainWindow.webContents.on('did-finish-load', () => {
    globalShortcut.register('F5', () => {
      mainWindow.reload();
    });
    globalShortcut.register('CommandOrControl+R', () => {
      mainWindow.reload();
    });
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});