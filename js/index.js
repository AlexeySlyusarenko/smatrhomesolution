class Page {
    constructor(pageElem) {
        this.elem = pageElem;
        // this.trapElem = this.elem.querySelector('.page__trap');
        // this.controlElem = this.elem.querySelector('.page__control');
        this.navElem = this.elem.querySelector('.page__nav');

        // this.trapObj = new Trap(this.elem.querySelector('.page__trap'));
        // this.controlObj = new PageControl(this.elem.querySelector('.page__control'));
        this.navObj = new Nav(this.navElem, this.elem);

        this.pageMaxSize;
        this.pageMinSize;

        this.init();

        this.enableHandlers();
    }
    //
    enableHandlers() {
        window.addEventListener('resize', () => {
            this.init();
        }, true);
    }
    //
    init() {
        let width = this.elem.getBoundingClientRect().width,
            height = this.elem.getBoundingClientRect().height;

        if(width > height) {
            this.pageMaxSize = width;
            this.pageMinSize = height;
        } else {
            this.pageMaxSize = height;
            this.pageMinSize = width;
        }

        this.elem.style.setProperty('--page-max-size', `${this.pageMaxSize}px`);
        this.elem.style.setProperty('--page-min-size', `${this.pageMinSize}px`);

        let navHeightEl = this.navElem.getBoundingClientRect().height;
        if (navHeightEl > this.navElem.style.getPropertyValue('--page-nav-show-max-pos')) ;
    }
}

class Nav {
    constructor(navElem, pageElem) {
        this.elem = navElem;
        this.pageElem = pageElem;

        this.buttonElemArr = this.elem.querySelectorAll('.button');
        this.buttonObjArr = [];

        for (let i = 0; i < this.buttonElemArr.length; i++) {
            if (this.buttonElemArr[i].classList.contains('button--nav-show')) {
                this.buttonObjArr[i] = new ButtonShowNav(this.buttonElemArr[i], this.pageElem);
            }
            this.buttonObjArr[i] = new ButtonNav(this.buttonElemArr[i], this.pageElem);
        }
    }
}

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

new Page(document.querySelector('.page'));