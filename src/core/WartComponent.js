import {DomListener} from '@core/Domlistener';
import {Observer} from '@core/Observer';
import {createStore} from '@core/createStore';
import {rootReducer} from './redux/rootReducer';
import {storage} from '@core/utils';


export class WartComponent extends DomListener {
    constructor($selector, options = {}) {
        super($selector, options.listeners);
        this.name = options.name || '';
        this.observer = new Observer();
        this.store = createStore(rootReducer, {
            timer: {}
        });
        this.storeSub;
    }

    toHTML() {
        return '';
    }

    /* Observer */
    $emit(e, ...args) {
        this.observer.emit(e, ...args);
    }

    $on(e, callback) {
        const unsubscriber = this.observer.subscribe(e, callback);
        this.observer.unsubscribers.push(unsubscriber);
    }
    /* Observer */

    /* Store */
    $dispatch(action) {
        this.store.dispatch(action);
    }

    $subscribe(callback) {
        this.storeSub = this.store.subscribe(callback);
        // console.log(this.storeSub);
    }

    $setStorage() {
        this.store.subscribe(state => {
            console.log(state);
            storage('wart-time', state);
        });
    }
    /* Store */

    init() {
        this.initDomListeners();
        this.$setStorage();
    }

    destroy() {
        this.removeDomListeners();
        this.observer.unsubscribe();
        this.storeSub();
    }
}
