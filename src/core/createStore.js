export function createStore(rootReducer, initialState = {}) {
    let state = rootReducer(initialState, {type: '_INIT_'});
    let listeners = [];
    return {
        subscribe(callback) {
            listeners.push(callback);
            return () => {
                listeners = listeners.filter(listener => listener != callback);
            };
        },
        dispatch(action) {
            state = rootReducer(state, action);
            listeners.forEach(listener => {listener(state)});
        },
        getState() {
            return state;
        }
    };
}
