import Nav from "../nav/nav.mjs";

class Page {
    constructor(pageElem) {
        //
        this.debugCount = 1;
        //
        this.elem = pageElem;
        this.trapElem = this.elem.querySelector('.page__trap');
        this.controlElem = this.elem.querySelector('.page__control');
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
        this.onresiseTimeoutId_2;

        this.init();
        this.enableHandlers();
    }
    //
    enableHandlers() {
        this.elem.onresize = () => {
            if (this.onresiseTimeoutId) clearTimeout(this.onresiseTimeoutId);
            if (this.onresiseTimeoutId_2) clearTimeout(this.onresiseTimeoutId);
            this.onresiseTimeoutId = setTimeout(() => {
                this.getSizeAndOrientationWidow();
                this.setStyleSize();
                this.debugMes();
                this.navObj.setElemStyle();
                this.onresiseTimeoutId_2 = setTimeout(() => {
                    this.getElemSize();
                    this.setElemStyleSize();
                }, 500)
            }, 300);
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
        const qntOfButtonInControlRow = 4,
            qntOfButtonInQuickNavRow = 5;
            // qntOfButtonInMainNavRow = 4,
            // qntOfButtonInMainNavCol = 6,
            // qntOfLabelInMainNavCol = 2;

        this.pad = this.minSize / 2 * (qntOfButtonInQuickNavRow - qntOfButtonInControlRow) / (2 * qntOfButtonInQuickNavRow * qntOfButtonInControlRow + qntOfButtonInQuickNavRow - 3 * qntOfButtonInControlRow);

        let navMaxSize = this.navMaxSize;
        if (this.navMaxSize <= this.maxSize) {
            this.elem.style.setProperty('--page-nav-show-pos', `${navMaxSize}px`);
        } else {
            this.elem.style.setProperty('--page-nav-show-pos', `${this.maxSize}px`);
        }

        window.scrollTo(0, 0);
    }
    init() {
        this.getSizeAndOrientationWidow();
        this.setStyleSize();
        this.getElemSize();
        this.setElemStyleSize();
    }
    //
    debugMes() {
        let pageDebug = this.elem.querySelector('.page__debug');

        pageDebug.textContent = `width: ${window.innerWidth}, height: ${window.innerHeight}
                                    count: ${this.debugCount}`;
        this.debugCount++;
    }
}

export default Page;