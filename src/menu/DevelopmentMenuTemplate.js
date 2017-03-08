import { app, BrowserWindow } from 'electron';

const DevelopmentMenuTemplate = {
  label: 'Development',
  submenu: [
    {
      label: 'Reload',
      accelerator: 'CmdOrCtrl+R',
      click() {
        BrowserWindow.getFocusedWindow().webContents.reloadIgnoringCache();
      },
    },
    {
      label: 'Toggle DevTools',
      accelerator: 'Alt+CmdOrCtrl+I',
      click() {
        BrowserWindow.getFocusedWindow().toggleDevTools();
      },
    },
    {
      label: 'Quit',
      accelerator: 'CmdOrCtrl+Q',
      click() {
        app.quit();
      },
    },
  ],
};

export default DevelopmentMenuTemplate;
