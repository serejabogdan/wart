import {DomListener} from '@core/Domlistener';

export class WartComponent extends DomListener {
    constructor(selector, options = {}) {
        super(selector, options.listeners);
        this.name = options.name || '';
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
