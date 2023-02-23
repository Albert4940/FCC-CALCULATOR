$("document").ready(function(){
   var operatorsArray = [];
   const operators = ["+","*","/","-"];
  var isDotIncludes = false;
  
  function removeOperator(input){
    var newInput = input.slice(0,);
    var lastChar = newInput[newInput.length - 1];
    
    while(operators.includes(lastChar)){
      newInput = newInput.slice(0,newInput.length -1);
      lastChar = newInput[newInput.length - 1];
    }
    return newInput;
  }
  
  function checkOperator(input){     
    
    if(!operators.includes(input)){
      operatorsArray = []; 
    }
    else if(operatorsArray.length == 0 && operators.includes(input)){
     operatorsArray.push(input); 
    }
    else if(operatorsArray.length == 1 && input == "-"){
      operatorsArray.push(input); 
    }else if(operatorsArray.length != 0 && input != "-" && operators.includes(input)){
      operatorsArray = [input];
    }
    // else if(operatorsArray.length == 2 && operatorsArray.every(op => op == "-")){
    //   return "-";
    // }
    return operatorsArray.join("")
  }
  
  $("button").click(function(){
    const btnText = $(this).text();
    const display = $("#display");
     const output = $("#output");   
    const lastChar = display.val()[display.val().length -1];
    
    switch(btnText){
      case "AC":
         display.val("0");
        output.val("");
      break;
      case ".":
        if(!display.val().includes(".") || !isDotIncludes){
          display.val(display.val() + ".");
          isDotIncludes = true;
        }else
         display.val(display.val());
      break;
      case "=":    
        try{
          display.val(eval(display.val()));
        }catch(e){
          console.log(e)
        }
        
      break;
      default: 
       // operators.includes(lastChar) && operators.includes(btnText) ? removeOperator(display.val()) + checkOperator(btnText) :   
        const op = checkOperator(btnText);
          const textInput = display.val() === "0" ? btnText : operators.includes(lastChar) && operators.includes(btnText) ? removeOperator(display.val()) + op :        
                display.val() + btnText;   
               
        if(operators.includes(btnText))
          isDotIncludes = false;
        
          output.val(btnText);
          display.val(textInput);
       //console.log(checkOperator(btnText))
    }
  })
})