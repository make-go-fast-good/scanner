const electron = require("electron");
// const {dialog,electron} = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const isDev = require("electron-is-dev");
const server = require("../serve/server");

// const { autoUpdater } = require("electron-updater");
// const logger = require("electron-log");

function createWindow() {
  const menu = electron.Menu.buildFromTemplate(menuTemplate);

  electron.Menu.setApplicationMenu(menu);

  mainWindow = new BrowserWindow({
    width: 1440,
    height: 900,
    frame: true,
    webPreferences: {
      // devTools: isDev,
      defaultEncoding: "UTF-8",
      nodeIntegration: true,
      contextIsolation: false,
      // enableRemoteModule: true,
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

app.on("ready", function () {
  createWindow();
  // autoUpdater.checkForUpdatesAndNotify();
});

// app.on('ready', createWindow)

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

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

// autoUpdater.channel = "latest";
// autoUpdater.allowDowngrade = false;

// autoUpdater.logger = logger;
// autoUpdater.logger.transports.file.level = "silly";
// autoUpdater.logger.transports.file.appName = "private repo";
// autoUpdater.autoDownload = true;

// autoUpdater.on("update-downloaded", () => {
//   dialog.showMessageBox({
//     message: "Update downloaded...",
//   });
// });

// autoUpdater.on("checking-for-update", (info) => {
//   dialog.showMessageBox({
//     message: "Checking for updates..." + info,
//   });
// });

// autoUpdater.on("update-available", (info) => {
//   dialog.showMessageBox({
//     message: "Update available !!" + info,
//   });
// });

// autoUpdater.on("update-not-available", (info) => {
//   dialog.showMessageBox({
//     message: "No updates available" + info,
//   });
// });

// autoUpdater.on("error", (error) => {
//   autoUpdater.logger.debug(error);
// });

// autoUpdater.on("download-progress", (progressObj) => {
//   let log_message = "Download speed: " + progressObj.bytesPerSecond;
//   log_message = log_message + " - Downloaded " + progressObj.percent + "%";
//   log_message =
//     log_message +
//     " (" +
//     progressObj.transferred +
//     "/" +
//     progressObj.total +
//     ")";
//   sendStatusToWindow(log_message);
// });

// autoUpdater.on("update-downloaded", () => {
//   let options = {
//     buttons: ["Yes", "No", "Cancel"],
//     message: "Do you want to install updates now?",
//     title: "Updates Downloaded",
//   };

//   dialog.showMessageBox(options, (response) => {
//     console.log(response);
//     if (response === 0) autoUpdater.quitAndInstall();
//   });
// });

// app.on("ready", () => {
//   if (!isDev) autoUpdater.checkForUpdatesAndNotify();
// });
