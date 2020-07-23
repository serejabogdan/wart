import {WartComponent} from '@core/WartComponent';
import {controlPanel} from '../controlPanel/ControlPanel';
import {$} from '@core/dom';

export class Timer extends WartComponent {
    constructor(selector) {
        super(selector, {
            name: 'Timer',
            listeners: ['click']
        });

        this.min = 20;
        this.sec = 0;
        this.pauseStatus = false;
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
    }

    start(min) {
        if (min) {
            this.min = min;
        }
        if (this.work) {
            return;
        }
        this.work = setInterval(this.tick.bind(this), 1000);
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
        this.min = this.sec = 0;
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
            this.$timer.change = `${this.minFix()}:${this.secFix()}`;
            this.min--;
            this.sec = 59;
        } else {
            this.$timer.change = `${this.minFix()}:${this.secFix()}`;
            this.sec--;
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
        switch (typeBtn) {
            case 'start':
                this.start();
                break;
            case 'pause':
                this.pause();
                break;
            case 'stop':
                this.stop();
                break;
        }
    }
}
Timer.className = 'content';
