import {WartComponent} from '@core/WartComponent';
import {controlPanel} from '../controlPanel/ControlPanel';

export class Timer extends WartComponent {
    toHTML() {
        return `
            <div class="timer">
                <div class="timer__clock">00:00</div>
                ${controlPanel()}
            </div>
        `;
    }
}
Timer.className = 'content';
