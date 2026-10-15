const { contextBridge, ipcRenderer } = require("electron");

// Única ponte entre o jogo e o Windows: tela cheia e sair.
contextBridge.exposeInMainWorld("nivelZeroDesktop", {
  toggleFullscreen: () => ipcRenderer.send("toggle-fullscreen"),
  quit: () => ipcRenderer.send("quit"),
});
