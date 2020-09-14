import {
    AMOUNT_MINUTES,
    TIMER_TIME,
    TIMER_MODE,
    TIMER_UPDATE,
    AUDIO_RANGE
} from './type';

export function timerMinutes(data) {
    // console.log('timerMinutes',data);
    return {
        type: AMOUNT_MINUTES,
        ...data
    };
}

export function timerTime(data) {
    // console.log('timerTime',data);
    return {
        type: TIMER_TIME,
        timer: data
    };
}

export function timerMode(data) {
    // console.log('timerMode', data);
    return {
        type: TIMER_MODE,
        timer: data
    };
}

export function timerUpdate(data) {
    console.log('timerUpdate',data);
    if(!data.work) {
        data.work = 30;
    }
    if(!data.rest) {
        data.rest = 5;
    }
    return {
        type: TIMER_UPDATE,
        timer: data
    };
}

export function audioRange(data) {
    console.log('audioRange', data);
    return {
        type: AUDIO_RANGE,
        audio: data
    };
}