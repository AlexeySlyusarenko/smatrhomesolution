class Button {
    constructor() {
        this.elem
        this.events = {};
    
        return this;
    }
    // event emmiter
    on(type, func) {
        if (!this.events[type]) {
            this.events[type] = [func];
        } else {
            this.events[type].push(func);
        }
    }
    emit(type, args = false) {
        if(this.events[type]) {
            for (let i; i < this.events[type].length; i++) {
                this.events[type][i](args);
            }
        }
    }
    // dom
    create(id, classArr = [], icon = '', title = '', attr = {}) {
        let elemInnerHTML = '';

        this.elem = document.createElement('button');

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
}

class ControlButton extends Button {
    constructor() {
        super();

        this.startTimePress;
        this.idPressTimeout;

        this.longPressPosX;
        this.longPressPosY;

        this.touchStartPosX;
        this.touchStartPosY;


    }
    // handlers
    setHandlers() {
        this.elem.addEventListener('touchstart', (event) => {
            this.handleEvent(event);
        });
        this.elem.addEventListener('touchend', (event) => {
            this.handleEvent(event);
        });
    }
    //
    handleEvent(event) {
        if (event.type == 'touchstart') {
            this.startPress(event);
        } else if (event.type == 'touchend') {
            this.shortPress();
        } else if  (event.type == 'touchmove') {
            this.movePress(event);
        }
    }
    //
    startPress(event) {
        if (!this.elem.classList.contains('button--select')) {
            this.elem.classList.add('button--press');

            this.startTimePress = Date.now();

            this.touchStartPosX = event.touches[0].clientX;
            this.touchStartPosY = event.touches[0].clientY;

            this.longPressPosX = ((window.innerWidth - this.elem.getClientRects()[0].width * 1.7) / 2 - this.elem.getClientRects()[0].x) / 1.7;
            this.longPressPosY = ((window.innerHeight - this.elem.getClientRects()[0].height * 1.7) / 2 - this.elem.getClientRects()[0].y) / 1.5;
            
            this.idPressTimeout = setTimeout(() => {
                this.longPress();
            }, 500);
        }
    }
    shortPress() {
        if (!this.elem.classList.contains('button--select')) {
            clearTimeout(this.idPressTimeout);

            let timePress = Date.now() - this.startTimePress,
                delayRemoveClass;
            
            if (timePress < 100) {
                delayRemoveClass = 300;
            } else {
                delayRemoveClass = 100;
            }

            setTimeout(() => {
                this.elem.classList.remove('button--press');
            }, delayRemoveClass);
        }
    }
    longPress() {
        this.elem.style.setProperty('--button-select-move-dx', `${this.longPressPosX}px`);
        this.elem.style.setProperty('--button-select-move-dy', `${this.longPressPosY}px`);
        this.elem.classList.add('button--select');
    }
    movePress(event) {
        let touchMovePosdX = this.touchStartPosX - event.touches[0].clientX,
            touchMovePosdY = this.touchStartPosY - event.touches[0].clientY;

        if ((touchMovePosdX > 10 || touchMovePosdY > 10) && !this.elem.classList.contains('button--select')) {
            this.shortPress();
        }
    }
}

class SlideControlButton extends ControlButton {
    constructor(id, icon = '', title = '', attr = {}) {
        super();

        this.create(id, ['button--control', 'button--slide'],icon, title, attr);
        this.setHandlers();
    }
}

class SwitchControlButton extends ControlButton {
    constructor(id, icon = '', title = '', attr = {}) {
        super();

        this.create(id, ['button--control', 'button--switch'],icon, title, attr);
        this.setHandlers();
    }
}

export {
    SlideControlButton,
    SwitchControlButton,
}