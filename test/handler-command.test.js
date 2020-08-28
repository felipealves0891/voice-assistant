import handlerCommandFactory from '../src/handler-command.js'

test('text to array', () => {
    let text = " O nome é Felipe Alves"
    let expected = ["O", "nome", "é", "Felipe", "Alves"]

    let handlerCommand = handlerCommandFactory().setCommandsWithText(text)
    expect(handlerCommand.getCommand()).toBe(expected)
})