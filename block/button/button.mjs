// api 
//      add(), remove()
//      eventEmitter.on(), eventEmitter.remove(), eventEmitter.emit()

import EventEmitter from '../../js/lib/eventEmitter.mjs';

class Button {
    constructor() {
        this.elem;

        this.events = {
            startPress: {
                state: false,
                time: 0,
                posX: undefined,
                posY: undefined,
                idTimeout: undefined,
            },
            endPress: {
                state: false,
                time: 0,
                posX: undefined,
                posY: undefined,
                idTimeout: undefined,
            },
            slide: {
                state: false,
                time: 0,
                posX: undefined,
                posY: undefined,
                idTimeout: undefined,
            },
            move: {
                state: false,
            },
            normal: {
                state: false,
                style: {
                    bgColor: '#202124',
                    iconColor: '#dadada',
                    textColor: '#dadada'
                }
            },
            active: {
                state: false,
                style: {
                    bgColor: '#c5c4c4',
                    iconColor: '#ce3000',
                    textColor: '#dadada'
                },
                value: undefined
            },
            disable: {
                state: false,
            },
            select: {
                state: false,
            },
            focus: {
                state: false,
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
    add(container) {
        return container.appendChild(this.elem);
    }
    remove() {
        return this.elem.remove();
    }
    setNormalState() {
        this.events.normal.state = true;
        this.events.active.state = false;
        this.elem.style.setProperty('--button-bg-color', `${this.events.normal.style.bgColor}`);
        this.elem.style.setProperty('--button-icon-color', `${this.events.normal.style.iconColor}`);
    }
    setActiveState() {
        this.events.active.state = true;
        this.events.normal.state = false;
        this.elem.style.setProperty('--button-bg-color', `${this.events.active.style.bgColor}`);
        this.elem.style.setProperty('--button-icon-color', `${this.events.active.style.iconColor}`);
    }
    setDisableState() {
        this.events.disable.state = true;
        this.elem.classList.add('button--disable');
    }
    removeDisableState() {
        this.events.disable.state = false;
        this.elem.classList.remove('button--disable');
    }
}

class ControlButton extends Button {
    constructor() {
        super();
    }


    // handlers
    setHandlers() {
        this.elem.addEventListener('touchstart', (event) => {
            this.startPress(event);
        });
        this.elem.addEventListener('touchend', (event) => {
            this.endPress(event);
        });
        this.elem.addEventListener('touchmove', (event) => {
            this.slide(event);
        });
    }
    startPress(event) {
        if (!this.events.disable.state && !this.events.endPress.state ) {
            this.elem.classList.add('button--press');
            this.elem.style.setProperty('--button-slide-bg-pos-duration-animation', '0s');

            this.events.startPress.state = true;    
            this.events.startPress.time = Date.now();
            this.events.startPress.posX = event.touches[0].clientX;
            this.events.startPress.posY = event.touches[0].clientY;
            
            if (!this.events.select.state) {
                this.events.startPress.idTimeout = setTimeout(() => {
                    this.select();
                }, 500);
            }
            
        }
    }
    endPress() {
        if (this.events.startPress.state || this.events.slide.state) {
            if (this.events.startPress.idTimeout) {
                clearTimeout(this.events.startPress.idTimeout);
                this.events.startPress.idTimeout = undefined;
            }

            if (!this.events.move.state && this.events.startPress.state) {
                if (this.events.active.state == true) {
                    this.setNormalState();
                } else {
                    this.setActiveState();
                }
            }
        
            this.events.startPress.state = false;
            this.events.slide.state = false;
            this.events.move.state = false;
                        
            this.events.endPress.time = Date.now() - this.events.startPress.time;
    
            this.events.endPress.idTimeout = setTimeout(() => {
                this.elem.classList.remove('button--press');
                this.events.endPress.state = false;
            }, this.events.endPress.time - this.events.startPress.time < 100 ?  200 : 100);    
        }        
    }
    select() {
        let selectPosX = ((window.innerWidth - this.elem.getClientRects()[0].width * 1.7) / 2 - this.elem.getClientRects()[0].x) / 1.7,
            selectPosY = ((window.innerHeight - this.elem.getClientRects()[0].height * 1.7) / 2 - this.elem.getClientRects()[0].y) / 1.7;

        this.elem.style.setProperty('--button-select-move-dx', `${selectPosX}px`);
        this.elem.style.setProperty('--button-select-move-dy', `${selectPosY}px`);
        this.elem.classList.add('button--select');

        this.events.select.state = true;
        this.events.startPress.state = false;
    }
    // handlers
    slide(event) {
        if (this.events.select.state) event.preventDefault();

        if (this.events.startPress.state) {
            this.events.slide.posX = this.events.startPress.posX - event.touches[0].clientX,
            this.events.slide.posY = this.events.startPress.posY - event.touches[0].clientY;
    
            console.log('switch');
    
            if (Math.abs(this.events.slide.posX) > 10|| Math.abs(this.events.slide.posY) > 10) {
                this.events.move.state = true;
                this.endPress();
            }
        }
    }
}

class SwitchControlButton extends ControlButton {
    constructor(id, icon = '', title = '', attr = {}) {
        super();

        this.create(id, ['button--control', 'button--switch'],icon, title, attr);
        this.setHandlers();
    }
}

class SlideControlButton extends ControlButton {
    constructor(id, icon = '', title = '', attr = {}) {
        super();

        this.create(id, ['button--control', 'button--slide'],icon, title, attr);

        this.iconElem = this.elem.getElementsByClassName('button__icon')[0];

        this.setHandlers();
    }
    // dom
    setNormalState() {
        console.log('normal');
        this.events.normal.state = true;
        this.events.active.state = false;
        this.elem.style.setProperty('--button-slide-bg-pos-duration-animation', '0.4s');
        this.elem.style.setProperty('--button-slide-bg-pos-x', '0px');
        this.elem.style.setProperty('--button-icon-color', `${this.events.normal.style.iconColor}`);
    }
    setActiveState() {
        console.log('active');
        this.events.active.state = true;
        this.events.normal.state = false;
        this.elem.style.setProperty('--button-slide-bg-pos-duration-animation', '0.4s');
        
        this.events.active.value = this.events.startPress.posX - this.elem.getBoundingClientRect().left;
        this.elem.style.setProperty('--button-slide-bg-pos-x', `${this.events.active.value}px`);

        this.elem.style.setProperty('--button-icon-color', `${this.events.active.style.iconColor}`);
    }
    // handlers
    endPress() {
        if (this.events.startPress.state || this.events.slide.state) {
            if (this.events.startPress.idTimeout) {
                clearTimeout(this.events.startPress.idTimeout);
                this.events.startPress.idTimeout = undefined;
            }

            console.log(this.events.move.state, this.events.slide.state)
            if (!this.events.move.state && !this.events.slide.state) {
                if (this.events.active.state == true) {
                    this.setNormalState();
                } else {
                    this.setActiveState();
                }
            }
        
            this.events.startPress.state = false;
            this.events.slide.state = false;
            this.events.move.state = false;
                        
            this.events.endPress.time = Date.now() - this.events.startPress.time;
    
            this.events.endPress.idTimeout = setTimeout(() => {
                this.elem.classList.remove('button--press');
                this.events.endPress.state = false;
            }, this.events.endPress.time - this.events.startPress.time < 100 ?  200 : 100);    
        }        
    }
    slide(event) {
        if (this.events.select.state) event.preventDefault();
        if (this.events.slide.state) {
            event.preventDefault();
            console.log('slide-move');
            this.events.slide.posX = Math.floor(event.touches[0].clientX - this.events.startPress.posX);

            if (this.events.slide.posX < 1) this.events.slide.posX = 1;
            if(this.events.slide.posX > this.iconElem.clientWidth) this.events.slide.posX = this.iconElem.clientWidth;

            this.elem.style.setProperty('--button-slide-bg-pos-x', `${this.events.slide.posX}px`);
            console.log(this.elem.style.getPropertyValue('--button-slide-bg-pos-x'));
        }
        if (this.events.startPress.state) {
            this.events.slide.posX = this.events.startPress.posX - event.touches[0].clientX,
            this.events.slide.posY = this.events.startPress.posY - event.touches[0].clientY;

            if (Math.abs(this.events.slide.posX) > 10) {
                this.events.slide.state = true;
                this.events.startPress.state = false;
                this.events.active.state = true;

                if (this.events.startPress.idTimeout) {
                    clearTimeout(this.events.startPress.idTimeout);
                    this.events.startPress.idTimeout = undefined;
                }

                this.elem.style.setProperty('--button-icon-color', `${this.events.active.style.iconColor}`);
                console.log('slide-start');
                
                let slideBgPosX = parseInt(this.elem.style.getPropertyValue('--button-slide-bg-pos-x'));
                if (slideBgPosX !== slideBgPosX) {
                    this.events.startPress.posX = event.touches[0].clientX;
                } else {
                    this.events.startPress.posX = event.touches[0].clientX - slideBgPosX;
                }
            }
    
            if (!this.events.slide.state && Math.abs(this.events.slide.posY) > 10) {
                this.events.move.state = true;
                this.endPress();
            }    
        }
    }
}

export {
    SlideControlButton,
    SwitchControlButton,
}