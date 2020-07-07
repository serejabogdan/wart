class Dom {
    constructor(selector) {
        this.$selector =
            typeof selector == 'string'
                ? document.querySelector(selector)
                : selector;
    }

    html(html) {
        if (typeof html == 'string') {
            this.$selector.insertAdjacentHTML('beforeend', html);
            return this;
        }
        return this.$selector.outerHTML.trim();
    }

    clear() {
        this.$selector.innerHTML = '';
        return this;
    }

    append(node) {
        if (node instanceof Dom) {
            node = node.$selector;
        }

        if (Element.prototype.append) {
            this.$selector.append(node);
        }

        return this;
    }
}

export function $(selector) {
    return new Dom(selector);
}

$.create = (selector, classes = '') => {
    const domElement = document.createElement(selector);
    if (classes) {
        domElement.classList.add(classes);
    }
    return $(domElement);
};
