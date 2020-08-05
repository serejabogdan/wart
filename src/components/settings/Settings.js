import {WartComponent} from '@core/WartComponent';
import {modalWindow} from './settings.modal';
import {$} from '@core/dom';
import {Control} from '@core/Control';
import {timerUpdate} from '@core/redux/actions';

export class Settings extends WartComponent {
    constructor($selector, options = {}) {
        super($selector, {
            name: 'Settings',
            listeners: ['click'],
            ...options
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
        this.modal = this.createModal(this.$dispatch.bind(this), {title: 'Settings'});
        this.controls = [
            new Control('settings', this.modal.open.bind(this.modal)),
            new Control('modal-close', this.modal.close.bind(this.modal)),
            new Control('modal-ok', this.modal.ok.bind(this.modal))
        ];
    }

    createModal($dispatch, options) {
        const $modal = $.create('div', 'wart-modal');
        $modal.html(modalWindow(options));
        this.$selector.append($modal);
        return {
            open() {
                $modal.addClass('open');
            },
            ok() {
                const controls = $('.wart-modal__body').findAll('[data-input]');
                const timer = {};
                for(let control of controls) {
                    timer[control.dataset.input] = +control.value;
                }
                timer.mode = true;
                $dispatch(timerUpdate(timer));
                this.close();
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
            .filter((control) => control.name === typeBtn)
            .forEach((control) => {
                control.action();
            });
    }
}
Settings.className = 'settings';
