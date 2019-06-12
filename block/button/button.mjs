class Button {
    constructor(buttonElem, pageElem) {
        this.elem = buttonElem;
        this.pageElem = pageElem;
    }
    //
    enableHandlers() {
        this.elem.addEventListener('touchstart', this, false);
        this.elem.addEventListener('touchend', this, false);
    }
    disableHandlers() {
        this.elem.removeEventListener('touchstart', this, false);
        this.elem.removeEventListener('touchend', this, false);
    }
}

class ButtonNav extends Button {
    constructor(buttonElem, pageElem) {
        super(buttonElem, pageElem);

        // Handler event
        this.handleEvent = function(event) {
            switch(event.type) {
                case 'touchstart':

                break;
                case 'touchend':

                break;
                case 'touchmove':

                break;    
            }
        };
    }
}

class ButtonShowNav extends Button {
    constructor(buttonElem, pageElem) {
        super(buttonElem, pageElem);
     
        // Handler event
        this.handleEvent = function(event) {
            switch(event.type) {
                case 'touchstart':

                break;
                case 'touchend':
                    this.pageElem.classList.toggle('page--nav-show');
                break;
                case 'touchmove':

                break;    
            }
        };
        this.enableHandlers();
    }
}

export {
    ButtonNav,
    ButtonShowNav
}