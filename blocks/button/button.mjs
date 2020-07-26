// api 
//      show(container), remove()

class Button {
    constructor() {
        this.elem;
        this.value;

        this.style = {
            color: '#ce3000'
        };

        this.events = {
            pressStart: {
                state: false,
                time: 0,
                posX: undefined,
                posY: undefined,
                idTimeout: undefined
            },
            pressEnd: {
                state: false,
                time: 0,
                idTimeout: undefined
            },
            slide: {
                state: false,
                time: 0,
                posX: 0,
                posXstart: undefined,
                idTimeout: undefined
            },
            normal: {
                state: false
            },
            active: {
                state: false
            },
            disable: {
                state: false
            }
        };
    
        return this;
    }

    // dom
    create(id, classArr = [], icon = '', title = '', attr = {}) {
        let elemInnerHTML = '';

        this.elem = document.createElement('button');

        this.elem.id = id;

        this.elem.classList.add('button');
        if (Array.isArray(classArr)) {
            for (let i = 0; i < classArr.length; i++) {
                this.elem.classList.add(classArr[i]);
            }
        }
        this.elem.style.setProperty('--button-active-color', this.style.color);

        if(icon != '') {
            let iconButton = `<svg class="button__icon" viewbox="0 -12 24 48">${icon}</svg>`;

            elemInnerHTML = elemInnerHTML + iconButton;
        }

        if(title != '') {
            let titleButton = `<span class="button__title">${title}</span>`;

            elemInnerHTML = elemInnerHTML + titleButton;
        }

        if (attr instanceof Object) {
            for (let prop in attr) {
                this.elem.setAttribute(prop, attr[prop]);
            }
        }

        this.elem.innerHTML = elemInnerHTML;

        return this.elem;
    }
    show(container) {
        return container.appendChild(this.elem);
    }
    remove() {
        return this.elem.remove();
    }

    // events
    setNormal() {
        this.elem.classList.remove('button--active');
        this.events.normal.state = true;
        this.events.active.state = false;
    }
    setActive() {
        this.elem.classList.add('button--active');
        this.events.active.state = true;
        this.events.normal.state = false;
    }

    // event handlers 
    setHandlers() {
        this.elem.addEventListener('touchstart', (event) => {
            this.pressStart(event);
        });
        this.elem.addEventListener('touchend', (event) => {
            this.pressEnd(event);
        });
        this.elem.addEventListener('touchmove', (event) => {
            this.move(event);
        });
    }
    pressStart() { }
    pressEnd() { }
    move() { }
}

export {
    Button
}