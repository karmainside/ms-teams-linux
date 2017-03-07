# Microsoft Teams Capsule - unofficial Microsoft Teams app for Linux

[![Build Status](https://travis-ci.org/sportradar/ms-teams-linux.svg?branch=master)](https://travis-ci.org/sportradar/ms-teams-linux)

## Description
Microsoft Teams Capsule is unofficial Microsoft Teams application for Linux, which uses [electron framework](http://electron.atom.io/) to wrap web version of [Microsoft Teams](https://teams.microsoft.com/).

With this app you will be able to launch web version as an application with no need to keep the browser tap always open.

Application also offers notifications for unread messages, but it's very limited.

## Installation
Applications is distributed in the AppImage format and should run on all common Linux distributions.

1. Download installation file
  * using direct link: [AppImage](https://dl.karmainside.com/ms-teams-capsule/ms-teams-capsule-latest-x86_64.AppImage) or [ZIP](https://dl.karmainside.com/ms-teams-capsule/ms-teams-capsule-latest-x86_64.zip) (_don't forget to unzip if you are downloading zip_)
  * using wget: `$ wget https://dl.karmainside.com/ms-teams-capsule/ms-teams-capsule-latest-x86_64.AppImage`

2. Make it executable
  * `$ chmod a+x ms-teams-capsule*.AppImage`

3. Run the app!
  * `$ ./ms-teams-capsule*.AppImage`

You can also get more information about AppImage on the [official website](http://appimage.org/).

## Usage
Install the application and launch it. After logging in you will be able to use Microsoft Teams.
Application supports very limited version of notifications.
If you have something unread in chats, you will receive push notification and the icon will change with one with big red dot.

### Known issues
If you are stucked with blank white, blue or purple screen, just click File -> Reload, there is no need to relaunch the application.

### If you don't see tray icon
On Linux distributions that only have app indicator support, you have to install libappindicator1 to make the tray icon work.

`$ apt-get install libappindicator1`

## Development
This project is based on awesome [electron-boilerplate](https://github.com/szwacz/electron-boilerplate). Please, follow the link to learn more about using the development environment.

Since I'm quite new to Electron, PR and advices are more than welcome!

## License
MIT
