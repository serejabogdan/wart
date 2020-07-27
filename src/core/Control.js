export class Control {
    constructor(name, method) {
        this.name = name;
        this.method = method;
    }

    action() {
        this.method();
    }
}
