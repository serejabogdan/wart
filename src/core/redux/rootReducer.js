export function rootReducer(state, action) {
    const {min} = action;
    console.log(action);
    switch (action.type) {
        case 'AMOUNT_MINUTES':
            return {timer: min};
        default: return {state};
    }
}
