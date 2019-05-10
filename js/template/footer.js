import graphic from '/js/obj/graphic.js';
import Elem from '/js/class/elem.js';
import Nav from '/js/class/nav.js';

export default {
    5: {
        tag: 'footer',
        cssClass: ['footer'],
        objClass: Elem,
        children: [501]
    },
    501: {
        objClass: Nav,
        children: [5001, 5002, 5003, 5004, 5005, 5006, 5007, 5008, 5009, 5010, 5011, 5012]
    },
    5001: {
        graphic: graphic.system.children.light
    },
    5002: {
        graphic: graphic.system.children.heatFloor
    },
    5003: {
        graphic: graphic.system.children.heater
    },
    5004: {
        graphic: graphic.system.children.electric
    },
    5005: {
        graphic: graphic.system.children.valve
    },
    5006: {
        graphic: graphic.system.children.leak
    },
    5007: {
        graphic: graphic.system.children.video
    },
    5008: {
        graphic: graphic.system.children.security
    },
    5009: {
        graphic: graphic.system.children.sciene
    },
    5010: {
        graphic: graphic.system.children.setup
    }
};