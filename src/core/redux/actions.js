import {AMOUNT_MINUTES} from './type';

export function timerMinutes(data) {
    return {
        type: AMOUNT_MINUTES,
        ...data
    }
}