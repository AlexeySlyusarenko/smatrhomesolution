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

        this.setTimeoutId;

        this.init();
        this.enableHandlers();
    }
    //
    enableHandlers() {
        this.elem.onresize = () => {
            this.getSizeAndOrientation();
            this.setStyleSize();
            if (this.setTimeoutId) clearTimeout(this.setTimeoutId);
            this.setTimeoutId = setTimeout(() => {
                this.getElemSize();
                this.setElemStyleSize();
            }, 500);
        };
    }
    //
    getSizeAndOrientation() {
        this.width = this.elem.getBoundingClientRect().width;
        this.height = this.elem.getBoundingClientRect().height;
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
        this.getSizeAndOrientation();
        this.setStyleSize();
        this.getElemSize();
        this.setElemStyleSize();
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