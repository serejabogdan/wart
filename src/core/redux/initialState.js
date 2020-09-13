import {storage} from '@core/utils';

const defaultState = {
    timer: {
        work: 30,
        rest: 5,
        mode: true,
        fullWork: 30,
        fullRest: 5
    },
    audio: {
        range: 20
    }
};

export const initialState = storage() ? {...defaultState, ...storage()} : defaultState;
