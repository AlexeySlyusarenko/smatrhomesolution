import graphic from '/js/obj/graphic.js';
import Elem from '/js/class/elem.js';
import Nav from '/js/class/nav.js';

export default {
    1: {
        tag: 'header',
        cssClass: ['header'],
        objClass: Elem,
        children: [101]
    },
    101: {
        objClass: Nav,
        children: [1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009]
    },
    1001: {
        graphic: graphic.place.firstFloor.children.bedroom
    },
    1002: {
        graphic: graphic.place.firstFloor.children.bathroom
    },
    1003: {
        graphic: graphic.place.firstFloor.children.wc
    },
    1004: {
        graphic: graphic.place.firstFloor.children.hall
    },
    1005: {
        graphic: graphic.place.firstFloor.children.kitchen
    },
    1006: {
        graphic: graphic.place.firstFloor.children.diningroom
    },
    1007: {
        graphic: graphic.place.firstFloor.children.loungroom
    },
    1008: {
        graphic: graphic.place.firstFloor.children.wardrobe
    },
    1009: {
        graphic: graphic.place.firstFloor.children.balkony
    }
};