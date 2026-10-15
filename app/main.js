const { app, BrowserWindow, Menu, ipcMain } = require("electron");
const path = require("path");

// Notebooks com GPU modesta (ex.: Snapdragon 7c do Galaxy Book Go) às vezes caem na lista
// de GPUs bloqueadas do Chromium e o jogo roda no processador. Força a aceleração.
app.commandLine.appendSwitch("ignore-gpu-blocklist");
app.commandLine.appendSwitch("enable-gpu-rasterization");
app.commandLine.appendSwitch("enable-zero-copy");
// Sem limite de FPS por segundo plano, e áudio sem esperar clique.
app.commandLine.appendSwitch("disable-renderer-backgrounding");
app.commandLine.appendSwitch("autoplay-policy", "no-user-gesture-required");

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    fullscreen: true,
    backgroundColor: "#0b0a06",
    title: "Nível Zero",
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      sandbox: true,
      backgroundThrottling: false,
      spellcheck: false,
    },
  });
  Menu.setApplicationMenu(null);
  win.loadFile(path.join(__dirname, "index.html"));
  // Links externos nunca abrem dentro do jogo.
  win.webContents.setWindowOpenHandler(() => ({ action: "deny" }));
  win.webContents.on("will-navigate", (e) => e.preventDefault());
}

ipcMain.on("toggle-fullscreen", (e) => {
  const win = BrowserWindow.fromWebContents(e.sender);
  if (win) win.setFullScreen(!win.isFullScreen());
});
ipcMain.on("quit", () => app.quit());

app.whenReady().then(createWindow);
app.on("window-all-closed", () => app.quit());
