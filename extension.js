'use strict';

const Main = imports.ui.main;

class Extension {
    enable() {
        this._hideAccessibilityMenu();
        this._sessionModeChangedId = Main.sessionMode.connect(
            'updated',
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
        const a11y = Main.panel.statusArea['a11y'];
        if (a11y) {
            a11y.container.hide();
        }
    }

    _showAccessibilityMenu() {
        const a11y = Main.panel.statusArea['a11y'];
        if (a11y) {
            a11y.container.show();
        }
    }

    _onSessionModeChanged(session) {
        if (!session.isGreeter) {
            this._hideAccessibilityMenu();
        } else {
            this._showAccessibilityMenu();
        }
    }
}

function init() {
    return new Extension();
}
