import color from '/js/obj/color.js';
import Dom from '/js/class/dom.js';
import Elem from '/js/class/elem.js';

export default class extends Dom {
    constructor(elemContainer, templateObj, indexElementTemplateObj) {
        super(elemContainer, templateObj, indexElementTemplateObj);
    }
    initObj() {
        this.logoObj = {};
        for (let key in system) {
            for (let i in system[key]) {
                if (system[key][i].load) this.logoObj[i] = system[key][i];
            }
        }
        this.logoArr = this.objToSortArr(this.logoObj);
        this.elemStyle = '@import from /css/load/var';
        this.angelOfRotationLogo = 2 * 3.14 / (this.logoArr.length);
        this.radiusOfRotationLogo = 100;
        
        for (let i = 0; i < this.logoArr.length; i++) {
            this.elemAddStyle = `.load__logo:nth-child(${i + 2}){fill:#${this.logoArr[i].color};transform:translate3d(${(Math.sin(this.angelOfRotationLogo * i) * this.radiusOfRotationLogo).toFixed(1)}px,${(Math.cos(this.angelOfRotationLogo * i) * this.radiusOfRotationLogo).toFixed(1)}px,0);animation-delay:${(i * .2).toFixed(1)}s}`;
            this.elemStyle = this.elemStyle + this.elemAddStyle;
            elem.createSvgElement(this.container, this.logoArr[i].icon, 'load__logo');
        }
        elem.createCommonElement(this.container, this.logoMain, 'load__logo-main');
        elem.createDomElement(this.container, 'style', false, this.elemStyle, { type: 'text/css' }, true);
    }
    initChildrenElements(elemContainer, arrChildren) {
        for (let i = 0; i < arrChildren.length; i++) {
            this.createSvgElement(elemContainer, elInnerHtml = false, elClass = []);
        }
    }
    //
    objToSortArr(obj) {
        let sortArr = [];
    
        for (let key in obj) {
            sortArr.push(obj[key]);
        }

        return sortArr.sort((a, b) => {
            return color.compareCss(a.color, b.color);
        });
    }
    //
    show() {
        this.container.classList.add('load--show');
    }
    hide() {
        this.container.classList.remove('load--show');
    }
}