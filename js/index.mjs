import View from './view/view.mjs';
import Model from './model/model.mjs';
import Controller from './controller/controller.mjs';

const pageView = new View(document.body),
    pageModel = new Model();
    
new Controller(pageView, pageModel);
