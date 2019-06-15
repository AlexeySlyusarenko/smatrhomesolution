import Button from "../button/button.mjs";

class Control {
    constructor(controlElem, pageElem) {
        this.elem = controlElem;
        this.pageElem = pageElem;

        this.buttonElemArr = this.elem.querySelectorAll('.button');
        for (let i = 0; i < this.buttonElemArr.length; i++) {
            new Button(this.buttonElemArr[i], this.pageElem);
        }

        this.init();
    }
    init() {

    }
}

export default Control;