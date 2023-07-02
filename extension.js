'use strict';

const Main = imports.ui.main;

class Extension {
    enable() {
        this._hideAccessibilityMenu();
        this._sessionModeChangedId = Main.sessionMode.connect(
            `updated`,
            this._onSessionModeChanged.bind(this)
        );
    }

    disable() {
        // This extension uses the 'unlock-dialog' session mode to hide
        // the accessibility button on the lock screen as well.
        Main.sessionMode.disconnect(this._sessionModeChangedId);
        this._showAccessibilityMenu();
    }

    _hideAccessibilityMenu() {
        Main.panel.statusArea[`a11y`]?.container.hide();
    }

    _showAccessibilityMenu() {
        Main.panel.statusArea[`a11y`]?.container.show();
    }

    _onSessionModeChanged() {
        this._hideAccessibilityMenu();
    }
}

function init() {
    return new Extension();
}
