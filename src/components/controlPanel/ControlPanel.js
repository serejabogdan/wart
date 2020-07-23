export const controlPanel = () => {
    return `
        <div class="timer__buttons">
            <button class="timer__btn-start 
            timer__btn-reset timer__btn" data-timer="start">
                <img src="./svg/play-solid.svg" alt="Start"/>
             </button>
            <button class="timer__btn-pause 
            timer__btn-reset timer__btn" data-timer="pause">
                <img src="./svg/pause-solid.svg" alt="Pause"/>
            </button>
            <button class="timer__btn-stop 
            timer__btn-reset timer__btn" data-timer="stop">
                   <img src="./svg/stop-solid.svg" alt="Stop"/>
            </button>
        </div>
    `;
};
