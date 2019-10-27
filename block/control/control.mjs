// api 
//      show(container), remove()
//      addItems(elemArr), removeItems()

class Control {
    constructor(id) {
        this.elem;

        this.create(id);
    }

    create(id) {
        this.elem = document.createElement('ul');
        this.elem.id = id;
        this.elem.classList.add('control');

        this.itemElem = [];

        return this.elem;
    }
    show(container) {
        return container.appendChild(this.elem);
    }
    remove() {
        return this.elem.remove();
    }

    addItems(elemArr) {
        for(let i = 0; i < elemArr.length; i++) {
            this.itemElem[i] = document.createElement('li');
            this.itemElem[i].classList.add('control__item');

            this.itemElem[i].appendChild(elemArr[i]);

            this.elem.appendChild(this.itemElem[i]);
        }
    }
    removeItems() {
        this.itemElem = [];
        this.elem.innerHTML = '';
    }
}

export {
    Control
}