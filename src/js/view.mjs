import Page from '../block/page/page.mjs';

class View {
    constructor(pageElem) {
        this.pageElem = pageElem;

        this.init();

        this.pageObj = new Page(this.pageElem);
    }
    init() {
        if (window.innerWidth < window.innerHeight) {
            if(window.innerWidth < 480) {
                this.addElem(this.pageElem, 'link', '', {rel:"stylesheet", type:"text/css", href:"css/main.css"});
            }
        } else {
            if(window.innerHeight < 480) {
                this.addElem(this.pageElem, 'link', '', {rel:"stylesheet", type:"text/css", href:"css/main.css"});
            }
        }
    }
    addElem(parentElem, tag, content = '', attr = {}) {
        let elem = document.createElement(tag);

        if(content != '') {
            elem.textContent = content;
        }
        for (let prop in attr) {
            elem.setAttribute(prop, attr[prop]);
        }

        parentElem.appendChild(elem);
    }
}

export default View;