lang = [
    "Activate your robot in one click.",
    "Your extension is activated.",
    "Activate",
    "Deactivate"
]

function botOn(){
    if(localStorage.getItem('botOn') == 'true'){
        document.querySelector('button').classList.add('b-button')
        document.querySelector('button').classList.remove('a-button')
        document.querySelector('div').innerText = lang[1]
        document.querySelector('button').innerText = lang[3]
    }else{
        document.querySelector('button').classList.remove('b-button')
        document.querySelector('button').classList.add('a-button')
        document.querySelector('div').innerText = lang[0]
        document.querySelector('button').innerText = lang[2]
    }
}

botOn()

function changeSettings() {
    if (localStorage.getItem('botOn') == 'true') {
        localStorage.setItem('botOn', 'false');
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length === 0) {
                console.error("No active tabs found.");
                return;
            }
            chrome.tabs.sendMessage(tabs[0].id, { action: "noset" }, (response) => {
                if (chrome.runtime.lastError) {
                    console.error("Error sending message to content script:", chrome.runtime.lastError);
                } else {
                    console.log("Message sent successfully to content script.");
                }
            });
        });
    } else {
        localStorage.setItem('botOn', 'true');
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length === 0) {
                console.error("No active tabs found.");
                return;
            }
            chrome.tabs.sendMessage(tabs[0].id, { action: "set" }, (response) => {
                if (chrome.runtime.lastError) {
                    console.error("Error sending message to content script:", chrome.runtime.lastError);
                } else {
                    console.log("Message sent successfully to content script.");
                }
            });
        });
    }
    
    
    botOn();
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('btn').addEventListener('click', function() {
        changeSettings();
    });
});
