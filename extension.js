'use strict';

const Main = imports.ui.main;

class Extension {
    enable() {
        this._hideAccessibilityMenu();
        Main.sessionMode.connectObject(`updated`, this._hideAccessibilityMenu, this);
    }

    disable() {
        // This extension uses the 'unlock-dialog' session mode to hide
        // the accessibility button on the lock screen as well.
        Main.sessionMode.disconnectObject(this);
        this._showAccessibilityMenu();
    }

    _hideAccessibilityMenu() {
        Main.panel.statusArea.a11y?.container.hide();
    }

    _showAccessibilityMenu() {
        Main.panel.statusArea.a11y?.container.show();
    }
}

function init() {
    return new Extension();
}
