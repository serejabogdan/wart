import {AMOUNT_MINUTES} from './type';

export function rootReducer(state, action) {
    console.log('state', state);
    console.log('action', action);
    let prevState = null;
    switch (action.type) {
        case AMOUNT_MINUTES:
            prevState = state.timer || {};
            prevState.min = action.timer.min;
            return {...state, timer: prevState};
        /* case 'INIT':
            return {...state, timer: prevState}; */
        default: return state;
    }
}
