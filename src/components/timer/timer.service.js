import {$} from '@core/dom';
import {timerMinutes} from '@core/redux/actions';
import {storage} from '@core/utils';
import {setTime} from '@core/utils';

export class TimerService {
    constructor($dispatch, store) {
        this.min = this.sec = 0;
        this.pauseStatus = false;
        this.$dispatch = $dispatch;
        this.store = store;
    }
    
    timerInit() {
        this.min = this.store.getState().timer.work;
        this.sec = 0;
        this.$timer = $('.timer__clock');
        this.store.subscribe(state => {
            setTime(this.$timer, this.min, this.sec);
        });
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
            this.stop();
            this.pauseStatus = true;
        } else {
            this.start();
            this.pauseStatus = false;
        }
    }

    stop() {
        clearInterval(this.work);
        this.work = null;
    }

    tick() {
        if (!this.min && !this.sec) {
            this.stop();
            return;
        }
        if (this.sec == 0) {
            this.min--;
            this.sec = 9;
            setTime(this.$timer, this.min, this.sec);
            this.$dispatch(
                timerMinutes(
                    {timer: {min: this.min}}
                )
            );
        } else {
            this.sec--;
            setTime(this.$timer, this.min, this.sec);
        }
    }
}
