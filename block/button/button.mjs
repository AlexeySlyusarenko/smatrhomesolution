// api 
//      showInDOM(), removeFromDOM()
//      eventEmitter.on(), eventEmitter.remove(), eventEmitter.emit()

import EventEmitter from '../../js/lib/eventEmitter.mjs';

class Button {
    constructor() {
        this.elem;
        this.value;

        this.events = {
            pressStart: {
                state: false,
                time: 0,
                posX: undefined,
                posY: undefined,
                idTimeout: undefined
            },
            pressEnd: {
                state: false,
                time: 0,
                idTimeout: undefined
            },
            slide: {
                state: false,
                time: 0,
                posX: 0,
                posXstart: 0,
                idTimeout: undefined
            },
            normal: {
                state: false,
                bgColor: '#202124',
                iconColor: '#dadada',
                textColor: '#dadada'
            },
            active: {
                state: false,
                bgColor: '#c5c4c4',
                iconColor: '#ce3000',
                textColor: '#dadada'
            },
            disable: {
                state: false
            },
            select: {
                state: false,
                idTimeout: undefined
            },
            focus: {
                state: false
            }
        };

        this.eventEmitter = new EventEmitter(this.events);
    
        return this;
    }

    // dom
    create(id, classArr = [], icon = '', title = '', attr = {}) {
        let elemInnerHTML = '';

        this.elem = document.createElement('button');

        this.elem.id = id;

        this.elem.classList.add('button');
        if (Array.isArray(classArr)) {
            for (let i = 0; i < classArr.length; i++) {
                this.elem.classList.add(classArr[i]);
            }
        }

        if(icon != '') {
            let iconButton = `<svg class="button__icon" viewbox="0 -12 24 48">${icon}</svg>`;

            elemInnerHTML = elemInnerHTML + iconButton;
        }

        if(title != '') {
            let titleButton = `<span class="button__title">${title}</span>`;

            elemInnerHTML = elemInnerHTML + titleButton;
        }

        if (attr instanceof Object) {
            for (let prop in attr) {
                this.elem.setAttribute(prop, attr[prop]);
            }
        }

        this.elem.innerHTML = elemInnerHTML;

        return this.elem;
    }
    showInDOM(container) {
        return container.appendChild(this.elem);
    }
    removeFromDOM() {
        return this.elem.remove();
    }

    // events
    setNormal() {
        this.events.normal.state = true;
        this.events.active.state = false;
        this.setColorStyle('normal');
    }
    setActive() {
        this.events.active.state = true;
        this.events.normal.state = false;
        this.setColorStyle('active');
    }
    setDisable() {
        this.events.disable.state = true;
        this.elem.classList.add('button--disable');
    }
    removeDisable() {
        this.events.disable.state = false;
        this.elem.classList.remove('button--disable');
    }
    setSelect() {
        let selectPosX = ((window.innerWidth - this.elem.getClientRects()[0].width * 1.7) / 2 - this.elem.getClientRects()[0].x) / 1.7,
            selectPosY = ((window.innerHeight - this.elem.getClientRects()[0].height * 1.7) / 2 - this.elem.getClientRects()[0].y) / 1.7;

        this.elem.style.setProperty('--button-select-move-dx', `${selectPosX}px`);
        this.elem.style.setProperty('--button-select-move-dy', `${selectPosY}px`);
        this.elem.classList.add('button--select');

        this.events.pressStart.state = false;
        this.events.select.state = true;
    }
    removeSelect() {
        this.elem.classList.remove('button--select');
        this.events.select.state = false;
        this.events.select.idTimeout = undefined;
    }
    setFocus() {
        this.events.focus.state = true;
        this.elem.classList.add('button--focus');
    }
    removeFocus() {
        this.events.focus.state = false;
        this.elem.classList.remove('button--focus');
    }

    //style
    setColorStyle(event) {
        if (!this.events[event]) return 0;

        if(this.events[event].bgColor) {
            this.elem.style.setProperty('--button-bg-color', `${this.events[event].bgColor}`);
        }
        if(this.events[event].iconColor) {
            this.elem.style.setProperty('--button-icon-color', `${this.events[event].iconColor}`);
        }
        if(this.events[event].textColor) {
            this.elem.style.setProperty('--button-text-color', `${this.events[event].textColor}`);
        }
    }

