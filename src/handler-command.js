'use strict';

function handlerCommand() {
    
    let command = []

    function getCommand() {
        return this.command
    }

    function setCommandsWithText(text) {
        this.command = text.trim().split(' ')
        return this
    }

    return {
        getCommand,
        setCommandsWithText
    }

}

export default handlerCommand
