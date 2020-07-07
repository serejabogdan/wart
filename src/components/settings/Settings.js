import {WartComponent} from '@core/WartComponent';

export class Settings extends WartComponent {
    constructor(selector) {
        super(selector, {
            name: 'Settings',
            listeners: ['click']
        });
    }

    toHTML() {
        return `
            <button class="settings__btn settings__btn-reset">
                <img src="./svg/sliders-h-solid.svg" alt="Settings">
            </button>
        `;
    }

    onClick(e) {
        console.log('Settings: click', e);
    }
}
Settings.className = 'settings';
