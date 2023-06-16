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
  const checkDecimal = () => {} 

  const removeOperator = expression => {
    let newExpression = expression;
    let lastInput = newExpression[newExpression.length -1];
    while(["+","*","/","-"].indexOf(lastInput) !== -1){
      newExpression = newExpression.slice(0,newExpression.length -1);
      lastInput = newExpression[newExpression.length -1];
    }
    return newExpression;
  }
  const handleCalculator = symbol => {
    let displayValue = "";
   
    switch(symbol){       
      case ".":        
          if(!decimal){
            displayValue = expression + symbol
            setDecimal(true)
          }else
            displayValue = expression;
      break;
      case "AC":
          allClear();
          return;
      break;
      case "=":
        calculate();
        return;
      break;
      case "*":
      case "+":
      case "/":
      case "-":
        let operators = "";
        let lastInput = expression[expression.length -1];        
        displayValue = expression;
        
        if(["+","*","/","-"].indexOf(lastInput) === -1){          
           operators = symbol;
        }
        else if(lastInput == "*"){         
           symbol == "-" ? operators = lastInput + symbol : operators = symbol;
           displayValue = removeOperator(expression);
         }else{
           operators = symbol;
           displayValue = removeOperator(expression);
        }
        setDecimal(false)
        input.includes("=") ? displayValue = expression + operators : displayValue += operators;
        operators = "";
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
  const allClear = () => {
    setExpression(0);
    setInput(0);
    setDecimal(false);
  }
  const calculate = () => {
    //setAnswer(eval(expression)) 
    setExpression(eval(expression))
    setInput(prev => prev + "=" + eval(expression))
    //setExpression(eval(expression))
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
              return <button id={id} onClick={() => handleCalculator(value)}>{value}</button>
            })
          }
        </div>
        {/* <div id="clear" onClick={allClear}>AC</div>
        <div id="divide" onClick={() => display("/")}>/</div>
        <div id="multiply" onClick={() => display("*")}>X</div>
        <div id="seven" onClick={() => display("7")}>7</div>
        <div  id="eight" onClick={() => display("8")}>8</div>
        <div id="nine" onClick={() => display("9")}>9</div>
        <div id="subtract" onClick={() => display("-")}>-</div>
        <div id="four" onClick={() => display("4")}>4</div>
        <div id="five" onClick={() => display("5")}>5</div>
        <div id="six" onClick={() => display("6")}>6</div>
        <div id="add" onClick={() => display("+")}>+</div>
        <div id="one" onClick={() => display("1")}>1</div>
        <div id="two" onClick={() => display("2")}>2</div>
        <div id="three" onClick={() => display("3")}>3</div>
        <div id="equals" onClick={() => calculate()}>=</div>
        <div id="zero" onClick={() => display("0")}>0</div>
        <div id="decimal" onClick={() => display(".")}>.</div> */}
      </div>
    </div>
  )
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />)