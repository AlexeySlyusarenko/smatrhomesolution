import * as global from '/js/var/global.js';

export default class {
    constructor(elemContainer, templateObj, indexElementTemplateObj) {
        global.elementsObj[indexElementTemplateObj] = this;
        this.elemContainer = elemContainer;
        //
        this.templateCurrentObj = templateObj[indexElementTemplateObj];
        this.templateCurrentObjChildren = this.templateCurrentObj.children;
        //
        this.elem = this.initCreateElement(this.templateCurrentObj);
        this.elemVarStyle = this.initVarStyleElement();
        if (this.templateCurrentObjChildren && Array.isArray(this.templateCurrentObjChildren) && this.templateCurrentObjChildren.length > 0) {
            this.elChildren = this.templateCurrentObjChildren;
            this.initChildrenElements(this.elem, this.templateCurrentObjChildren, templateObj);
        }
    }
    initCreateElement(templateObj) {
        let elTag = templateObj.tag,
            elClass = templateObj.cssClass;

        return this.createCommonElement(this.elemContainer, elTag, elClass);
    }
    initVarStyleElement() {
        this.elVarStyle = '@import css';
        return this.createStyleElement(this.elem, this.elVarStyle);
    }
    initChildrenElements(elemContainer, childrenArr, templateObj) {
        for (let i = 0; i < childrenArr.length; i++) {
            new templateObj[childrenArr[i]].objClass(elemContainer, templateObj, childrenArr[i]);
        }
    }
    createCommonElement(elemContainer, elTag, elClass = [], elInnerHtml = false, elAttr = {}, insertPosition = 'last') {
        let el = document.createElement(elTag);
    
        for (let i = 0; i < elClass.length; i++) {
            el.classList.add(elClass[i]);
        }
        if (elInnerHtml) el.innerHTML = elInnerHtml;
        if (Object.keys(elAttr)[0]) el.setAttribute(Object.keys(elAttr)[0], elAttr[Object.keys(elAttr)[0]]);
        
        if (insertPosition == 'first') return elemContainer.insertBefore(el, elemContainer.children[0]);
        if (insertPosition != 'last') return elemContainer.insertBefore(el, elemContainer.children[insertPosition - 1]);
        return elemContainer.appendChild(el);
    }
    createSvgElement(elemContainer, elInnerHtml = false, elClass = []) {
        if (!elInnerHtml) return false;
        elemContainer.insertAdjacentHTML('beforeend', elInnerHtml);
        
        let el = elemContainer.lastElementChild;
    
        for (let i = 0; i < elClass.length; i++) {
            el.classList.add(elClass[i]);
        }
    
        return el;
    }
    createStyleElement(elemContainer, elInnerHtml = false) {
        let el = document.createElement('style');
    
        if (elInnerHtml) el.innerHTML = elInnerHtml;
        el.setAttribute('type', 'text/css');
        
        return elemContainer.appendChild(el);
    }
}