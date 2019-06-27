export default class Model {
    constructor() {
        this.controlButtonObj = {
            123: {
                id: '123',
                state: '',
                value: '',
                template: ''
            }
        };
        this.showControlButtonArr = [];
        this.showQuickNavButtonArr = [];
        this.showFilterNavButtonArr = [];
        this.showPlaceNavButtonArr = [];
        this.showSystemNavButtonArr = [];
    }
    getIdQuickNavButton() {
        return this.showQuickNavButtonArr;
    }
    setIdQuickNavButton(id) {
        return arr.push(id);
    }
    remove(arr, id) {
        return arr.push(id);
    }
}