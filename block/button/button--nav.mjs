import {
    Button
 } from "./button.mjs";

class SwitchNavButton extends Button {
    constructor(id, icon = '', title = '', attr = {}) {
        super();

        this.create(id, ['button--nav', 'button--switch'], icon, title, attr);
        this.setHandlers();
    }
    pressStart(event) {
        if (this.events.disable.state) return 0;

        this.events.pressStart.state = true;
        this.events.pressStart.posX = event.touches[0].clientX;
        this.events.pressStart.posY = event.touches[0].clientY;
    }
    pressEnd() {
        if (this.events.pressStart.state) {
            if (this.events.active.state == true) {
                this.setNormal();
            } else {
                this.setActive();
            }
        }
        this.events.pressStart.state = false;
        this.events.slide.state = false;
        this.events.pressEnd.state = true;
    }
    move(event) {
        if (!this.events.pressStart.state) return 0;

        let dX = this.events.pressStart.posX - event.touches[0].clientX,
            dY = this.events.pressStart.posY - event.touches[0].clientY;

        if (Math.abs(dY) > 10 || Math.abs(dX) > 10) {
            this.events.pressStart.state = false;
            this.pressEnd();
        }
    }
}

class PushNavButton extends SwitchNavButton {
    constructor(id, icon = '', title = '', attr = {}) {
        super(id, icon, title, attr);
    }
    pressEnd() {
        if (this.events.pressStart.state) {
            this.setActive();
            setTimeout(() => {
                this.setNormal();
            }, 300);
        }
        this.events.pressStart.state = false;
        this.events.slide.state = false;
        this.events.pressEnd.state = true;
    }
}

export {
    SwitchNavButton,
    PushNavButton
}