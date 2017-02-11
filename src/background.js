import path from 'path';
import url from 'url';
import { app, Menu, Tray } from 'electron';
import { devMenuTemplate } from './menu/dev_menu_template';
import { fileMenu } from './menu/File';
import { helpMenu } from './menu/Help';
import createWindow from './helpers/window';
import notifier from 'node-notifier';

// Special module holding environment variables which you declared
// in config/env_xxx.json file.
import env from './env';

var mainWindow;

const notifRegex = '\([0-9]+\).*?';

let appIcon = null;
let iconPath = {
    default: path.join(__dirname, 'icon-32x32.png'),
    unread: path.join(__dirname, 'icon-32x32-unread.png'),
    appDefault: path.join(__dirname, 'icon-256x256.png'),
    appUnread: path.join(__dirname, 'icon-256x256-unread.png')
}

var setApplicationMenu = function () {
    var menus = [fileMenu, helpMenu];
    if (env.name !== 'production') {
        menus.push(devMenuTemplate);
    }
    Menu.setApplicationMenu(Menu.buildFromTemplate(menus));
};

// Save userData in separate folders for each environment.
// Thanks to this you can use production and development versions of the app
// on same machine like those are two separate apps.
if (env.name !== 'production') {
    var userDataPath = app.getPath('userData');
    app.setPath('userData', userDataPath + ' (' + env.name + ')');
}

app.on('ready', function () {
    setApplicationMenu();
    appIcon = new Tray(iconPath.default);

    var mainWindow = createWindow('main', {
        width: 1000,
        height: 600,
        webPreferences: {
            partition: 'persist:teams',
            nodeIntegration: false
        },
        icon: iconPath.appDefault
    });

    mainWindow.webContents.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36');

    mainWindow.loadURL('https://teams.microsoft.com/');

    mainWindow.on("page-title-updated", function(event, title) {

        if (title.match(notifRegex)) {
            notifier.notify({
                title: 'Microsoft Teams for Linux',
                message: 'You have new chat message!',
                icon: iconPath.appDefault,
                wait: true

            });
            appIcon.setImage(iconPath.unread);
            mainWindow.setIcon(iconPath.appUnread);
            mainWindow.flashFrame(true);
        }
        else {
            appIcon.setImage(iconPath.default);
            mainWindow.setIcon(iconPath.appDefault);
            mainWindow.flashFrame(false);
        }
    });

    notifier.on('click', function (notifierObject, options) {
        mainWindow.restore();
    });

    if (env.name === 'development') {
        mainWindow.openDevTools();
    }
});

app.on('window-all-closed', function () {
    app.quit();
});
