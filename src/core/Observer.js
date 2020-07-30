export class Observer {
    constructor() {
        this.listeners = {};
        this.unsubscribers = [];
    }

    emit(event, data) {
        if (!Array.isArray(this.listeners[event])) {
            return false;
        }
        this.listeners[event].forEach(listener => listener(data));
        return true;
    }

    subscribe(event, callback) {
        this.listeners[event] = this.listeners[event] || [];
        this.listeners[event].push(callback);
        return () =>
            this.listeners[event] =
            this.listeners[event].filter(listener => listener != callback);
    }

    unsubscribe() {
        this.unsubscribers.forEach(unsubscriber => unsubscriber());
    }
}