    // event handlers 
    setHandlers() {
        this.elem.addEventListener('touchstart', (event) => {
            this.pressStart(event);
        });
        this.elem.addEventListener('touchend', (event) => {
            this.pressEnd(event);
        });
        this.elem.addEventListener('touchmove', (event) => {
            this.move(event);
        });
    }
    pressStart(event) {
        if (this.events.disable.state) return 0;

        this.elem.style.setProperty('--button-slide-bg-pos-duration-animation', '0s');
        this.elem.classList.add('button--press');

        this.events.pressStart.state = true;
        this.events.pressStart.time = Date.now();
        this.events.pressStart.posX = event.touches[0].clientX;
        this.events.pressStart.posY = event.touches[0].clientY;
        
        if (!this.events.select.state && !this.events.select.idTimeout) {
            this.events.select.idTimeout = setTimeout(() => {
                this.setSelect();
            }, 500);
        }
    }
    pressEnd() {            
        if (this.events.select.idTimeout) {
            clearTimeout(this.events.select.idTimeout);
            this.events.select.idTimeout = undefined;
        }

        if (this.events.pressStart.state) {
            if (this.events.active.state == true) {
                this.setNormal();
            } else {
                this.setActive();
            }
        }
        this.events.pressStart.state = false;
        this.events.slide.state = false;
        this.events.pressEnd.state = true;
                    
        this.events.pressEnd.time = Date.now();

        this.events.pressEnd.idTimeout = setTimeout(() => {
            this.elem.classList.remove('button--press');
            this.events.pressEnd.state = false;
        }, this.events.pressEnd.time - this.events.pressStart.time < 300 ?  200 : 0);
    }
    move(event) {
        if (!this.events.pressStart.state) return 0;

        let dX = this.events.pressStart.posX - event.touches[0].clientX,
            dY = this.events.pressStart.posY - event.touches[0].clientY;

        if (Math.abs(dY) > 10 || Math.abs(dX) > 10) {
            this.events.pressStart.state = false;
            this.pressEnd();
        }
    }
}

class SwitchControlButton extends Button {
    constructor(id, icon = '', title = '', attr = {}) {
        super();

        this.create(id, ['button--control', 'button--switch'],icon, title, attr);
        this.setHandlers();
    }
}

class SlideControlButton extends Button {
    constructor(id, icon = '', title = '', attr = {}) {
        super();
    
        this.create(id, ['button--control', 'button--slide'],icon, title, attr);

        this.iconElem = this.elem.getElementsByClassName('button__icon')[0];

        this.setHandlers();
    }

    // event
    setNormal() {
        this.events.normal.state = true;
        this.events.active.state = false;
        this.events.slide.posX = 0;

        this.elem.style.setProperty('--button-slide-bg-pos-duration-animation', '0.4s');
        this.elem.style.setProperty('--button-slide-bg-pos-x', '0px');
        this.elem.style.setProperty('--button-icon-color', `${this.events.normal.iconColor}`);
    }
    setActive() {
        this.events.normal.state = false;
        this.events.active.state = true;
        this.elem.style.setProperty('--button-slide-bg-pos-duration-animation', '0.4s');
        
        this.events.slide.posX = Math.floor(this.events.pressStart.posX - this.elem.getBoundingClientRect().left);
        if (this.events.select.state) this.events.slide.posX = this.events.slide.posX / 1.7;
        
        this.elem.style.setProperty('--button-slide-bg-pos-x', `${this.events.slide.posX}px`);
        this.elem.style.setProperty('--button-icon-color', `${this.events.active.iconColor}`);
    }

    // handlers
    move(event) {
        if (this.events.slide.state) {
            this.slide(event);

            return 0;
        }

        if (!this.events.pressStart.state) return 0;

        let posdX = this.events.pressStart.posX - event.touches[0].clientX,
            posdY = this.events.pressStart.posY - event.touches[0].clientY;

        if (Math.abs(posdY) > 10) {
            this.events.pressStart.state = false;
            this.pressEnd();
        } else if (Math.abs(posdX) > 10) {
            this.slideStart(event);
        }
    }
    slideStart(event) {
        event.preventDefault();

        this.events.slide.state = true;
        this.events.pressStart.state = false;
        this.events.active.state = true;

        if (this.events.select.idTimeout) {
            clearTimeout(this.events.select.idTimeout);
            this.events.select.idTimeout = undefined;
        }

        this.elem.style.setProperty('--button-icon-color', `${this.events.active.iconColor}`);
        
        this.events.slide.posXstart = event.touches[0].clientX - this.events.slide.posX;
    }
    slide(event) {
        event.preventDefault();

        this.events.slide.posX = Math.floor(event.touches[0].clientX - this.events.slide.posXstart);

        if (this.events.slide.posX < 1) this.events.slide.posX = 1;
        if(this.events.slide.posX > this.iconElem.clientWidth) this.events.slide.posX = this.iconElem.clientWidth;

        this.elem.style.setProperty('--button-slide-bg-pos-x', `${this.events.slide.posX}px`);
    }
}

class SwitchNavButton extends Button {
    constructor(id, icon = '', title = '', attr = {}) {
        super();

        this.create(id, ['button--nav', 'button--switch'],icon, title, attr);
        this.setHandlers();
    }
}

export {
    SlideControlButton,
    SwitchControlButton,
    SwitchNavButton
}