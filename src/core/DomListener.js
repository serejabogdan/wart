import {capitalize} from '@core/utils';

export class DomListener {
    constructor(selector, listeners = []) {
        if (!selector) {
            throw new Error(`No ${selector} provided for DomListener!`);
        }
        this.$selector = selector;
        this.listeners = listeners;
    }

    initDomListeners() {
        this.listeners.forEach((listener) => {
            const method = getMethodName(listener);

            if (!this[method]) {
                throw new Error(
                    `Method ${method} is not implemented in ${this.name} component`
                );
            }
            this[method] = this[method].bind(this);
            this.$selector.on(listener, this[method]);
        });
    }

    removeDomListeners() {
        this.listeners.forEach((listener) => {
            const method = getMethodName(listener);
            this.$selector.off(listener, this[method]);
        });
    }
}

function getMethodName(eventName) {
    return `on${capitalize(eventName)}`;
}
