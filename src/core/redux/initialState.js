import {storage} from '@core/utils';

const defaultState = {
    timer: {
        work: 30,
        rest: 5,
        mode: true
    }
};

export const initialState = storage() ? {...defaultState, ...storage()} : defaultState;
