import handlerCommandFactory from '../src/commands/handler-command.js'

test('set words with text', () => {
    let text = " O nome é Felipe Alves"
    let expected = ["O", "nome", "é", "Felipe", "Alves"]

    let handlerCommand = handlerCommandFactory().setWordsWithText(text)
    let actual = handlerCommand.getWords()
    expect(actual).toStrictEqual(expected)
})

test('is talking to me', () => {
    let words = ["vi", "o", "nome", "é", "Felipe", "Alves"]
    let expected = true

    let actual = handlerCommandFactory()
                                    .setWords(words)
                                    .isTalkingToMe()
                                    .isActive()

    expect(actual).toBe(expected)

})

test('find command data', () => {
    let words = ["vi", "o", "nome", "é", "Felipe", "Alves", "e", "o", "documento", "é", "123456789"]
    let expectedData = [["documento", "é", "123456789"], ["nome", "é", "Felipe", "Alves"]]

    let data = handlerCommandFactory()
                                    .findCommandData(words)
                                    .getData();

    expect(data).toStrictEqual(expectedData)
})

test('generate commands', () => {
    let data = [["documento", "é", "123456789"], ["nome", "é", "Felipe", "Alves"]]
    let expectedCommands = [{label: "documento", value: "123456789"}, {label: "nome", value: "Felipe Alves"}]

    let commands = handlerCommandFactory()
                                    .generateCommands(data)
                                    .getCommands();

    expect(commands).toStrictEqual(expectedCommands)

})