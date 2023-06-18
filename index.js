function App(){
  const [expression, setExpression] = React.useState(0); 
  const [decimal, setDecimal] = React.useState(false); 
  const [input,setInput] = React.useState(0);
  
  const keys = [
        {
          id:"clear",
          value:"AC"
        },
        {
          id:"clearSymbol",
          value:"C"
        },
        {
          id:"divide",
          value:"/"
        },
        {
          id:"multiply",
          value:"*"
        },
        {
          id:"seven",
          value:"7"
        },
        {
          id:"eight",
          value:"8"
        },
         {
          id:"nine",
          value:"9"
        },
        {
          id:"subtract",
          value:"-"
        },
        {
          id:"four",
          value:"4"
        },
         {
          id:"five",
          value:"5"
        },
        {
          id:"six",
          value:"6"
        },
         {
          id:"add",
          value:"+"
        },
         {
          id:"one",
          value:"1"
        },
         {
          id:"two",
          value:"2"
        },
         {
          id:"three",
          value:"3"
        },
         {
          id:"zero",
          value:"0"
        },
         {
          id:"decimal",
          value:"."
        },
        {
          id:"equals",
          value:"="
        }, 
      ];

  const removeOperator = expression => {
    let newExpression = expression;
    let lastInput = newExpression[newExpression.length -1];
    while(["+","*","/","-"].indexOf(lastInput) !== -1){
      newExpression = newExpression.slice(0,newExpression.length -1);
      lastInput = newExpression[newExpression.length -1];
    }
    return newExpression;
  }

  const handleDecimal = symbol => {
    if(!decimal){      
      setDecimal(true)
     return expression + symbol
    }else
      return expression;
  }
  const handleOperators = (symbol,displayValue) => {
        let operators = "";
        let newDisplayValue = displayValue;
        let lastInput = expression[expression.length -1];        
        newDisplayValue = expression;
        
        if(["+","*","/","-"].indexOf(lastInput) === -1){          
           operators = symbol;
        }
        else if(lastInput == "*"){         
           symbol == "-" ? operators = lastInput + symbol : operators = symbol;
           newDisplayValue = removeOperator(expression);
         }else{
           operators = symbol;
           newDisplayValue = removeOperator(expression);
        }
        setDecimal(false)
        input.includes("=") ? newDisplayValue = expression + operators : newDisplayValue += operators;
        operators = "";
        return newDisplayValue;
  }
  const handleCalculator = symbol => {
    let displayValue = "";
   
    switch(symbol){       
      case ".":        
         displayValue = handleDecimal(symbol);
      break;
      case "AC":
          allClear();
          return;
      break;
      case "C":
        displayValue = clear();
        if(displayValue == ""){
          allClear();
          return;
        }
      break;
      case "=":
        calculate();
        return;
      break;
      case "*":
      case "+":
      case "/":
      case "-":
        displayValue = handleOperators(symbol,displayValue);
       break;

      default:
         expression == "0" 
         ? displayValue = symbol 
         : input.includes("=") 
         ? displayValue = symbol 
         : displayValue = expression + symbol;
    }
    setExpression(displayValue);
    setInput(displayValue);
  }

  const clear = () => {    
    return  expression.slice(0,[expression.length -1]);
  }

  const allClear = () => {
    setExpression(0);
    setInput(0);
    setDecimal(false);
  }
  const calculate = () => {   
    setExpression(eval(expression))
    setInput(prev => prev + "=" + eval(expression))    
  }
  
  return(
    <div className="container">
      <div className="grid">
        <div className="dis">
          <input id="display" type="text" value={expression} />
          <div>{input}</div>
        </div>
        <div id="keys">
          {
            keys.map(({id,value}) => {
              return <button key={`key-${id}`} id={id} onClick={() => handleCalculator(value)}>{value}</button>
            })
          }
        </div>
      </div>
    </div>
  )
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />)