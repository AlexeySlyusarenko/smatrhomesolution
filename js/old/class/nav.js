import Dom from '/js/class/dom.js';

export default class extends Dom{
    constructor(elemContainer, templateObj, indexElementTemplateObj) {
        super(elemContainer, templateObj, indexElementTemplateObj);

        
    }
    initCreateElement() {
        let elTag = 'ul',
            elClass = 'nav';

        return this.createCommonElement(this.elemContainer, elTag, elClass);
    }
    initChildrenElements(elemContainer, childrenArr, templateObj) {
        for (let i = 0; i < childrenArr.length; i++) {
            let elGraphicDesc = templateObj[childrenArr[i]].graphic;

            let elemItemContainer = this.createCommonElement(elemContainer, 'li', ['menu__item', 'active']);

            this.createSvgElement(elemItemContainer, elGraphicDesc.icon, 'menu__img');
            this.createCommonElement(elemItemContainer, 'div', 'menu__text', elGraphicDesc.title);
        }
    }
}