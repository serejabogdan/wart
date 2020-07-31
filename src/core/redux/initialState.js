import {storage} from '@core/utils';

const defaultState = {
    timer: {
        work: 0,
        rest: 0
    }
};

export const initialState = storage() ? storage() : defaultState;
