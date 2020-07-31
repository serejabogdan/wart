import {WartComponent} from '@core/WartComponent';
import {controlPanel} from '../controlPanel/ControlPanel';
import {Control} from '@core/Control';
import {TimerService} from './timer.service';

export class Timer extends WartComponent {
    constructor($selector, options = {}) {
        super($selector, {
            name: 'Timer',
            listeners: ['click'],
            ...options
        });
        this.timer = new TimerService(this.$dispatch.bind(this), options.store);
        this.controls = [];
    }

    toHTML() {
        return `
            <div class="timer">
                <div class="timer__clock" data-timer="timer">
                    00:00
                </div>
                ${controlPanel()}
            </div>
        `;
    }
    
    init() {
        super.init();
        this.timer.timerInit();
        this.controls = [
            new Control('start', this.timer.start.bind(this.timer)),
            new Control('pause', this.timer.pause.bind(this.timer)),
            new Control('stop', this.timer.stop.bind(this.timer))
        ];
        this.$subscribe(state => console.log(state));
    }

    onClick(e) {
        const typeBtn = e.target.dataset.timer;
        this.controls
            .filter(control => control.name == typeBtn)
            .forEach(control => control.action());
    }
}
Timer.className = 'content';
