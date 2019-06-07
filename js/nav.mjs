import { 
    ButtonNav,
    ButtonShowNav
 } from "./button.mjs";

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
        this.buttonObjArr = [];

        for (let i = 0; i < this.buttonElemArr.length; i++) {
            if (this.buttonElemArr[i].classList.contains('button--nav-show')) {
                this.buttonObjArr[i] = new ButtonShowNav(this.buttonElemArr[i], this.pageElem);
            }
            this.buttonObjArr[i] = new ButtonNav(this.buttonElemArr[i], this.pageElem);
        }

        this.init();
    }
    setElemStyle() {
        // this.pageElem.orientation
        this.pageElem.style.setProperty('--button-qnt-in-main-nav-row', 7);
    }
    init() {
        this.setElemStyle();
    }
}


export {
    Nav
}