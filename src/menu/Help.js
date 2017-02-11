import path from 'path';
import { app, BrowserWindow, session } from 'electron';
import openAboutWindow from 'about-window';

const copyrightText = `
<center>
    Copyright (c) 2017 karmainside <hr />
    Microsoft, Microsoft Teams, Microsoft Teams logo are either registered trademarks or trademarks of Microsoft Corporation in the United States and/or other countries.<hr />
</center>
`;

export const helpMenu = {
    label: 'Help',
    submenu: [
        {
            label: 'About',
            accelerator: 'F1',
            click: () => openAboutWindow({
                icon_path: path.join(__dirname, 'icon-256x256.png'),
                description: 'Whilst waiting for the official version of MS Teams for Linux, you are very free to use this app.',
                license: 'MIT',
                copyright: copyrightText,
                use_inner_html: true,
                adjust_window_size: true,
                win_options: false
            })
        }
    ]
};
