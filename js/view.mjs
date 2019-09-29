// import Page from '../block/page/page.mjs';
// import Nav from "../block/nav/nav.mjs";
import {
    SlideControlButton,
    SwitchControlButton
} from "../block/button/button--control.mjs";

import {
    SwitchNavButton,
    PushNavButton
} from "../block/button/button--nav.mjs";

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
                this.el[`id_${i}`] = new SlideControlButton(`id_${i}`, `<path d="M4 4.5h14a2 2 0 1 1 0 5h-12a2 2 0 1 0 0 5h12a2 2 0 1 1 0 5h-14"/>`, 'Room');
                this.el[`id_${i}`].show(document.getElementsByClassName('control')[1]);
            } else {
                this.el[`id_${i}`] = new SwitchControlButton(`id_${i}`, `<path d="M4 4.5h14a2 2 0 1 1 0 5h-12a2 2 0 1 0 0 5h12a2 2 0 1 1 0 5h-14"/>`, 'Room');
                this.el[`id_${i}`].show(document.getElementsByClassName('control')[1]);
            }
        }

        for (let i = 0; i < 4; i++) {
            this.el[`id_${i}n`] = new SwitchNavButton(`id_${i}`, `<path d="M4 4.5h14a2 2 0 1 1 0 5h-12a2 2 0 1 0 0 5h12a2 2 0 1 1 0 5h-14"/>`, 'heater');
            this.el[`id_${i}n`].show(document.getElementsByClassName('nav')[2].getElementsByClassName('nav__item')[i]);
        }

        this.el['id_100'] = new SwitchNavButton('id_100', `<circle  cx="12" cy="4" r="1"></circle><circle  cx="12" cy="12" r="1"></circle><circle  cx="12" cy="20" r="1"></circle>`, 'more');
        this.el['id_100'].show(document.getElementsByClassName('nav')[2].getElementsByClassName('nav__item')[4]);

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
}