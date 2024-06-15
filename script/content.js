async function reverso(from, to, sentence) {
    try {
        const response = await fetch("https://api.reverso.net/translate/v1/translation", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                format: "text",
                from: from,
                to: to,
                input: sentence,
                options: {
                    sentenceSplitter: true,
                    origin: "translation.web",
                    contextResults: true,
                    languageDetection: true
                }
            })
        });
        const data = await response.json();
        return data["translation"][0];
    } catch (error) {
        console.error('Erreur:', error);
        throw error;
    }
}

function inject(botOn) {
    const site = window.location.href;
    if (site.includes('jetpunk.com/user-quizzes') && localStorage.getItem('botReady')=="true") {
        async function main() {
            lang = document.querySelector('html').lang;
            let cheat;
            if (lang != "fr") {
                cheat = await reverso('fr', lang, 'triche');
            } else {
                cheat = "triche";
            }

            cheat = cheat[0].toUpperCase() + cheat.slice(1);

            document.head.innerHTML += `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">`;
            document.getElementById('start-button-holder').style.paddingTop = "0px";

            let button = document.createElement('button');
            button.setAttribute('class', 'purple');
            button.setAttribute('title', `${cheat}`);
            button.setAttribute('style', "margin-top: 5px;}");
            button.setAttribute('onclick', "startScript();");

            let span = document.createElement('span');
            span.innerText = `${cheat}`;

            let i = document.createElement('i');
            i.setAttribute('class', "fa-solid fa-user-secret");
            i.setAttribute('style', "padding-left: 5px;");

            button.appendChild(span);
            button.appendChild(i);

            fetch('constructor.js')
                .then(data => data.text())
                .then(func => {
                    button.setAttribute('onclick', func + "getQuizName();startScript();");
                    document.getElementById('start-button-holder').appendChild(button);
                });
        }

        main();
    }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Message received in content script:", message);
    if (message.action === "set") {
        console.log("Message received in content script:", message);
        localStorage.setItem('botReady', "true");
        inject()
        
    }

    if (message.action === "noset") {
        console.log("Message received in content script:", message);
        localStorage.setItem('botReady', null);
        document.getElementById('start-button-holder').removeChild(document.querySelector("#start-button-holder > button:nth-child(2)"))
        
    }
    console.log(localStorage.getItem('botReady'))
});

console.log("Content script loaded and ready to receive messages.");

inject()