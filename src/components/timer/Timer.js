import {WartComponent} from '@core/WartComponent';
import {ControlPanel} from '../controlPanel/ControlPanel';

export class Timer extends WartComponent {
    toHTML() {
        return `
            <div class="content">
                <div class="timer">
                    <div class="timer__clock">00:00</div>
                    ${new ControlPanel().toHTML()}
                </div>
            </div>
        `;
    }
}
