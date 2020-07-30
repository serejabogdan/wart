import {WartComponent} from '@core/WartComponent';
import {controlPanel} from '../controlPanel/ControlPanel';
import {$} from '@core/dom';
import {Control} from '@core/Control';

export class Timer extends WartComponent {
    constructor($selector) {
        super($selector, {
            name: 'Timer',
            listeners: ['click']
        });

        this.min = 20;
        this.sec = 0;
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
        this.$timer = $('.timer__clock');
        this.$timer.change = `${this.minFix()}:${this.secFix()}`;
        this.controls = [
            new Control('start', this.start.bind(this)),
            new Control('pause', this.pause.bind(this)),
            new Control('stop', this.stop.bind(this))
        ];

        // this.$subscribe(state => console.log('STATE'));
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
        this.min = 20;
        this.sec = 0;
        this.$timer.change = `${this.minFix()}:${this.secFix()}`;
        clearInterval(this.work);
        this.work = null;
    }

    tick() {
        if (!this.min && !this.sec) {
            clearInterval(this.work);
            this.work = null;
        }
        if (this.sec == 0) {
            this.min--;
            this.sec = 59;
            this.$timer.change = `${this.minFix()}:${this.secFix()}`;
            this.$dispatch({type: 'AMOUNT_MINUTES', min: this.min});
        } else {
            this.sec--;
            this.$timer.change = `${this.minFix()}:${this.secFix()}`;
        }
    }

    minFix() {
        return this.min < 10 ? `0${this.min}` : `${this.min}`;
    }
    secFix() {
        return this.sec < 10 ? `0${this.sec}` : `${this.sec}`;
    }

    onClick(e) {
        const typeBtn = e.target.dataset.timer;
        this.controls
            .filter(control => control.name == typeBtn)
            .forEach(control => control.action());

        // this.$dispatch({type: 'TEST'});
    }
}
Timer.className = 'content';
