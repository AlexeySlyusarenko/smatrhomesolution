import svgJSON from './svgObj.mjs';
import buttonJSON from './buttonObj.mjs';
import page from './page.json';

export default class Controller {
    constructor(view, model) {

        handlerDomJSON(page);

        this.view = view;
        this.model = model;


    }
    handlerDomJSON(domJSON) {
        let domObj = JSON.parse(domJSON);


    }
}