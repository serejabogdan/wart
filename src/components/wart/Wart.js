export class Wart {
    constructor(selector, options) {
        this.$app = document.querySelector(selector);
        this.components = options.components || [];
    }

    getRoot() {
        const $root = document.createElement('div');
        $root.classList.add('wrapper');
        this.components.forEach((Component) => {
            const component = new Component();
            $root.insertAdjacentHTML('beforeend', component.toHTML());
        });
        return $root;
    }

    render() {
        this.$app.append(this.getRoot());
    }
}
