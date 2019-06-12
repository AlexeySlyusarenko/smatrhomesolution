import Page from '../block/page/page.mjs';

class View {
    constructor(pageElem) {
        this.pageElem = pageElem;

        this.init();

        this.pageObj = new Page(this.pageElem);
    }
    init() {
        
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