import {
    Button
 } from "./button.mjs";

class SwitchControlButton extends Button {
    constructor(id, icon = '', title = '', attr = {}) {
        super();

        this.create(id, ['button--control', 'button--switch'], icon, title, attr);
        this.setHandlers();
    }
    pressStart(event) {
        if (this.events.disable.state) return 0;

        this.elem.classList.add('button--press');

        this.events.pressStart.state = true;
        this.events.pressStart.time = Date.now();
        this.events.pressStart.posX = event.touches[0].clientX;
        this.events.pressStart.posY = event.touches[0].clientY;
    }
    pressEnd() {
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

class SlideControlButton extends SwitchControlButton {
    constructor(id, icon = '', title = '', attr = {}) {
        super();
    
        this.create(id, ['button--control', 'button--slide'], icon, title, attr);

        this.iconElem = this.elem.getElementsByClassName('button__icon')[0];

        this.setHandlers();
    }

    // event
    setNormal() {
        this.events.normal.state = true;
        this.events.active.state = false;
        this.events.slide.posX = 0;

        this.elem.style.setProperty('--button-control-slide-bg-pos-duration-animation', '0.4s');
        this.elem.style.setProperty('--button-control-slide-bg-pos-x', '0px');
        this.elem.classList.remove('button--active');
    }
    setActive() {
        this.events.normal.state = false;
        this.events.active.state = true;
        this.elem.style.setProperty('--button-control-slide-bg-pos-duration-animation', '0.4s');
        
        this.events.slide.posX = Math.floor(this.events.pressStart.posX - this.elem.getBoundingClientRect().left);
        
        this.elem.style.setProperty('--button-control-slide-bg-pos-x', `${this.events.slide.posX}px`);
        this.elem.classList.add('button--active');
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
        } else if (Math.abs(posdX) > 5) {
            this.slideStart();
        }
    }
    slideStart() {
        this.elem.classList.add('button--active');
        this.elem.style.setProperty('--button-control-slide-bg-pos-duration-animation', '0s');

        this.events.slide.state = true;
        this.events.pressStart.state = false;
        this.events.active.state = true;

        this.events.slide.posXstart = this.events.slide.posX;
    }
    slide(event) {
        event.preventDefault();

        this.events.slide.posX = Math.floor((event.touches[0].clientX - this.events.pressStart.posX) * 1.5 + this.events.slide.posXstart);

        if (this.events.slide.posX < 1) this.events.slide.posX = 1;
        if(this.events.slide.posX > this.iconElem.clientWidth) this.events.slide.posX = this.iconElem.clientWidth;

        this.elem.style.setProperty('--button-control-slide-bg-pos-x', `${this.events.slide.posX}px`);
    }
}

export {
    SlideControlButton,
    SwitchControlButton
}