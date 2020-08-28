'use strict';

function formFilling(document = {}) {

    let elementId

    function setId(id) {
        this.elementId = id
        return this
    }

    function getId() {
        return this.elementId
    }

    function setValueById(value) {
        let element = document.getElementById(this.elementId)
        if(!element){
            return false
        } 
        else {
            element.value = value
            return true
        }
    }

    function defineIdByLabel(label) {
        try{
            
            let elements = document.querySelectorAll("label")
            for (const key in elements) {
                let innerText = elements[key].innerText
                if(sanitize(label) == sanitize(innerText)){
                    this.elementId = elements[key].htmlFor
                    return this
                }
                    
            }
            return this

        }catch(ex) {
            console.log(ex)
        }
    }

    function sanitize(value) {
        return value.toLowerCase()
                    .replace(/[^\A-z1-9]/g, '')
    }

    return {
        sanitize,
        defineIdByLabel,
        setValueById,
        getId,
        setId
    }

} 

export default formFilling