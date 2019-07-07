import View from './view.mjs';
import Model from './model.mjs';
import Controller from './controller.mjs';

const pageView = new View(document.body),
    pageModel = new Model();
    
new Controller(pageView, pageModel);
