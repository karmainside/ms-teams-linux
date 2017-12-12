import path from 'path';
import { app, Menu, Tray, shell } from 'electron';
import DevelopmentMenuTemplateMenu from './menu/DevelopmentMenuTemplateMenu';
import FileMenu from './menu/FileMenu';
import HelpMenu from './menu/HelpMenu';
import TrayMenu from './menu/TrayMenu';
import HandleRightClick from './menu/RightClick';
import createWindow from './helpers/window';

// Special module holding environment variables which you declared
// in config/env_xxx.json file.
import env from './env';

const notifRegex = '\([0-9]+\).*?';

let appIcon = null;
const iconPath = {
  default: path.join(__dirname, 'icon-32x32.png'),
  unread: path.join(__dirname, 'icon-32x32-unread.png'),
  appDefault: path.join(__dirname, 'icon-256x256.png'),
  appUnread: path.join(__dirname, 'icon-256x256-unread.png'),
};

const setApplicationMenu = function() {
  const menus = [FileMenu, HelpMenu];
  if (env.name !== 'production') {
    menus.push(DevelopmentMenuTemplateMenu);
  }
  Menu.setApplicationMenu(Menu.buildFromTemplate(menus));
};

// Save userData in separate folders for each environment.
// Thanks to this you can use production and development versions of the app
// on same machine like those are two separate apps.
if (env.name !== 'production') {
  const userDataPath = app.getPath('userData');
  app.setPath('userData', `${userDataPath} (${env.name})`);
}

app.on('ready', () => {
  setApplicationMenu();
  appIcon = new Tray(iconPath.default);
  appIcon.setContextMenu(TrayMenu);

  const mainWindow = createWindow('main', {
    width: 1000,
    height: 600,
    webPreferences: {
      partition: 'persist:teams',
      nodeIntegration: false,
    },
    icon: iconPath.appDefault,
  });

  mainWindow.webContents.setUserAgent(
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36'
  );

  mainWindow.loadURL('https://teams.microsoft.com/');
  console.log(mainWindow.id);

  mainWindow.on('page-title-updated', (event, title) => {
    if (title.match(notifRegex)) {
      // notifier.notify({
      //     title: 'Microsoft Teams for Linux',
      //     message: 'You have new chat message!',
      //     icon: iconPath.appDefault,
      //     wait: true
      //
      // });
      appIcon.setImage(iconPath.unread);
      mainWindow.setIcon(iconPath.appUnread);
      mainWindow.flashFrame(true);
    } else {
      appIcon.setImage(iconPath.default);
      mainWindow.setIcon(iconPath.appDefault);
      mainWindow.flashFrame(false);
    }
  });

  // notifier.on('click', function (notifierObject, options) {
  //     mainWindow.restore();
  // });

  if (env.name === 'development') {
    mainWindow.openDevTools();
  }

  const ignoreOpenInNewWindow = ['teams.microsoft', 'microsoftonline'];

  const handleRedirect = (e, url) => {
    let ignoreOpen = false;

    ignoreOpenInNewWindow.forEach(ignoreUrl => {
      if (url.toLowerCase().indexOf(ignoreUrl) > -1) {
        ignoreOpen = true;
      }
    });

    if (!ignoreOpen) {
      e.preventDefault();
      shell.openExternal(url);
    }
  };

  mainWindow.webContents.on('will-navigate', handleRedirect);
  mainWindow.webContents.on('new-window', handleRedirect);
  mainWindow.webContents.on('context-menu', (event, props) =>
    HandleRightClick(event, props, mainWindow));
});

app.on('window-all-closed', () => {
  app.quit();
});
