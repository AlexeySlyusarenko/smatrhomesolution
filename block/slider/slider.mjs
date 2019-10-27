// api 
//      show(container), remove()
//      rollLeft(elem), rollRight(elem)

class Slider {
    constructor(id = '') {
        this.elem;
        this.listElem;

        this.create(id);
    }

    // dom
    create(id) {
        this.elem = document.createElement('div');
        this.elem.id = id;
        this.elem.classList.add('slider');

        this.listElem = document.createElement('div');
        this.listElem.classList.add('slider__list');
        this.elem.appendChild(this.listElem);

        return this.elem;
    }
    show(container) {
        return container.appendChild(this.elem);
    }
    remove() {
        return this.elem.remove();
    }

    addItem(elem) {
        this.listElem.appendChild(elem);
    }
    removeItem() {
        this.listElem.innerHTML = '';
    }

    rollLeft(elem) {
        if (!elem.nodeType) return -1;

        let listTempElem = document.createElement('div');

        listTempElem.classList.add('slider__list', 'slider__list--right');
        listTempElem.appendChild(elem);
        this.elem.appendChild(listTempElem);

        setTimeout(() => {
            this.listElem.classList.add('slider__list--left');
            listTempElem.classList.remove('slider__list--right');
        }, 50);

        setTimeout(() => {
            [this.listElem, listTempElem] = [listTempElem, this.listElem];
            listTempElem.remove();
        }, 500);
    }
    rollRight(elem) {
        if (!elem.nodeType) return -1;

        let listTempElem = document.createElement('div');

        listTempElem.classList.add('slider__list', 'slider__list--left');
        listTempElem.appendChild(elem);
        this.elem.appendChild(listTempElem);

        setTimeout(() => {
            this.listElem.classList.add('slider__list--right');
            listTempElem.classList.remove('slider__list--left');
        }, 50);

        setTimeout(() => {
            [this.listElem, listTempElem] = [listTempElem, this.listElem];
            listTempElem.remove();
        }, 500);
    }
}

export {
    Slider
}