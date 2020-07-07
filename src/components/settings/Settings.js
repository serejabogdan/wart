import {WartComponent} from '@core/WartComponent';

export class Settings extends WartComponent {
    toHTML() {
        return `
            <div class="settings">
                <button class="settings__btn settings__btn-reset">
                    <img src="./svg/sliders-h-solid.svg" alt="Settings">
                </button>
            </div>
        `;
    }
}
