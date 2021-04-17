const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const isDev = require("electron-is-dev");
const server = require("../serve/server");

const log = require('electron-log');
const updater = require("electron-updater");
const autoUpdater = updater.autoUpdater;

function createWindow() {
  const menu = electron.Menu.buildFromTemplate(menuTemplate);

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

  autoUpdater.checkForUpdates();
}

app.on("ready", function () {
  createWindow();

  // autoUpdater.checkForUpdatesAndNotify();
});

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

const menuTemplate = [
  {
    label: "File",
    submenu: [{ role: "quit" }],
  },
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
            message:
              "Something to do at Lowes DFC 3311\nPhillip Crandall 2019-21",
            type: "info",
            title: "About",
          };
          dialog.showMessageBox(options);
        },
      },
    ],
  },
];


autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
log.info('App starting...');

// autoUpdater.requestHeaders = {
//   "PRIVATE-TOKEN": "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",
// };
//
autoUpdater.autoDownload = true;

autoUpdater.setFeedURL({
  // provider: "github",
  // url: "https://github.com/pcrandall/plc_toolkit.git",
   token: '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',
   owner: 'pcrandall',
   repo: 'plc_toolkit'
});

autoUpdater.on("checking-for-update", function () {
  sendStatusToWindow("Checking for update...");
});

autoUpdater.on("update-available", function (info) {
  sendStatusToWindow("Update available." + info);
});

autoUpdater.on("update-not-available", function (info) {
  sendStatusToWindow("Update not available." + info);
});

autoUpdater.on("error", function (err) {
  sendStatusToWindow("Error in auto-updater." + err);
});

autoUpdater.on("download-progress", function (progressObj) {
  let log_message = "Download speed: " + progressObj.bytesPerSecond;
  log_message =
    log_message + " - Downloaded " + parseInt(progressObj.percent) + "%";
  log_message =
    log_message +
    " (" +
    progressObj.transferred +
    "/" +
    progressObj.total +
    ")";
  sendStatusToWindow(log_message);
});

autoUpdater.on("update-downloaded", function (info) {
  sendStatusToWindow("Update downloaded; will install in 1 seconds" + info);
});

autoUpdater.on("update-downloaded", function (info) {
  setTimeout(function () {
  sendStatusToWindow(info);
    autoUpdater.quitAndInstall();
  }, 1000);
});

function sendStatusToWindow(text) {
  log.info(text);
  console.log(text)
  mainWindow.webContents.send('message', text);
}
