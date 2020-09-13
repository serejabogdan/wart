import {WartComponent} from '@core/WartComponent';
import {modalWindow} from './settings.modal';
import {$} from '@core/dom';
import {Control} from '@core/Control';
import {timerUpdate, audioRange} from '@core/redux/actions';

export class Settings extends WartComponent {
    constructor($selector, options = {}) {
        super($selector, {
            name: 'Settings',
            listeners: ['mousedown', 'mouseup', 'change'],
            ...options
        });
        this.controls = [];
        this.$selector = $selector;
        Settings.onmousedown = '';
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
        this.modal = this.createModal(this.$dispatch.bind(this), {title: 'Settings', state: this.$getState()});
        this.$modal = this.modal.getModal();
        // array of controls
        this.controls = [
            new Control('settings', this.modal.open.bind(this.modal)),
            new Control('modal-close', this.modal.close.bind(this.modal)),
            new Control('modal-ok', this.modal.ok.bind(this.modal))
        ];
        this.initFoundedHtml();
    }

    initFoundedHtml() {
        this.audioRangeStatus = this.$modal.find('[data-input="audio"]');
        this.audioRangeStatus.value = 11;
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
                const controls = $modal.findAll('[data-input]');
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
            getModal() {
                return $modal;
            },
            destroy() {}
        };
    }

    // events
    onMousedown(e) {
        Settings.onmousedown = e.target.dataset.input;
    }

    onMouseup(e) {
        if (Settings.onmousedown == e.target.dataset.input) {
            this.controls
                .filter((control) => control.name === e.target.dataset.btn)
                .forEach((control) => control.action());
        }
    }

    onChange(e) {
        if(e.target.dataset.input == 'audio') {
            this.$dispatch(
                audioRange({range: +e.target.value})
            );
        }
    }
}
Settings.className = 'settings';
