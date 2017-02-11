import { app, BrowserWindow, session } from 'electron';

export const fileMenu = {
    label: 'File',
    submenu: [
        {
            label: 'Reload',
            accelerator: 'CmdOrCtrl+R',
            click: () => {
                BrowserWindow.getFocusedWindow().webContents.reloadIgnoringCache();
            }
        },
        {
            label: 'Quit',
            accelerator: 'CmdOrCtrl+Q',
            click: () => {
                app.quit();
            }
        }
    ]
};
