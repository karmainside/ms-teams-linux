import fetch from 'node-fetch';
import { app, dialog, shell } from 'electron';
import compareVersions from 'compare-versions';

export function checkUpdate(showModal = false) {
	fetch('https://api.github.com/repos/karmainside/ms-teams-linux/releases/latest').then(function(response) {
		return response.json();
	}).then(function(j) {
		const modal = {
			buttons: ['Ok'],
			message: 'You are using the latest version (' + app.getVersion() + ')',
			url: '',
			new: false
		}
		if (compareVersions(j.tag_name, app.getVersion()) === 1) {
			modal.buttons = ['Open download page', 'Not now'];
			modal.message = 'New version is available: ' + j.tag_name;
			modal.url = j.html_url;
			modal.new = true;
		}

		if (modal.new || showModal) {
			dialog.showMessageBox({
				type: 'info',
				buttons: modal.buttons,
				message: modal.message
			}, function (buttonIndex) {
				if (modal.new && buttonIndex === 0) {
					shell.openExternal(modal.url);
				}
			});
		}
	});
}
