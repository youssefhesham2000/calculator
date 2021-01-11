<template>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
        <div>
            <table border="5" class="table table-borderless">
                <tr>
                    <td colspan="4"><div class="viewDiv">{{ firstNum}}</div>  </td>
                </tr>
                 <tr>
                    <td colspan="4"><div class="viewDiv">{{ ViewString}}</div>  </td>
                </tr>
                 <tr>
                    <td colspan="4"><div class="viewDiv">{{secondNum}}</div>  </td>
                </tr>
                <tr>
                    <td><input type="button" class="btn btn-primary" value="% " @click="additionalRendering(firstNum,secondNum,'additional','%')"></td>
                    <td><input type="button" class="btn btn-danger" value="C" @click="clear(firstNum,secondNum,secondFlag,ViewString)"> </td>
                    <td colspan="2"><input type="button" class="btn btn-danger" value="del"> </td>
                </tr>
                <tr>
                    <td><input type="button" class="btn btn-primary" value="1/x" @click="additionalRendering(firstNum,secondNum,'additional','1/x')"> </td>
                    <td><input type="button" class="btn btn-primary" value="x^2" @click="additionalRendering(firstNum,secondNum,'additional','x^2')"> </td>
                    <td><input type="button" class="btn btn-primary" value="x^1/2" @click="additionalRendering(firstNum,secondNum,'additional','x^1/2')"> </td>
                    <td><input type="button" class="btn btn-primary" value="/" @click="operationRendering(firstNum,secondNum,typeOfOperator,'/',secondFlag,ViewString)"> </td>
                </tr>
                <tr>
                    <td><input type="button" class="btn btn-secondary" value="7" @click="Viewrendering('7',firstNum,secondNum,secondFlag,typeOfOperator)"> </td>
                    <td><input type="button" class="btn btn-secondary" value="8" @click="Viewrendering('8',firstNum,secondNum,secondFlag,typeOfOperator)"> </td>
                    <td><input type="button" class="btn btn-secondary" value="9" @click="Viewrendering('9',firstNum,secondNum,secondFlag,typeOfOperator)"> </td>
                    <td><input type="button" class="btn btn-primary" value="*" @click="operationRendering(firstNum,secondNum,typeOfOperator,'*',secondFlag,ViewString)"> </td>
                </tr>
                <tr>
                    <td><input type="button" class="btn btn-secondary" value="4" @click="Viewrendering('4',firstNum,secondNum,secondFlag,typeOfOperator)"> </td>
                    <td><input type="button" class="btn btn-secondary" value="5" @click="Viewrendering('5',firstNum,secondNum,secondFlag,typeOfOperator)"> </td>
                    <td><input type="button" class="btn btn-secondary" value="6" @click="Viewrendering('6',firstNum,secondNum,secondFlag,typeOfOperator)"> </td>
                    <td><input type="button" class="btn btn-primary" value="-" @click="operationRendering(firstNum,secondNum,typeOfOperator,'-',secondFlag,ViewString)"> </td>
                </tr>
                <tr>
                    <td><input type="button" class="btn btn-secondary" value="1" @click="Viewrendering('1',firstNum,secondNum,secondFlag,typeOfOperator)"> </td>
                    <td><input type="button" class="btn btn-secondary" value="2" @click="Viewrendering('2',firstNum,secondNum,secondFlag,typeOfOperator)"> </td>
                    <td><input type="button" class="btn btn-secondary" value="3" @click="Viewrendering('3',firstNum,secondNum,secondFlag,typeOfOperator)"> </td>
                    <td><input type="button" class="btn btn-primary" value="+" @click="operationRendering(firstNum,secondNum,typeOfOperator,'+',secondFlag,ViewString)"> </td>
                </tr>
                <tr>
                    <td><input type="button" class="btn btn-primary" value="+/-" @click="sign(firstNum,secondNum,secondFlag,typeOfOperator)" > </td>
                    <td><input type="button" class="btn btn-secondary" value="0" @click="Viewrendering('0',firstNum,secondNum,secondFlag,typeOfOperator)"> </td>
                    <td><input type="button" class="btn btn-primary" value="." @click="Viewrendering('.',firstNum,secondNum,secondFlag,typeOfOperator)"> </td>
                    <td><input type="button" class="btn btn-success" value="=" @click="rendering(firstNum,secondNum,typeOfOperator,ViewString)"> </td>
                </tr>
            </table>
        </div>
