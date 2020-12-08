const select = (selector) => {
    return document.querySelector(selector);
}

const createElem = (type, classes = [], content = "") => {
    const elem = document.createElement(type);
    for (let cls of classes) {
        elem.classList.add(cls);
    }
    elem.innerHTML = content;
    return elem;
};

const appendElem = (where, type, classes = [], content = "") => {
    const elem = createElem(type, classes, content); 
    where.appendChild(elem);
    return elem;
};
