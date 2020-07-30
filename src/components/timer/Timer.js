import {WartComponent} from '@core/WartComponent';
import {controlPanel} from '../controlPanel/ControlPanel';
import {$} from '@core/dom';
import {Control} from '@core/Control';
import {fixTime} from '@core/utils';
import * as actions from '@core/redux/actions';
import {storage} from '@core/utils';

export class Timer extends WartComponent {
    constructor($selector) {
        super($selector, {
            name: 'Timer',
            listeners: ['click']
        });

        this.min = this.sec = 0;
        this.pauseStatus = false;
        this.controls = [];
    }

    toHTML() {
        return `
            <div class="timer">
                <div class="timer__clock" data-timer="timer">00:00</div>
                ${controlPanel()}
            </div>
        `;
    }

    init() {
        super.init();
        this.timerInit();
        this.controls = [
            new Control('start', this.start.bind(this)),
            new Control('pause', this.pause.bind(this)),
            new Control('stop', this.stop.bind(this))
        ];
    }

    timerInit() {
        /* if (storage('wart-time').timer.min === 0) {
            storage('wart-time', {timer: {min: 30}})
        } */
        this.min = storage('wart-time').timer.min === 0 ? 30 : storage('wart-time').timer.min;
        this.sec = 0;
        this.$timer = $('.timer__clock');
        this.$timer.change = fixTime(this.min, this.sec);
    }

    start(min) {
        if (min) {
            this.min = min;
        }
        if (!this.work) {
            this.work = setInterval(this.tick.bind(this), 1000);
        }
    }

    pause() {
        if (!this.pauseStatus) {
            clearInterval(this.work);
            this.work = null;
            this.pauseStatus = true;
        } else {
            this.start();
            this.pauseStatus = false;
        }
    }

    stop() {
        this.timerInit();
        clearInterval(this.work);
        this.work = null;
    }

    tick() {
        if (!this.min && !this.sec) {
            clearInterval(this.work);
            this.work = null;
            return;
        }
        if (this.sec == 0) {
            this.min--;
            this.sec = 9;
            this.$timer.change = fixTime(this.min, this.sec);
            this.$dispatch(
                actions.timerMinutes(
                    {timer: {min: this.min}}
                )
            );
        } else {
            this.sec--;
            this.$timer.change = fixTime(this.min, this.sec);
        }
    }

    onClick(e) {
        const typeBtn = e.target.dataset.timer;
        this.controls
            .filter(control => control.name == typeBtn)
            .forEach(control => control.action());
    }
}
Timer.className = 'content';
