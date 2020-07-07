import {$} from '@core/dom';

export class Wart {
    constructor(selector, options) {
        this.$app = $(selector);
        this.components = options.components || [];
    }

    getRoot() {
        const $root = $.create('div', 'wrapper');
        this.components.forEach((Component) => {
            const component = new Component();
            $root.html(component.toHTML());
        });
        return $root.$selector;
    }

    render() {
        this.$app.append(this.getRoot());
    }
}
