import { clipboard, Menu } from 'electron';

const HandleRightClick = (event, props, windowContext) => {
  const { selectionText, linkURL, linkText } = props;
  const menuItems = [];

  if (selectionText && selectionText.length > 0) {
    menuItems.push({
      role: 'copy',
      label: 'Copy',
    });
  }

  if (linkURL && linkURL.length > 0) {
    menuItems.push({
      label: 'Copy link address',
      click: () => {
        clipboard.writeText(linkURL);
      },
    });
    menuItems.push({
      label: 'Copy link text',
      click: () => {
        clipboard.writeText(linkText);
      },
    });
  }

  if (menuItems.length > 0) {
    const rightClickMenu = Menu.buildFromTemplate(menuItems);
    rightClickMenu.popup(windowContext);
  }
};

export default HandleRightClick;
