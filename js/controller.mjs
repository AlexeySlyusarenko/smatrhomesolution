export default class Controller {
    constructor(view, model) {
        this.view = view;
        this.model = model;

        this.view.init();
    }
}