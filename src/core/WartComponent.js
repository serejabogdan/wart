import {DomListener} from '@core/Domlistener';
import {Observer} from '@core/Observer';


export class WartComponent extends DomListener {
    constructor($selector, options = {}) {
        super($selector, options.listeners);
        this.name = options.name || '';
        this.observer = new Observer();
        this.store = options.store;
        this.storeSub;
    }

    toHTML() {
        return '';
    }

    /* Observer */
    $emit(eventName, ...args) {
        this.observer.emit(eventName, ...args);
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
    }

    $getState() {
        return this.store.getState();
    }
    /* Store */

    /* $setStorage() {
        
    } */

    init() {
        this.initDomListeners();
        // this.$setStorage();
    }

    destroy() {
        this.removeDomListeners();
        this.observer.unsubscribe();
        this.storeSub();
    }
}
