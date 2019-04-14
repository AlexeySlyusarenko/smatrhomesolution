import graphic from '/js/obj/graphic.js';
import Load from '/js/class/load.js';

export default {
    2: {
        tag: 'div',
        cssClass: ['load'],
        objClass: Load,
        children: [201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212]
    },
    201: {
        graphic: graphic.misc.children.home,
    },
    202: {
        graphic: graphic.system.children.light
    },
    203: {
        graphic: graphic.system.children.heatFloor
    },
    204: {
        graphic: graphic.system.children.heater
    },
    205: {
        graphic: graphic.system.children.cooler
    },
    206: {
        graphic: graphic.system.children.electric
    },
    207: {
        graphic: graphic.system.children.vent
    },
    208: {
        graphic: graphic.system.children.valve
    },
    209: {
        graphic: graphic.system.children.leak
    },
    210: {
        graphic: graphic.system.children.video
    },
    211: {
        graphic: graphic.system.children.security
    },
    212: {
        graphic: graphic.system.children.sciene
    }
};