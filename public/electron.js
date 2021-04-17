const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const isDev = require("electron-is-dev");
const server = require("../serve/server");

function createWindow() {
  const menu = electron.Menu.buildFromTemplate(template);

  electron.Menu.setApplicationMenu(menu);

  mainWindow = new BrowserWindow({
    width: 1440,
    height: 900,
    frame: true,
    webPreferences: {
      // devTools: isDev,
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  if (isDev) {
    mainWindow.webContents.openDevTools({ mode: "detach" });
  }

  mainWindow.on("closed", () => (mainWindow = null));

  mainWindow.webContents.on("new-window", function (e, url) {
    // Open external urls in an actual browser
    e.preventDefault();
    require("electron").shell.openExternal(url);
  });
}

app.on("ready", createWindow);
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

const template = [
  // { role: 'fileMenu' }
  {
    label: "File",
    submenu: [{ role: "quit" }],
  },
  // { role: 'viewMenu' }
  {
    label: "View",
    submenu: [
      { role: "toggleDevTools" },
      { type: "separator" },
      { role: "resetZoom" },
      { role: "zoomIn" },
      { role: "zoomOut" },
      { type: "separator" },
      { role: "togglefullscreen" },
    ],
  },
  {
    label: "Navigation",
    submenu: [
      {
        label: "Refresh Page",
        accelerator: "f5",
        click() {
          mainWindow.reload();
        },
      },
      { type: "separator" },
      {
        label: "Go Back",
        accelerator: "shift+h",
        click() {
          if (mainWindow.webContents.canGoBack()) {
            mainWindow.webContents.goBack();
          }
        },
      },
      {
        label: "Go Forward",
        accelerator: "shift+l",
        click() {
          if (mainWindow.webContents.canGoForward()) {
            mainWindow.webContents.goForward();
          }
        },
      },
    ],
  },
  {
    role: "help",
    submenu: [
      {
        label: "Learn More",
        click: () => {
          const { dialog } = require("electron");
          let options = {
            //Minimum options object
            message: "Coming soon...",
            type: "info",
          };
          dialog.showMessageBox(options);
        },
      },
      {
        label: "About",
        click: () => {
          const { dialog } = require("electron");
          let options = {
            //Minimum options object
            message: "Something to do at Lowes DFC 3311\nPhillip Crandall 2019-21",
            type: "info",
            title: "About",
          };
          dialog.showMessageBox(options);
        },
      },
    ],
  },
];
