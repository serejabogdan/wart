import './scss/index.scss';
import './scss/settings.modal.scss';
import './scss/timer.scss';
import 'normalize.css';

import {Wart} from './components/wart/Wart';
import {Settings} from './components/settings/Settings';
import {Timer} from './components/timer/Timer';

const wart = new Wart('#app', {
    components: [Settings, Timer]
});

wart.render();
