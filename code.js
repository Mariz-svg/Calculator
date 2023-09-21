let runningTotal = 0;
let buffer = "0";
let previousOperator;
const screen = document.querySelector(".src");

function buttonClick(value) {
  if (isNaN(parseInt(value))) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  rerender();
}

function handleNumber(value) {
    if(buffer === "0"){
        buffer = value;
    }
    else{
        buffer += value;
    }
 
}

function handleMath(value) {
    if(buffer === "0"){
        return;
    }
    if( runningTotal === 0)
        runningTotal = buffer;
    else{
        const intBuffer = parseInt(buffer);
        flushOperation(intBuffer);
        
        
        
    }
    previousOperator = value;
    buffer = 0;
    
  
}

function flushOperation(intBuffer) {
    if(previousOperator === "+")
    {
        runningTotal+=intBuffer;
    }else if(previousOperator === "-"){
        runningTotal-=intBuffer;
    }else if(previousOperator === "×")
    {
        runningTotal*= intBuffer;
    }else{
        runningTotal /=intBuffer;
    }
  
}

function handleSymbol(value) {
    switch(value){
        case "C":
            if(buffer === "0")
            {
                return; //do nothing
            }
            runningTotal = 0;
            buffer = "0";
        case "=":
            if(previousOperator === null)
            {
                return;
            }
            const intBuffer = parseInt(buffer);
            flushOperation(intBuffer);
            buffer += runningTotal;
            runningTotal = 0;
            previousOperator = null;
            break;
        case "←":
            if(buffer === "0")
                return;
            else {
                if(buffer.length === 1)
                {
                    buffer = "0";
                }
                else {
                    buffer = substring(0, buffer.length - 1);
                }
            }
            break;
        case "+":
        case "-":
        case "÷":
        case "×":
            handleMath(value);
            break;

    }
}

function rerender() {
  screen.innerText = buffer;
}

function init() {
  document
    .querySelector(".calculator-buttons")
    .addEventListener("click", function (event) {
      buttonClick(event.target.innerText);
    });
}

init();