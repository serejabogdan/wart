import './scss/index.scss';
import './scss/timer.scss';
import './scss/settings.scss';
import 'normalize.css';
import {Wart} from './components/timer/Timer';

const wart = new Wart('#app', {
    components: []
});

console.log(wart);
