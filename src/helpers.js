const select = (selector) => {
    return document.querySelector(selector);
}

const refresh = (selector) => {
    const elem = select(selector);
    elem.innerHTML = "";
    return elem;
};

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

const showModalWindow = () => {
    const modalWindow = select(".modal-window");
    const modalShadow = select(".modal-shadow");
    modalWindow.style.zIndex = 3;
    modalWindow.style.opacity = 1;
    modalShadow.style.display = "block";
};

const hideModalWindow = () => {
    const modalWindow = select(".modal-window");
    const modalShadow = select(".modal-shadow");
    modalWindow.style.zIndex = -1;
    modalWindow.style.opacity = 0;
    modalShadow.style.display = "none";
};
