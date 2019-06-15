class Button {
    constructor(buttonElem, pageElem) {
        this.elem = buttonElem;
        this.pageElem = pageElem;
        
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
        this.elem.classList.add('button--press');
        this.startPressTime = Date.now();
        this.idPressTimeout = setTimeout(() => {
            this.elem.style.setProperty('--icon-dx-move', '-37px');
            this.elem.style.setProperty('--icon-dy-move', '50px');
            this.elem.classList.add('button--select');
        }, 400);
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

export default Button;