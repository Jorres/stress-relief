const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
}

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

const pulseRed = (elem) => {
    elem.style.animation = 'pulseRed 0.4s';
    setTimeout(() => {
        elem.style.animation = 'none';
    }, 400);
};

const updateDiaryEntry = (mood, date) => {
    let obj = {mood, date}; 
    let curData = JSON.parse(localStorage.getItem("diary-entries"));
    curData.push(obj);
    localStorage.setItem("diary-entries", JSON.stringify(curData));
};

const formatDate = () => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    const dateObj = new Date();
    const month = monthNames[dateObj.getMonth()];
    const day = String(dateObj.getDate()).padStart(2, '0');
    const year = dateObj.getFullYear();
    return month  + ' '+ day  + ', ' + year;
};

