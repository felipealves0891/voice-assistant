
// Valida se o navegador tem suporte
let speechRecognition = window.SpeechRecognition ||
                        window.webkitSpeechRecognition ||
                        null; 

if(speechRecognition == null){
    console.log("Browser not supported!")
}else{
    
    let assistant = {}

    assistant.fill = {
        inputId: "",
        sanitizeText: function sanitizeText(text) {
            return text.toLowerCase()
                        .replace(/[^\A-z1-9]/g, '')
        },
        getInputIdByLabel: function getInputIdByLabel(searchText) {
            const labels = document.querySelectorAll("label");
            searchText = this.sanitizeText(searchText);
            for (let i = 0; i < labels.length; i++) {
                const innerText = this.sanitizeText(labels[i].innerText);
                if(searchText == innerText){
                    this.inputId = labels[i].htmlFor
                }
            }
            return this
        },
        setValue: function setValue(value) {
            let elem = document.getElementById(this.inputId)
            if(!elem)
                return false

            elem.value = value
            return true
        }
    }

    assistant.bot = {
        text: "",
        setText: function (newText) {
            assistant.bot.text = newText.trim()
            return assistant.bot
        },
        textToArray: function () {
            assistant.bot.text = assistant.bot.text.split(' ')
            return assistant.bot
        },
        convert: function () {
            let words = assistant.bot.text;
            if(words[0] != "vi")
                return {}
                
            words.splice(1)
                .map((item) => item.trim())
                .reduce(assistant.bot.commands)
                .map(assistant.bot.construct)
                .map(assistant.bot.fill)
        },
        commands: function (accumulator, current) {
            let isArticle = accumulator == "o" || accumulator == "a";
            if(isArticle) {
                accumulator = [[]]
            }

            if(typeof accumulator != 'object'){
                let value = accumulator
                accumulator = [[value]]
            }

            if(current == "e"){
                return accumulator
            }

            if(current == "o" || current == "a") {
                let index = accumulator.length
                accumulator[index] = accumulator[0]
                accumulator[0] = []
                return accumulator
            }

            accumulator[0].push(current)
            return accumulator
        },
        construct: function (item) {
            return {
                label: item[0],
                text: item.splice(2).join(' ')
            }
        },
        fill: function (item) {
            assistant.fill.getInputIdByLabel(item.label)
                    .setValue(item.text)
        }
    }

    assistant.capture = {
        v2fAudioStart: null,
        init: function () {
            if(assistant.capture.v2fAudioStart == null){
                assistant.capture.v2fAudioStart = document.querySelector(".v2f-audio-start")
            }
        },
        getSoundstart: function () {
            assistant.capture.init();
            assistant.capture.v2fAudioStart.setAttribute("style", "display:inline-table;")
        },
        getSoundend: function () {
            assistant.capture.init();
            assistant.capture.v2fAudioStart.setAttribute("style", "display:none;")
        },
        getSpeechstart: function () {
            assistant.capture.init();
            assistant.capture.v2fAudioStart.setAttribute("style", "display:inline-table; background-color: #c83232;")
        },
        getSpeechend: function () {
            assistant.capture.init();
            assistant.capture.v2fAudioStart.setAttribute("style", "display:none; background-color: none;")
        },
        getResult: function getResult(event) {
            let content = assistant.capture.getContent(event.results);
            console.log(content)
            assistant.bot.setText(content)
                    .textToArray()
                    .convert();
        },
        getContent: function (result) {
            let content = "";
            for (var i = 0; i < result.length; i++) {
                if(result[i].isFinal){
                    content = result[i][0].transcript;
                }else{
                    content += result[i][0].transcript;
                }
            }
            return content;
        }
    }

    assistant.recognition = new speechRecognition();
    assistant.recognition.lang = "pt-BR"
    assistant.recognition.continuous = true
    assistant.recognition.onresult = assistant.capture.getResult
    assistant.recognition.onsoundstart = assistant.capture.getSoundstart
    assistant.recognition.onsoundend = assistant.capture.getSoundend
    assistant.recognition.onspeechstart = assistant.capture.getSpeechstart
    assistant.recognition.onspeechend = assistant.capture.getSpeechend


    try{
        assistant.recognition.start()
    }catch(ex){
        console.error(ex);
    }

}
