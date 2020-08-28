import formFillingFactory from './src/form-filling.js'
import handlerCommand from './src/handler-command.js'

// Valida se o navegador tem suporte
let speechRecognition = window.SpeechRecognition ||
                        window.webkitSpeechRecognition ||
                        null; 

if(speechRecognition == null){
    console.log("Browser not supported!")
}else{
    
    let assistant = {}

    assistant.fill = formFillingFactory(document)

    assistant.bot = handlerCommand()

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
            
            let commands = assistant.bot.setWordsWithText(content)
                                        .isTalkingToMe()
                                        .findCommandData()
                                        .generateCommands()
                                        .getCommands()
            console.log(commands)

            commands.map((command) => {
                assistant.fill.defineIdByLabel(command.label)
                              .setValueById(command.value)
            })

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
