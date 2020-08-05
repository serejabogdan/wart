import {
    AMOUNT_MINUTES,
    TIMER_TIME,
    TIMER_MODE,
    TIMER_UPDATE
} from './type';

export function timerMinutes(data) {
    return {
        type: AMOUNT_MINUTES,
        ...data
    }
}

export function timerTime(data) {
    return {
        type: TIMER_TIME,
        timer: data
    }
}

export function timerMode(data) {
    return {
        type: TIMER_MODE,
        timer: data
    }
}

export function timerUpdate(data) {
    return {
        type: TIMER_UPDATE,
        timer: data
    }
}
