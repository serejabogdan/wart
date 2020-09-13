import {
    AMOUNT_MINUTES,
    TIMER_TIME,
    TIMER_MODE,
    TIMER_UPDATE,
    AUDIO_RANGE
} from './type';

export function rootReducer(state, action) {
    let prevState = null;
    switch (action.type) {
        case AMOUNT_MINUTES:
            prevState = state.timer || {};
            prevState.min = action.timer.min;
            return {...state, timer: prevState};
        case TIMER_UPDATE:
            prevState = state.timer || {};
            prevState.fullWork = prevState.work = action.timer.work;
            prevState.fullRest = prevState.rest = action.timer.rest;
            prevState.mode = action.timer.mode;
            return {...state, timer: prevState};
        case TIMER_TIME:
            prevState = state.timer || {};
            prevState.work = action.timer.work;
            prevState.rest = action.timer.rest;
            return {...state, timer: prevState};
        case TIMER_MODE:
            prevState = state.timer || {};
            prevState.mode = action.timer.mode;
            return {...state, timer: prevState};
        case AUDIO_RANGE:
            prevState = state.audio || {};
            prevState.range = action.audio.range;
            return {...state, audio: prevState};
        default: return state;
    }
}
