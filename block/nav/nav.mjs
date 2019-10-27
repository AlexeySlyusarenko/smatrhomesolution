// api 
//      show(), remove()

class Nav {
    constructor() {
        this.elem
    }

    show(container) {
        return container.appendChild(this.elem);
    }
    remove() {
        return this.elem.remove();
    }
}

export {
    Nav
}