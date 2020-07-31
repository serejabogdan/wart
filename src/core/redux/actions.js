import {AMOUNT_MINUTES, TIMER} from './type';

export function timerMinutes(data) {
    return {
        type: AMOUNT_MINUTES,
        ...data
    }
}

export function timerData(data) {
    return {
        type: TIMER,
        timer: data
    }
}
