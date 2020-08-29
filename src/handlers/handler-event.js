function HandlerEvent(observers = []) {
    
    function handler() {
        console.log("Evento acionado...")
        for (const observer of observers) 
            if(observer) observer()
            
    }

    return handler

}