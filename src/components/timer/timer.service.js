import {$} from '@core/dom';
import {timerTime, timerMode, timerUpdate} from '@core/redux/actions';
import {$setContext} from '@core/utils';

export class TimerService {
    constructor(store) {
        this.minutes = this.seconds = 0;
        this.store = store;
        this.timer = this.store.getState().timer;
        this.audio = new Audio('./audio/alarm1.mp3');
    }
    
    timerInit() {
        this.minutes = this.timer.mode ? this.timer.work || 30 : this.timer.rest;
        this.seconds = 0;
        this.audio.volume = 0.2;
        this.$timer = $('.timer__clock');
        this.$status = $('.timer__status').find('span');
        this.$status.change = this.timer.mode ? 'work' : 'rest';
        $setContext(this.$timer, this.minutes, this.seconds);
        this.store.subscribe(state => {
            this.minutes = state.timer.mode ? state.timer.work : state.timer.rest;
            $setContext(this.$timer, state.timer.work, this.seconds);
        });
    }

    start() {
        if (!this.interval) {
            this.interval = setInterval(this.tick.bind(this), 1000);
        }
    }

    update() {
        if (!this.interval) {
            this.start();
            this.updateButtonImg('pause');
        } else {
            this.stop();
            this.updateButtonImg('play');
        }
    }

    updateButtonImg(path) {
        $('[data-timer="update"]').find('img').imgPath = `./svg/${path}-solid.svg`;
    }

    stop() {
        clearInterval(this.interval);
        this.interval = null;
    }

    next(mode) {
        if (mode) {
            this.store.dispatch(timerTime({
                work: this.timer.fullWork,
                rest: this.timer.fullRest
            }));
            this.$status.change = 'work';
            return this.timer.work;
        } else {
            this.$status.change = 'rest';
            return this.timer.rest;
        }
    }

    tick() {
        if (this.minutes < 0)
            return;

        if (!this.minutes && !this.seconds) {
            this.store.dispatch(
                timerMode(
                    {mode: !this.timer.mode}
                )
            );
            this.minutes = this.next(this.timer.mode);
            this.audio.play();
            if (this.minutes <= 0) {
                this.stop();
                return;
            }
        }
        if (this.seconds == 0) {
            this.minutes--;
            this.seconds = 5;
            $setContext(this.$timer, this.minutes, this.seconds);
            let timerTimeUpdate = this.timer.mode ? {
                    work: this.minutes,
                    rest: this.timer.rest
                } : {
                    work: this.timer.work,
                    rest: this.minutes
                };
            this.store.dispatch(
                timerTime(
                    timerTimeUpdate
                )
            );
        } else {
            this.seconds--;
            $setContext(this.$timer, this.minutes, this.seconds);
        }
    }
}
