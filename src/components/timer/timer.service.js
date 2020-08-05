import {timerTime, timerUpdate} from '@core/redux/actions';
import {$setContext} from '@core/utils';

export class TimerService {
    constructor($root, store) {
        this.minutes = this.seconds = 0;
        this.store = store;
        this.$root = $root;
        this.timer = this.store.getState().timer;
        this.audio = new Audio('./audio/alarm1.mp3');
    }
    
    timerInit() {
        this.timerHtmlInit();
        this.timerContextUpdate(this.store.getState());
        $setContext(this.$timer, this.minutes, this.seconds);
        this.audio.volume = 0.1;

        this.store.subscribe(state => {
            this.timerContextUpdate(state);
            this.minutes--;
            this.seconds = 59;
            $setContext(this.$timer, this.minutes, this.seconds);
        });
    }

    timerContextUpdate(state) {
        this.minutes = state.timer.mode ? state.timer.work : state.timer.rest;
        this.$status.change = this.timer.mode ? 'work' : 'rest';
    }

    timerHtmlInit() {
        this.$timer = this.$root.find('[data-timer="timer"]');
        this.$status = this.$root.find('[data-timer="status"]');
        this.$buttonUpdateImage = this.$root.find('[data-timer="image-btn"]');
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
        this.$buttonUpdateImage.imgPath = `./svg/${path}-solid.svg`;
    }

    stop() {
        clearInterval(this.interval);
        this.interval = null;
    }

    nextMode() {
        this.store.dispatch(
            timerUpdate({
                work: this.timer.fullWork,
                rest: this.timer.fullRest,
                mode: !this.timer.mode
            })
        );
        this.$status.change = this.timer.mode ? 'work' : 'rest';
    }

    tick() {
        if (this.minutes >= 0 && this.seconds == 0) {
            let timeUpdate = this.timer.mode ? {
                    work: this.minutes,
                    rest: this.timer.rest
                } : {
                    work: this.timer.work,
                    rest: this.minutes
                };
            this.store.dispatch(
                timerTime(
                    timeUpdate
                )
            );
        } else {
            this.seconds--;
            $setContext(this.$timer, this.minutes, this.seconds);
        }
        if (!this.minutes && !this.seconds) {
            this.nextMode();
            this.audio.play();
        }
    }
}
