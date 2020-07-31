import {$} from '@core/dom';

export class Wart {
    constructor($selector, options) {
        this.$app = $($selector);
        this.components = options.components || [];
        this.store = options.store;
    }

    getRoot() {

        const options = {
            store: this.store
        }

        const $root = $.create('div', 'wrapper');
        this.components = this.components.map((Component) => {
            const $div = $.create('div', Component.className);
            const component = new Component($div, options);
            $div.html(component.toHTML());
            $root.append($div);
            return component;
        });
        return $root.$selector;
    }

    render() {
        this.$app.append(this.getRoot());
        this.components.forEach((component) => {
            component.init();
        });
    }
}
