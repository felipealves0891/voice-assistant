import FormFillingFactory from './src/commands/form-filling.js'
import HandlerCommandFactory from './src/commands/handler-command.js'
import Assistent from './src/assistent.js'

    let execCommand = function(command) {
        FormFillingFactory(document)
                .defineIdByLabel(command.label)
                .setValueById(command.value)
    } 

    let onresult = function(text) {

        let commands = HandlerCommandFactory()
                            .setWordsWithText(text)
                            .isTalkingToMe()
                            .findCommandData()
                            .generateCommands()
                            .getCommands()
        
        console.log(commands)
        commands.map(execCommand)
    }

    let assistent = new Assistent(Assistent.getSpeechRecognition(), "pt-BR")
    assistent.result = onresult
    assistent.start()
