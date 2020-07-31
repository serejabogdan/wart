import {AMOUNT_MINUTES, TIMER} from './type';

export function rootReducer(state, action) {
    // console.log('state', state.timer);
    // console.log('action', action);
    let prevState = null;
    switch (action.type) {
        case AMOUNT_MINUTES:
            prevState = state.timer || {};
            prevState.min = action.timer.min;
            return {...state, timer: prevState};
        case TIMER:
            prevState = state.timer || {};
            prevState.work = action.timer.work;
            prevState.rest = action.timer.rest;
            return {...state, timer: prevState};
        default: return state;
    }
}
