import {WartComponent} from '@core/WartComponent';

export class ControlPanel extends WartComponent {
    toHTML() {
        return `
            <div class="timer__buttons">
                <button class="timer__btn-start 
                timer__btn-reset timer__btn">
                    <img src="./svg/play-solid.svg" alt="Play"/>
                </button>
                <button class="timer__btn-pause 
                timer__btn-reset timer__btn">
                    <img src="./svg/pause-solid.svg" alt="Pause"/>
                </button>
                <button class="timer__btn-stop 
                timer__btn-reset timer__btn">
                    <img src="./svg/stop-solid.svg" alt="Stop"/>
                </button>
            </div>
        `;
    }
}
