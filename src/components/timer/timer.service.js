import {timerTime, timerUpdate} from '@core/redux/actions';
import {fixTime} from '@core/utils';

TimerService
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
        this.$setTime();
        this.audio.volume = 0.1;

        const maxSeconds = 59;
        const minSeconds = 0;
        this.store.subscribe(state => {
            this.timerContextUpdate(state);
            if (this.interval) {
                this.minutes--;
                this.seconds = maxSeconds;
            } else {
                this.seconds = minSeconds;
            }
            this.$setTime();
        });
    }

    $setTime() {
        this.$timer.changeText = fixTime(this.minutes, this.seconds);
    }

    timerContextUpdate(state) {
        const startWorkDefaultTime = 30;
        const startRestDefaultTime = 5;
        this.minutes = state.timer.mode ?
            state.timer.work || startWorkDefaultTime
            : state.timer.rest || startRestDefaultTime;
        this.statusToggle();
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
        this.statusToggle();
    }

    tick() {
        if (this.minutes >= 0 && !this.seconds) {
            const timeUpdate = this.timer.mode ? {
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
            this.$setTime();
        }

        if (!this.minutes && !this.seconds) {
            this.nextMode();
            this.audio.play();
        }
    }

    statusToggle() {
        this.$status.changeText = this.timer.mode ? 'work' : 'rest';
    }
}
