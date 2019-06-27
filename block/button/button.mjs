import domElemObj from "../..js/lib/domElemObj.mjs"
import eventEmmiterObj from "../..js/lib/eventEmmiterObj.mjs"

import buttonObj from "./buttonObj.mjs"
import svgObj from "../svg/svgObj.mjs"

export default class Button {
    constructor(containerElem, id) {
        this.containerElem = containerElem;
        
        if(id.type == 'nav-push') {
            this.elem = domElemObj.add(this.containerElem, );
        } else if(id.type == 'nav-switch') {

        } else if(id.type == 'control-push') {

        } else if(id.type == 'control-switch') {

        } else if(id.type == 'control-slide') {

        }
        this.elem = buttonElem;
        
        this.startPressTime;
        this.idPressTimeout;
        

        // Handler event
        this.enableHandlers();
    }
    // Handler event
    handlePressNavShowPushButton() {
        console.log(1);
        this.pageElem.classList.toggle('page--nav-show');
    }
    handlePressNavPushButton() {

    }
    handlePressNavSwitchButton() {

    }
    handleStartPressControlSwitchButton() {
        if (!this.elem.classList.contains('button--select')) {
            this.elem.classList.add('button--press');
            this.startPressTime = Date.now();
            this.idPressTimeout = setTimeout(() => {
                this.elem.style.setProperty('--icon-dx-move', '-37px');
                this.elem.style.setProperty('--icon-dy-move', '50px');
                this.elem.classList.add('button--select');
                this.pageElem.classList.add('page--button-select');
            }, 400);
        }
    }
    handleEndPressControlSwitchButton() {
        if (!this.elem.classList.contains('button--select')) {
            clearTimeout(this.idPressTimeout);

            let pressTime = Date.now() - this.startPressTime,
                delayRemoveClass;
            
            if (pressTime < 100) {
                delayRemoveClass = 200;
            } else {
                delayRemoveClass = 100
            }

            setTimeout(() => {
                this.elem.classList.remove('button--press')
            }, delayRemoveClass);
        }
    }
    handlePressControlSlideButton() {

    }
    handleMoveControlSlideButton() {

    }
    handleLongPressControlButton() {

    }
    //
    enableHandlers() {
        if (this.elem.classList.contains('button--nav-show')) {
            this.elem.addEventListener('touchend', this.handlePressNavShowPushButton.bind(this));
        }
        if (this.elem.classList.contains('button--control-switch') || this.elem.classList.contains('button--control-slide')) {
            this.elem.addEventListener('touchstart', this.handleStartPressControlSwitchButton.bind(this));
            this.elem.addEventListener('touchend', this.handleEndPressControlSwitchButton.bind(this));
        }
    }
    disableHandlers() {
    }
}