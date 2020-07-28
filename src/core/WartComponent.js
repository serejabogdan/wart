import {DomListener} from '@core/Domlistener';
import {Observer} from '@core/Observer';
import {createStore} from '@core/createStore';
import {rootReducer} from '@core/redux/rootReducer';

export class WartComponent extends DomListener {
    constructor($selector, options = {}) {
        super($selector, options.listeners);
        this.name = options.name || '';
        this.observer = new Observer();
        this.store = createStore(rootReducer);
    }

    toHTML() {
        return '';
    }

    init() {
        this.initDomListeners();
    }

    destroy() {
        this.removeDomListeners();
    }
}
