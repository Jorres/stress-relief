const WORD_CLOUD_API_KEY = "6f55d1c186msh76d74ffdc9d7f64p152c91jsn1375ff010c49";

const updateWordCloud = (word) => {
    let words = localStorage.getItem("words"); 
    words += " " + word;
    localStorage.setItem("words", words);
};

const getPicture = (pictureWrapper, pictureElem) => {
    console.log(localStorage.getItem("words"));
    fetch("https://textvis-word-cloud-v1.p.rapidapi.com/v1/textToCloud", {
        method: "POST",
        headers: {
            "x-rapidapi-host": "textvis-word-cloud-v1.p.rapidapi.com",
            "x-rapidapi-key": WORD_CLOUD_API_KEY,
            "content-type": "application/json",
            accept: "application/json"
        },
        body: JSON.stringify({
            text:
            localStorage.getItem("words"),
            scale: 1,
            width: pictureWrapper.offsetWidth,
            height: pictureWrapper.offseHeight,
            colors: ["#375E97", "#FB6542", "#FFBB00", "#3F681C"],
            font: "Tahoma",
            use_stopwords: true,
            language: "en",
            uppercase: false
        })
    })
        .then(response => {
            return response.text();
        })
        .then(wordCloud => {
            console.log(wordCloud);
            pictureElem.src = wordCloud;
        })
        .catch(err => {
            console.log(err);
        });
};
