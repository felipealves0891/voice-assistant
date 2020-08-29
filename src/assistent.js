import HandlerResultFactory from './handlers/handler-result.js'
import HandlerEventFactory from './handlers/handler-event.js'

class Assistent {

    constructor(speechRecognition, lang) {
        if(!speechRecognition) {
            speechRecognition = getSpeechRecognition()
            if(speechRecognition)
                throw new Error("Navegador não suportado")
        }

        this.speechRecognition = new speechRecognition()
        this.speechRecognition.lang = lang
        this.speechRecognition.continuous = true   
        this.status = false    
        this.observersInitiated = false
        this.events = []
    }

    /**
     * 
     * Disparado quando o serviço de reconhecimento de fala retorna um resultado - 
     * uma palavra ou frase foi reconhecida positivamente e isso foi comunicado de volta ao aplicativo.
     */
    set result(callback) {
        if(!this.events['onresult'])
            this.events['onresult'] = []

        this.events['onresult'].push(callback)
    }

    /**
     * 
     * Disparado quando qualquer som - fala reconhecível ou não - é detectado.
     */
    set soundStart(callback) {
        if(!this.events['onsoundstart'])
            this.events['onsoundstart'] = []

        this.events['onsoundstart'].push(callback)
    }
    
    /**
     * 
     * Disparado quando qualquer som - fala reconhecível ou não - para de ser detectado.
     */
    set soundEnd(callback) {
        if(!this.events['onsoundend'])
            this.events['onsoundend'] = []

        this.events['onsoundend'].push(callback)
    }
    
    /**
     * 
     * Disparado quando um som que é reconhecido 
     * pelo serviço de reconhecimento de fala como fala foi detectado
     */
    set speechStart(callback) {
        if(!this.events['onspeechstart'])
            this.events['onspeechstart'] = []

        this.events['onspeechstart'].push(callback)
    }
    
    /**
     * 
     * Disparado quando a fala reconhecida pelo serviço de 
     * reconhecimento de fala deixa de ser detectada.
     */
    set speechEnd(callback) {
        if(!this.events['onspeechend'])
            this.events['onspeechend'] = []

        this.events['onspeechend'].push(callback)
    }

    start() {
        
        this.speechRecognition.onresult = HandlerResultFactory(this.events['onresult'])
        this.speechRecognition.onspeechstart = HandlerEventFactory(this.events['onspeechstart'])
        this.speechRecognition.onspeechend = HandlerEventFactory(this.events['onspeechend'])
        this.speechRecognition.onsoundstart = HandlerEventFactory(this.events['onsoundstart'])
        this.speechRecognition.onsoundend = HandlerEventFactory(this.events['onsoundend'])

        if(!this.status){
            this.speechRecognition.start()
            this.status = true
        }
        return this
    }
    
    end() {

        if(this.status){
            this.speechRecognition.stop()
            this.status = false
        }
        return this
    }

    static getSpeechRecognition (){
        return window.SpeechRecognition ||
                window.webkitSpeechRecognition ||
                null; 
    }

}

export default Assistent