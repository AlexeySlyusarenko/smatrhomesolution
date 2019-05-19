import * as global from '/js/var/global.js';

export default function (elemContainer, templateObj) {
    for (let indexElementTemplateObj in templateObj) {
        if (templateObj[indexElementTemplateObj].objClass) {
            new templateObj[indexElementTemplateObj].objClass(elemContainer, templateObj, indexElementTemplateObj);
        }
    }
}