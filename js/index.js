class Page {
    constructor(pageElem) {
        this.elem = pageElem;
        // this.trapElem = this.elem.querySelector('.page__trap');
        // this.controlElem = this.elem.querySelector('.page__control');
        this.navElem = this.elem.querySelector('.page__nav');

        // this.trapObj = new Trap(this.elem.querySelector('.page__trap'));
        // this.controlObj = new PageControl(this.elem.querySelector('.page__control'));
        this.navObj = new Nav(this.navElem, this.elem);
        
        this.width;
        this.height;
        this.navElWidth;
        this.navElHeight;

        this.maxSize;
        this.minSize;
        this.pad;
        this.navMaxSize;

        this.onresiseTimeoutId;

        this.init();
        this.enableHandlers();
    }
    //
    enableHandlers() {
        this.elem.onresize = () => {
            this.getSizeAndOrientationWidow();
            this.setStyleSize();
            this.navObj.setElemStyle();
            if (this.onresiseTimeoutId) clearTimeout(this.onresiseTimeoutId);
            this.onresiseTimeoutId = setTimeout(() => {
                this.getElemSize();
                this.setElemStyleSize();
            }, 500);
        };
    }
    //
    getSizeAndOrientationWidow() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        if (this.width > this.height) {
            this.maxSize = this.width;
            this.minSize = this.height;
            this.orientation = 'landscape';
        } else {
            this.maxSize = this.height;
            this.minSize = this.width;
            this.orientation = 'portrait';
        }
    }
    setStyleSize() {
        document.querySelector('html').style.setProperty('--page-width', `${this.width}px`);
        document.querySelector('html').style.setProperty('--page-height', `${this.height}px`);
        this.elem.style.setProperty('--page-max-size', `${this.maxSize}px`);
        this.elem.style.setProperty('--page-min-size', `${this.minSize}px`);
    }
    getElemSize() {
        this.navElWidth = this.navElem.getBoundingClientRect().width;
        this.navElHeight = this.navElem.getBoundingClientRect().height;
        if(this.orientation == 'landscape') {
            this.navMaxSize = this.navElWidth;
        } else {
            this.navMaxSize = this.navElHeight;
        }
        // console.log(this.width, this.height, this.navElWidth, this.navElHeight);
    }
    setElemStyleSize() {
        const numberOfButtonInControlRow = 4,
            numberOfButtonInQuickNavRow = 5;
            // numberOfButtonInMainNavRow = 4,
            // numberOfButtonInMainNavCol = 6,
            // lumberOfLabelInMainNavCol = 2;

        this.pad = this.minSize / 2 * (numberOfButtonInQuickNavRow - numberOfButtonInControlRow) / (2 * numberOfButtonInQuickNavRow * numberOfButtonInControlRow + numberOfButtonInQuickNavRow - 3 * numberOfButtonInControlRow);

        let navMaxSize = this.navMaxSize - 3 * this.pad;
        if (this.navMaxSize <= this.maxSize) {
            this.elem.style.setProperty('--page-nav-show-pos', `${navMaxSize}px`);
        } else {
            this.elem.style.setProperty('--page-nav-show-pos', `${this.maxSize}px`);
        }
    }
    init() {
        this.getSizeAndOrientationWidow();
        this.setStyleSize();
        this.getElemSize();
        this.setElemStyleSize();
    }
}

class Nav {
    constructor(navElem, pageElem) {
        this.elem = navElem;
        this.pageElem = pageElem;

        this.listElemArr = this.elem.querySelectorAll('.nav__list');
        this.itemElemArr = [];
        for (let i = 0; i < this.listElemArr.length; i++) {
            this.itemElemArr[i] = this.listElemArr[i].querySelectorAll('.nav__item')
        }

        this.buttonElemArr = this.elem.querySelectorAll('.button');
        this.buttonObjArr = [];

        for (let i = 0; i < this.buttonElemArr.length; i++) {
            if (this.buttonElemArr[i].classList.contains('button--nav-show')) {
                this.buttonObjArr[i] = new ButtonShowNav(this.buttonElemArr[i], this.pageElem);
            }
            this.buttonObjArr[i] = new ButtonNav(this.buttonElemArr[i], this.pageElem);
        }

        this.init();
    }
    setElemStyle() {
        // this.pageElem.orientation
        this.pageElem.style.setProperty('--button-number-in-main-nav-row', 7);
    }
    init() {
        this.setElemStyle();
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