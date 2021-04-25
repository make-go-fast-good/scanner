const electron = require("electron");
// const {dialog,electron} = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const globalShortcut = electron.globalShortcut;
const contextMenu = require("electron-context-menu");
const path = require("path");
const isDev = require("electron-is-dev");
const server = require("../serve/server");

function createWindow() {
  electron.Menu.setApplicationMenu(null); // no default menue

  // Declare shortcuts
  globalShortcut.register("F5", () => mainWindow.webContents.reload());
  globalShortcut.register("alt + left", () =>
    mainWindow.webContents.canGoBack() ? mainWindow.webContents.goBack() : null
  );
  globalShortcut.register("alt + right", () =>
    mainWindow.webContents.goForward()
      ? mainWindow.webContents.goForward()
      : null
  );

  mainWindow = new BrowserWindow({
    show: false,
    frame: true,
    webPreferences: {
      // devTools: isDev,
      defaultEncoding: "UTF-8",
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  mainWindow.maximize();
  mainWindow.show();

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
    e.preventDefault();
    mainWindow.loadURL(url);
  });
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

contextMenu({
  menu: (actions, props, browserWindow, dictionarySuggestions) => [
    ...dictionarySuggestions,
    actions.copy({
      transform: (content) => `modified_copy_${content}`,
    }),
    actions.paste({
      transform: (content) => `modified_paste_${content}`,
    }),
    actions.separator(),
    {
      label: "Back",
      accelerator: "shift + h",
      click: () => {
        if (mainWindow.webContents.canGoBack()) {
          mainWindow.webContents.goBack();
        }
      },
    },
    {
      label: "Refresh",
      accelerator: "f5",
      click: () => {
        mainWindow.reload();
      },
    },
    {
      label: "Forward",
      accelerator: "shift + l",
      click: () => {
        if (mainWindow.webContents.canGoForward()) {
          mainWindow.webContents.goForward();
        }
      },
    },
    actions.separator(),
    { role: "zoomIn" },
    { role: "zoomOut" },
    { role: "resetZoom" },
    actions.separator(),
    {
      label: "About",
      click: () => {
        const { dialog } = require("electron");
        let options = {
          //Minimum options object
          message: "Something to do at Lowes DFC 3311\n\n\npcrandall `21",
          type: "info",
          title: "PLC Toolkit",
        };
        dialog.showMessageBox(options);
      },
    },
    actions.separator(),
    actions.inspect(),
  ],
});

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
