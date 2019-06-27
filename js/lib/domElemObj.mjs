export default {
    add(containerElem, tag, style = '', content = '', attr = {}) {
        let elem = document.createElement(tag);

        if(style != '') {
            elem.style = style;
        }
        if(content != '') {
            elem.textContent = content;
        }
        for (let prop in attr) {
            elem.setAttribute(prop, attr[prop]);
        }

        return containerElem.appendChild(elem);
    }
}