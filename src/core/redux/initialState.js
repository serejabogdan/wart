import {storage} from '@core/utils';

const defaultState = {
    timer: {
        work: 0,
        rest: 0,
        mode: true
    }
};

export const initialState = storage() ? {...defaultState, ...storage()} : defaultState;
