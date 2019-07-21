export default class EventEmmiter {
    constructor(events = {}) {
        this.events = events;
    }
    on(eventStr, cbFunc) {
        if (this.events[eventStr]) {
            return this.events[eventStr].cb.push(cbFunc) - 1;
        } else {
            return -1;
        }
    }
    remove(eventStr, cbFuncIndex) {
        if (this.events[eventStr] && cbFuncIndex < this.events[eventStr].cb.length) {
            this.events[eventStr].cb.splice(cbFuncIndex, 1);

            return 0;
        } else {
            return -1;
        }
    }
    emit(eventStr) {
        if(this.events[eventStr]) {
            for (let i; i < this.events[eventStr].cb.length; i++) {
                this.events[eventStr].cb[i]();
            }
        }
    }
}