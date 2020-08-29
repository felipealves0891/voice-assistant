function HandlerResult(observers = []) {

    function handler(event) {
        let text = transcript(event.results)
        for (const observer of observers)
            if(observer) observer(text)   

        return text
    }

    function transcript(result) {
        let content = ""
        for (var i = 0; i < result.length; i++) {
            if(result[i].isFinal){
                content = result[i][0].transcript
            }else{
                content += result[i][0].transcript
            }
        }
        return content
    }

    return handler


} 

export default HandlerResult