</template>

<script>

import Method from "./utils.js"
export default {
  name: 'HelloWorld',
        data(){
            return{
                id : 40,
                methods:new Method(),
                text : 'init',
                 secondFlag:'false',
                 firstNum:'',
                 secondNum:'',
                 ViewString : '',
                 ViewResult :'',
                 typeOfOperator:'essential',
                rendering:function(firstNum,secondNum,typeOfOperator,operator){
                    if(this.firstNum!="dividing zero error press C "){   
                        this.methods.server(firstNum,secondNum,typeOfOperator,operator).then(data => this.firstNum = data[2])
                    this.secondNum=''
                    this.ViewString=''   
                     }
                },
                additionalRendering: function(firstNum,secondNum,typeOfOperator,operator){
                     if(this.firstNum!="dividing zero error press C "){
                         if(secondNum!=''){
                        this.methods.server(firstNum,secondNum,typeOfOperator,operator).then(data => this.secondNum = String(data[1]))
                         }
                         else if(secondNum==''){
                             this.methods.server(firstNum,secondNum,typeOfOperator,operator).then(data => this.firstNum = String(data[0]))
                         }
                     }
                },
                 operationRendering:function(firstNum,secondNum,typeOfOperator,operator,secondFlag,oldOperator){
                    if(this.firstNum!="dividing zero error press C "){
                        if(this.ViewString!=''&&this.secondNum==''){
                       this.ViewString=operator  
                     }
                        else if(this.ViewString!=''){
                            this.methods.server(firstNum,secondNum,typeOfOperator,oldOperator).then(data => this.firstNum = data[2]).then()
                            this.secondNum=''
                            this.ViewString=operator     
                    }
                   else{
                       this.Viewrendering(operator,firstNum,secondNum,secondFlag,typeOfOperator)
                    }            
                     }   
                },
                Viewrendering:function(value,firstNum,secondNum,secondFlag,typeOfOperator){
                    if(this.firstNum!="dividing zero error press C "){
                       var St= this.methods.displayView(value,this.ViewString,firstNum,secondNum,secondFlag,typeOfOperator)
                    this.ViewString  = St[0]
                    this.firstNum=St[1]
                    this.secondNum=St[2]
                    this.secondFlag=St[3]
                    this.typeOfOperator=St[4]
                    console.log(this.secondFlag)   
                     }
                },
                sign:function(firstNum,secondNum,secondFlag){
                    if(this.firstNum!="dividing zero error press C "){
                        var ret=this.methods.negativeSign(firstNum,secondNum,secondFlag)
                    this.firstNum=ret[0]
                    this.secondNum=ret[1]     
                     }
                },
                delete:function(firstNum,secondNum,ViewString){
                  if(this.firstNum!="dividing zero error press C "){ 
                  var  St= this.methods.delete(firstNum,secondNum,ViewString)
                    this.ViewString = St[0]
                    this.firstNum=St[1]
                    this.secondNum=St[2]
                  }
                },
                clear:function(firstNum,secondNum,secondFlag,ViewString){
                    var ret= this.methods.clear(firstNum,secondNum,secondFlag,ViewString)
                    this.firstNum=ret[0]
                    this.secondNum=ret[1]
                    this.secondFlag=ret[2]
                    this.ViewString=ret[3]
                },

            }

        } 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    input[type="button"] {
        width: 100%
    }
    .viewDiv {
        background-color:lightgray;
    }

    input[type="text"] {
        width: 100%
    }

    div {
        align-self: center;
       width:300px;
       margin: auto;
    }


</style>
