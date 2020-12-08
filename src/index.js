const clearContent = () => {
    const content = select(".content"); 
    content.innerHTML = "";
    return content;
};

const getTasks = () => {
    return JSON.parse(localStorage.getItem("test-tasks"));
};

const updateTasks = (taskHolder, task) => {
    const tasks = getTasks();    
    tasks.push(task);
    localStorage.setItem("test-tasks", JSON.stringify(tasks));
    renderTasks(taskHolder);
};

let lastOrder = 0;

const renderTasks = (taskHolder) => {
    const backgroundColors = ["#e97e40","#a5d1e7", "#f4dd65", "#86c753", "#6fa0b2", "#e6bfb9"];
    taskHolder.innerHTML = "";
    getTasks().forEach((taskData, i) => {
        const task = appendElem(taskHolder, "div", ['task-block']);
        appendElem(task, "p", ['task-name'], taskData.name);
        appendElem(task, "p", ['task-progress'], taskData.progress);
        task.style.backgroundColor = backgroundColors[i % backgroundColors.length];
        task.addEventListener("click", () => {
            task.style.backgroundColor = "green"; 
            task.style.order = ++lastOrder;
        })
    });
};

const initHome = () => {
    const content = clearContent();
    appendElem(content, "p", ['slight-header'], "Dashboard");
    appendElem(content, "p", [], "Tuesday 08 December 2020");
    const hiBlock = appendElem(content, "div", ["hi-block"]);
    appendElem(hiBlock, "p", ["slight-header"], "Hi, " + localStorage.getItem("userName"));
    appendElem(hiBlock, "p", ["gray-text"], "Plan your days to be more productive");
    appendElem(hiBlock, "p", ["gray-text"], "We created some tasks for you, have a look!");

    const taskHolder = createElem("div", ['task-holder']);
    renderTasks(taskHolder);
    content.appendChild(taskHolder);

    const taskAdder = appendElem(content, "div", ['task-adder']);
    const addTask = appendElem(taskAdder, "div", ['task-block', 'task-add']);
    appendElem(addTask, "p", ['task-prompt'], "Give your new task a name!");
    const taskNameInput = appendElem(addTask, "input", ['task-name-input']);
    const addTaskButton = appendElem(addTask, "div", ['action-button'], "Create new task!");
    addTaskButton.addEventListener("click", () => {
        let name = taskNameInput.value;
        updateTasks(taskHolder, {
            name: name,
            progress: "none yet"
        });
    });
};

const initGraph = () => {
    const content = clearContent();
};

const initWorldCloud = () => {
    localStorage.setItem("words", "");

    const content = clearContent();
    appendElem(content, "p", ['slight-header'], "Word Cloud");
    appendElem(content, "p", ['gray-text'], "Enter a new word for your word cloud!");
    const wordInput = appendElem(content, "input", ['input-general']);
    const wordButton = appendElem(content, "div", ['action-button'], "Add a word!");
    wordButton.addEventListener("click", () => {
        updateWordCloud(wordInput.value);
        wordInput.value = "";
        console.log(localStorage.getItem("words"));
    });

    const generateButton = appendElem(content, "div", ['action-button'], "Generate cloud!");
    const wordCloudWrapper = appendElem(content, "div", ['word-cloud-wrapper']);
    const wordCloudImage = appendElem(wordCloudWrapper, "img", ['word-cloud-image'], "");

    generateButton.addEventListener("click", () => {
        getPicture(wordCloudWrapper, wordCloudImage);
    });
};

const initTest = () => {
    const content = clearContent();
};

const initAbout = () => {
    const content = clearContent();
    const articleContent = [
        "Not surprisingly, the coronavirus pandemic and resulting economic \
         downturn have taken a toll on the mental health of adults of all ages \
         in the U.S. In July, a majority of U.S. adults 18 and older (53%) said \
         that worry and stress related to coronavirus has had a negative impact on \
         their mental health.",
        "This is why we created Mental Health - a lightweight and efficient mood \
         tracker, advisor and general motivation keeper for you to get through the \
         pandemic."
    ]

    appendElem(content, "p", ['slight-header'], 
        "One in Four Older Adults Report Anxiety or Depression Amid the COVID-19 Pandemic");

    articleContent.forEach(text => {
        appendElem(content, "p", ['about-text'], text);    
    });
};

const initNavigation = () => {
    const buttons = ['home', 'graph', 'world-cloud', 'test', 'about'];
    const buttonTexts = ['Home', 'Graph', 'World Cloud', 'Test', 'About'];
    const initers = [initHome, initGraph, initWorldCloud, initTest, initAbout];
    const buttonsContainer = select(".nav-buttons-container");    

    buttons.forEach((button, i) => {
        let curButton = createElem("div", ['nav-button', button], buttonTexts[i]);
        curButton.addEventListener("click", initers[i]);
        buttonsContainer.appendChild(curButton);
    });
};

const initProfile = (username) => {
    const profile = select(".profile");
    profile.innerHTML = "";

    appendElem(profile, "p", ['profile__title'], "My profile");    
    const pictureWrapper = createElem("div", ['profile__avatar-wrapper']);
    const picture = createElem("img", ['profile__avatar-picture']);
    picture.setAttribute('src', '../img/circle-avatar.png');
    pictureWrapper.appendChild(picture);
    profile.appendChild(pictureWrapper);
    appendElem(profile, "p", ['profile__username'], username);
};

const register = (name, age) => {
    localStorage.setItem("userName", name);
    localStorage.setItem("userAge", age);
    initNavigation();
    initHome();
    initProfile(name);
};

const initWelcomePage = () => {
    const content = select('.content'); 
    content.innerHTML = "";
    const buttonsContainer = select(".nav-buttons-container");    
    buttonsContainer.innerHTML = "";

    appendElem(content, "p", ['slight-header'], "Greetings! Please, introduce yourself");
    appendElem(content, "p", [], "What is your name?");
    const nameInput = appendElem(content, "input", ['input-general'], "");
    appendElem(content, "p", [], "How old are you, dear?");
    const ageInput = appendElem(content, "input", ['input-general'], "");

    const registerButton = appendElem(content, "div", ['action-button'], "Let's get going!");
    registerButton.addEventListener("click", () => {
        register(nameInput.value, ageInput.value);
    })
};

const init = () => {
    let userName = localStorage.getItem('userName');
    if (!userName) {
        initProfile("Who are you?");
        initWelcomePage();
    } else {
        initNavigation();
        initProfile(userName);
        initHome();
    }
    let tasks = [{
        name: "Steps",
        progress: "80%",
    }, {
        name: "Healthy diet",
        progress: "2 out of 3 meals",
    }, {
        name: "Jogging",
        progress: "2km more today!",
    }];

    localStorage.setItem("test-tasks", JSON.stringify(tasks));

    document.querySelector(".logout-wrapper").addEventListener("click", () => {
        localStorage.setItem("userName", null); 
        localStorage.setItem("words", null); 
        localStorage.setItem("userAge", null); 
        localStorage.setItem("test-tasks", JSON.stringify(tasks)); 
        initWelcomePage();
    });
};

document.addEventListener("DOMContentLoaded", init);
