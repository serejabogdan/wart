import {WartComponent} from '@core/WartComponent';
import {modalWindow} from './settings.modal';
import {$} from '@core/dom';
import {Control} from '@core/Control';

export class Settings extends WartComponent {
    constructor($selector) {
        super($selector, {
            name: 'Settings',
            listeners: ['click']
        });
        this.controls = [];
        this.$selector = $selector;
    }

    toHTML() {
        return `
            <button class="settings__btn settings__btn-reset" data-btn="settings">
                <img src="./svg/sliders-h-solid.svg" alt="Settings">
            </button>
        `;
    }

    init() {
        super.init();
        this.modal = this.createModal({title: 'Settings'});
        this.controls = [
            new Control('settings', this.modal.open),
            new Control('modal-close', this.modal.close)
        ];
        // this.$subscribe(state => console.log('STATE'));
    }

    createModal(options) {
        const $modal = $.create('div', 'wart-modal');
        $modal.html(modalWindow(options));
        this.$selector.append($modal);
        return {
            open() {
                $modal.addClass('open');
            },
            close() {
                $modal.removeClass('open');
                $modal.addClass('hide');
                setTimeout(() => $modal.removeClass('hide'), 300);
            },
            destroy() {}
        };
    }

    onClick(e) {
        const typeBtn = e.target.dataset.btn;
        this.controls
            .filter((control) => control.name == typeBtn)
            .forEach((control) => {
                control.action();
            });
            // this.$dispatch({type: 'TEST'});
    }
}
Settings.className = 'settings';
