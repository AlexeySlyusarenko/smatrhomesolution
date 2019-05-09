class Button {
    constructor(buttonElem, pageElem) {
        this.elem = buttonElem;
        this.pageElem = pageElem;

        // Handler event
        // this.handleEvent = function(event) {
        //     switch(event.type) {
        //         case 'touchstart':

        //         break;
        //         case 'touchend':

        //         break;
        //         case 'touchmove':

        //         break;    
        //     }
        // };
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

let buttonObjArr = [],
    pageElem = document.querySelector('.page'),
    pageTrapElem = document.querySelector('.page__trap'),
    pageControlElem = document.querySelector('.page__control'),
    pageNavElemArr = document.querySelectorAll('.page__nav');

let buttonControlElemArr = pageControlElem.querySelectorAll('.button');

for (let i = 0; i < pageNavElemArr.length; i++) {
    buttonNavElemArr = pageNavElemArr[i].querySelectorAll('.button');
}

for (let i = 0; i < buttonNavElemArr.length; i++) {
    if (buttonNavElemArr[i].classList.contains('button--show-nav')) {
        buttonShowNavObj = new ButtonShowNav(buttonNavElemArr[i], pageElem);
    }
    buttonNavElemArr[i] = new ButtonNav(buttonNavElemArr[i], pageElem);
}