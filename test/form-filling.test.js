import formFillingFactory from '../src/form-filling.js'

test('sanitize', () => {
    let sanitizedValue = formFillingFactory().sanitize("Nome:");
    let expected = "nome"
    expect(sanitizedValue).toBe(expected)
})

test("get input id by label", () => {
    let expected = "tName" 
    let mock = {
        querySelectorAll(selector) {
            console.log("[Mock] Passado o seletor " + selector)
            if(selector != "label") return []
            else return [
                {
                    innerText: "Nome:",
                    htmlFor: expected 
                }
            ]
        }
    }

    let formFilling = formFillingFactory(mock).defineIdByLabel("nome");
    expect(formFilling.getId()).toBe(expected)
})

test("set value by id", () => {
    let expected = "Felipe Alves"
    let mock = {
        element: {
            value: undefined
        },
        getElementById(id){
            if(id!="tName") return false
            else return this.element
        }
    }

    let input = formFillingFactory(mock)
                    .setId("tName")
                    .setValueById(expected);
                    
    expect(input).toBe(true)
    expect(mock.element.value).toBe(expected)
})