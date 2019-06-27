import Page from '../../block/page/page.mjs';
import Nav from "../../block/nav/nav.mjs";
import Button from "../../block/button/button.mjs";

export default class View {
    constructor(containerPageElem) {
        this.containerPageElem = containerPageElem;

        this.pageObj.init();
    }
    init() {
        if (window.innerWidth < window.innerHeight) {
            if(window.innerWidth < 480) {
                this.addElem(this.pageElem, 'link', '', '', {rel:"stylesheet", type:"text/css", href:"css/main.css"});
            }
        } else {
            if(window.innerHeight < 480) {
                this.addElem(this.pageElem, 'link', '', '', {rel:"stylesheet", type:"text/css", href:"css/main.css"});
            }
        }

        this.pageObj = new Page(this.containerPageElem);
        this.navObj = new Nav(this.pageObj.elem);
        this.ButtonObj = new Button(this.pageElem);
    }
    addElem(parentElem, tag, style = '', content = '', attr = {}) {
        let elem = document.createElement(tag);

        if(style != '') {
            elem.style = style;
        }
        if(content != '') {
            elem.textContent = content;
        }
        for (let prop in attr) {
            elem.setAttribute(prop, attr[prop]);
        }

        parentElem.appendChild(elem);
    }
}