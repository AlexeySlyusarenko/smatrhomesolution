class View {
    constructor(pageElem) {
        this.pageElem = pageElem;

        this.init();
    }
    init() {
        this.addElem('link', '', {rel:"stylesheet", type:"text/css", media:"screen and (min-width: 600px)", href:"css/main.css"});
    }
    addElem(tag, content = '', attr = {}) {
        let t = document.createElement(tag);

        t.textContent = content;

        for (let prop in attr) {
            t.setAttribute(prop, attr[prop]);
        }

        this.pageElem.appendChild(t);
    }
}

export default View;