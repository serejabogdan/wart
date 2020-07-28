import {$} from '@core/dom';

export class Wart {
    constructor($selector, options) {
        this.$app = $($selector);
        this.components = options.components || [];
    }

    getRoot() {
        const $root = $.create('div', 'wrapper');
        this.components = this.components.map((Component) => {
            const $div = $.create('div', Component.className);
            const component = new Component($div, {});
            console.log(component);
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
