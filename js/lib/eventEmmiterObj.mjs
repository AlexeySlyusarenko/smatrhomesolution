export default {
    constructor() {
        this.events = {};
    },
    on(type, cb) {
        if (!this.events[type]) {
            this.events[type] = [cb];
        } else {
            this.events[type].push(cb);
        }
    },
    emit(type, args) {
        if(this.events[type]) {
            for (let i; i < this.events[type].length; i++) {
                this.events[type][i](args);
            }
        }
    }
}