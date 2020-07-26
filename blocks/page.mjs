import Nav from "../nav/nav.mjs";

export default class Page {
    constructor(pageElem, view) {
        // debug count
        this.debugCount = 1;
        //
        this.elem = pageElem;
        this.controlElem = this.elem.querySelector('.page__curtain');
        this.controlElemArr = this.elem.querySelectorAll('.page__control');
        this.navElemArr = this.elem.querySelectorAll('.page__nav');
    }
    createPage() {

    }
    // debug message
    debugMessage(str) {
        let pageDebugElem = this.elem.querySelector('.page__debug');

        pageDebugElem.textContent = str;
        this.debugCount++;
    }
}