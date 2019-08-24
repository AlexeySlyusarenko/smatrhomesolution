// import Page from '../block/page/page.mjs';
// import Nav from "../block/nav/nav.mjs";
import {
    SlideControlButton,
    SwitchControlButton,
} from "../block/button/button.mjs";

export default class View {
    constructor(containerPageElem) {
        this.containerPageElem = containerPageElem;

        this.loadStyle = {
            mobile: {
                landscape: false,
                portrait: false
            },
            tablet: {
                landscape: false,
                portrait: false
            },
            desktop: {
                landscape: false,
                portrait: false
            }
        }

        this.el = {};

        this.init();

        for (let i = 1; i < 13; i++) {
            if (i % 4) {
                this.addButton('control-switch', `id_${i}`, `<path d="M4 4.5h14a2 2 0 1 1 0 5h-12a2 2 0 1 0 0 5h12a2 2 0 1 1 0 5h-14"/>`, 'Room');
                this.el[`id_${i}`].showInDOM(document.getElementsByClassName('control')[1]);
            } else {
                this.addButton('control-slide', `id_${i}`, `<path d="M4 4.5h14a2 2 0 1 1 0 5h-12a2 2 0 1 0 0 5h12a2 2 0 1 1 0 5h-14"/>`, 'Room');
                this.el[`id_${i}`].showInDOM(document.getElementsByClassName('control')[1]);
            }
        }

        console.log(this.el);
    }
    init() {
        this.loadStyleFile();
        this.setHandlers();
    }
    // handlers
    setHandlers() {
        window.addEventListener('resize', this.loadStyleFile.bind(this));
    }
    //
    loadStyleFile() {
        if (window.innerWidth < window.innerHeight) {
            if(!this.loadStyle.mobile.portrait && window.innerWidth < 480) {
                this.addStyleLinkElem("css/main.css");
                this.loadStyle.mobile = true;
            }
        } else {
            if(!this.loadStyle.mobile.landscape && window.innerHeight < 480) {
                this.addStyleLinkElem("css/main.css");
                this.loadStyle.mobile = true;
            }
        }
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
    addStyleLinkElem(styleFilePath) {
        this.addElem(this.containerPageElem, 'link', '', '', {rel:"stylesheet", type:"text/css", href:styleFilePath});
    }
    addButton(typeButton, id, icon = '', title = '', attr = {}) {
        if (typeButton == 'control-slide') {
            this.el[id] = new SlideControlButton(id, icon, title, attr);
        } else if (typeButton == 'control-switch') {
            this.el[id] = new SwitchControlButton(id, icon, title, attr);
        }
    }
}