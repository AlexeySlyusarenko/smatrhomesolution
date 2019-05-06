class Button {
    constructor(button) {
        this.elem = button;

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

let buttonObjArr = [],
    pageElem = document.querySelector('.page'),
    pageTrapElem = document.querySelector('.page__trap'),
    pageControlElem = document.querySelector('.page__control'),
    pageNavElem = document.querySelectorAll('.page__nav'),
    buttonElemArr = document.querySelectorAll('.button');

for (let i = 0; i < buttonElemArr.length; i++) {
    buttonObjArr[i] = new Button(buttonElemArr[i]);
}