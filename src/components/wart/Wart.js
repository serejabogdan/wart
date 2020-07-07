export class Wart {
    constructor(selector, options) {
        this.$selector = document.querySelector(selector);
        this.components = options.components || [];
    }
}
