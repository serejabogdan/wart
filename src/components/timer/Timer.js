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
        this.timer = new TimerService($selector, options.store);
        this.controls = [];
    }

    toHTML() {
        return `
            <div class="timer">
                <div class="timer__status">
                    <span data-timer="status"></span>
                </div>
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
            new Control('update', this.timer.update.bind(this.timer))
        ];
    }

    onClick(e) {
        const eventName = e.target.dataset.timer;
        this.controls
            .filter(control => control.name == eventName)
            .forEach(control => control.action());
    }
}
Timer.className = 'content';
