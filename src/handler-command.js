'use strict';

function handlerCommand() {

    let name = "vi"
    
    let words = []

    let withMe = false

    let data = []

    let commands = []

    function getWords() {
        return words
    }

    function isActive() {
        return withMe
    }

    function getData() {
        return data
    }

    function getCommands() {
        return commands
    }

    function setWords(value) {
        if(typeof value == 'object')
            words = value

        return this
    }
    
    function setWordsWithText(text) {
        words = text.trim().split(' ')
        return this
    }
    
    function isTalkingToMe() {
        withMe = words[0].toLowerCase() == name
        return this
    }

    function findCommandData(listWords) {
        words = listWords || words
        if(!withMe && words == [])
            return this
        
        data = words.splice(1).reduce(reduceWords)
        return this
    }

    function reduceWords(accumulator, current) {
        if(accumulator == "o" || accumulator == "a")
            accumulator = [[]]

        if(typeof accumulator != 'object')
            accumulator = [[accumulator]]
            
        if(current == "e")
            return accumulator
            
        if(current == "o" || current == "a") {
            let i = accumulator.length
            accumulator[i] = accumulator[0]
            accumulator[0] = []
            return accumulator
        }

        accumulator[0].push(current)
        return accumulator
    }

    function generateCommands(dataCommands) {
        data = dataCommands || data
        if(!dataCommands && !withMe)
            return this

        commands = data.map(mapData)
        return this
    }

    function mapData(item) {
        let label = []
        let value = []
        let isValue = false

        for (let i = 0; i < item.length; i++) {
            if(item[i] == "é"){
                isValue = true
                continue
            }

            if(!isValue)
                label.push(item[i])
            else
                value.push(item[i])
        }

        return {
            label: label.join(' '),
            value: value.join(' ')
        }
    }

    return {
        getWords,
        getData,
        getCommands,
        isActive,
        setWords,
        setWordsWithText,
        isTalkingToMe,
        findCommandData,
        generateCommands
    }

}

export default handlerCommand
