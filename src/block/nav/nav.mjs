import Button from "../button/button.mjs";

class Nav {
    constructor(navElem, pageElem) {
        this.elem = navElem;
        this.pageElem = pageElem;

        this.listElemArr = this.elem.querySelectorAll('.nav__list');
        this.itemElemArr = [];
        for (let i = 0; i < this.listElemArr.length; i++) {
            this.itemElemArr[i] = this.listElemArr[i].querySelectorAll('.nav__item')
        }

        this.buttonElemArr = this.elem.querySelectorAll('.button');
        for (let i = 0; i < this.buttonElemArr.length; i++) {
            new Button(this.buttonElemArr[i], this.pageElem);
        }

        this.init();
    }
    setElemStyle() {
        this.pageElem.style.setProperty('--button-qnt-in-main-nav-row', 7);
    }
    init() {
        this.setElemStyle();
    }
}

export default Nav;