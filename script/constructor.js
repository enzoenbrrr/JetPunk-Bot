const supportedMode = ["text-game", "photo-game", "map-game", "mc-game"];

function getQuizName(){
    console.clear();
    var name = document.querySelector('.thumb-right h1').innerHTML;
    console.log(`Name of the quiz : ` + `%c${name}`, 'color:skyblue;');
    console.log(`Type : ` + `%c${_page['pageType']}`, 'color:skyblue;');
    if(supportedMode.indexOf(_page['pageType']) != -1){
        console.log(`Status : ` + `%cReady`, 'color:lightgreen;');
    }else{
        console.log(`Status : ` + `%cDoes not support this type.`, 'color:#FF6666;');
    }
    document.getElementById('start-button-holder').style.display = "block";
}

for(let i in document.querySelectorAll('.correct')){
    console.log(document.querySelectorAll('.correct')[i]['innerHTML']);
}

function startScript() {
    document.getElementById('start-button').click()
    if(_page['pageType']=='text-game'||_page['pageType']=='photo-game'){
        let wordsA = [];
        for(let i in _page['data']['quiz']['answers']){
            let uiui = _page['data']['quiz']['answers'][i]['display'];
            if(uiui.includes('{')){
                let regex = /{([^}]+)}/g;
                let motsEntreAccolades = [...uiui.matchAll(regex)].map(match => match[1]);
                wordsA.push(motsEntreAccolades);
            }else{
                wordsA.push(_page['data']['quiz']['answers'][i]['display']);
            }
        }

        if(_page['data']['quiz']['yellowBox'] != true){
            wordsA.sort(function(a, b) {
                return a.length - b.length;
            });
        }

        let motAChercher = "<br />";
        let nouveauMot = "";
        let motsModifies = wordsA.map(function(mot) {
            if (mot.includes(motAChercher)) {
                return mot.replace(motAChercher, nouveauMot);
            } else {
                return mot;
            }
        });
        let words = motsModifies;
        let input = document.getElementById('txt-answer-box');
        let i = 0;
        let score = 0;
        let interval = setInterval(function() {
            if (i < words.length) {
                let word = words[i];
                let answers = [];
                for(let p in document.querySelectorAll('.correct')){
                    answers.push(document.querySelectorAll('.correct')[p]['innerHTML']);
                }
                answers.splice(-7, 7);
                for (let t = 0; t < answers.length; t++) {
                    if (answers[t].includes("<br>")) {
                        answers[t] = answers[t].replace("<br>", "");
                    }
                }
                if(!answers.includes(word)){
                    for (let j = 0; j < word.length; j++) {
                        let event = new Event('keydown');
                        event.key = word[j];
                        input.dispatchEvent(event);
                        event = new Event('keypress');
                        event.key = word[j];
                        input.dispatchEvent(event);
                        input.value += word[j];
                        event = new Event('input', { bubbles: true });
                        input.dispatchEvent(event);
                        if(input.value==''){
                            break;
                        }
                    }
                }
                if(input.value!=''){
                    clearInterval(interval);
                    document.getElementsByClassName('red btn-sm give-up show-conditional show-active')[0].click();
                }
                i++;
            } else {
                clearInterval(interval);
                document.getElementsByClassName('red btn-sm give-up show-conditional show-active')[0].click();
            }
        }, 1);
    } else if(_page['pageType']=='map-game'){
        let wordsA = [];
        for(let i in _page['data']['quiz']['answers']){
            let uiui = _page['data']['quiz']['answers'][i]['display'];
            if(uiui.includes('{')){
                let regex = /{([^}]+)}/g;
                let motsEntreAccolades = [...uiui.matchAll(regex)].map(match => match[1]);
                wordsA.push(motsEntreAccolades);
            }else{
                wordsA.push(_page['data']['quiz']['answers'][i]['display']);
            }
        }

        if(_page['data']['quiz']['yellowBox'] != true){
            wordsA.sort(function(a, b) {
                return a.length - b.length;
            });
        }

        let motAChercher = "<br />";
        let nouveauMot = "";
        let motsModifies = wordsA.map(function(mot) {
            if (mot.includes(motAChercher)) {
                return mot.replace(motAChercher, nouveauMot);
            } else {
                return mot;
            }
        });
        let words = motsModifies;
        let i = 0;
        let interval2 = setInterval(function() {
            if (i < words.length) {
                let word = _page['data']['quiz']['answers'][i]['id'];
                document.getElementById(`map-answer-${word}`).click();
                i++;
            } else {
                clearInterval(interval2);
            }
        }, 1);
    } else if(_page['pageType']=='mc-game'){
        let elements = _page['data']['quiz']['answers'];
        for(let i=0; i< elements.length; i++){
            let id = elements[i]['correct'];
            document.getElementById(`mc-choice-button-${id}`).click();
        }
        document.getElementsByClassName('finish-mc')[0].click();
    }
}
