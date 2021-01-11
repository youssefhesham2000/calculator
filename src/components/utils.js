export default class Method{
    server(firstNum,secondNum,typeOfOperator,operator){
        console.log(typeOfOperator)
        return fetch("http://localhost:8080/",
        {
            method:'post',
            headers: { "Content-Type": "application/json",
            'Accept': 'application/json'
            },

            if(typeOfOperator) {
                body: JSON.stringify({ firstNum: String(firstNum), secondNum: String(secondNum), type: String(typeOfOperator), op: String(operator) })
            },
        }
        )
        .then(response=> response.json())
        .then(body=>{ 
            console.log(body[0])
            return body    
        })
}
    
    negativeSign(firstNum,secondNum,secondFlag){
        var sign="-"
        if(secondFlag=="true"){
            secondNum=sign.concat(secondNum)
        }
        else{
            firstNum=sign.concat(firstNum)
        }
        return [firstNum,secondNum]
    }
    clear(firstNum,secondNum,secondFlag,ViewString){
        firstNum=""
        secondNum=""
        secondFlag="false"
        ViewString=""
        return[firstNum,secondNum,secondFlag,ViewString]

    }
    delete(firstNum,secondNum,ViewString){
       //and operator
       
        if(secondNum!=''){
            secondNum=String(secondNum).slice(0,-1)
        }
        else if(ViewString){
           ViewString=String(ViewString).slice(0,-1)
        }
        else if(firstNum!=''){
            firstNum=String(firstNum).slice(0,-1)
        }

    }
    displayView( newString,oldString,firstNum,secondNum,secondFlag,typeOfOperator){
        //operators
         if((newString=="+"||newString=="-"||newString=="*"||newString=="/")&&firstNum!=''){
             oldString=newString 
             secondFlag="true"    
        }
        else if((newString!="1/x"&&newString!="x^2"&&newString!="x^1/2"&&newString!="%"&&newString!="+"&&newString!="-"&&newString!="*"&&newString!="/")){
            if(secondFlag=="true"){
                secondNum=secondNum.concat(newString)
            }
            else{
                firstNum=firstNum.concat(newString)
            }

        }
        else if(newString=="1/x"||newString=="x^2"||newString=="x^1/2"||newString=="%"){
            typeOfOperator=typeOfOperator.replace("essential","additional")
        }
       return [oldString,firstNum,secondNum,secondFlag,typeOfOperator];

    }
}