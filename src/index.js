import './scss/index.scss';
import './scss/settings.modal.scss';
import './scss/timer.scss';
import 'normalize.css';

import {Wart} from './components/wart/Wart';
import {Settings} from './components/settings/Settings';
import {Timer} from './components/timer/Timer';
import {createStore} from '@core/createStore';
import {rootReducer} from '@core/redux/rootReducer';
import {initialState} from '@core/redux/initialState';
import {storage} from '@core/utils';

const store = createStore(
    rootReducer,
    initialState
);

store.subscribe(state => {
    storage('wart-state', state);
});

const wart = new Wart('#app', {
    components: [Settings, Timer],
    store
});

wart.render();
