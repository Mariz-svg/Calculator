let runningTotal = 0;
let buffer = "0"; //default on screen is zero
let previousOperator;
const screen = document.querySelector(".src");

function buttonClick(value) {
  if (isNaN(parseInt(value))) {
    symbolClick(value);
  } else {
    numberClick(value);
  }
  rerender();
}

function numberClick(value) {
    if(buffer === "0"){ 
        buffer = value; //Appear as zero by default
    }
    else{
        buffer += value;
    }
 
}

function doMath(value) {
    if(buffer === "0"){
        return;
    }
    const bufferValue = parseInt(buffer);
    if( runningTotal === 0)
        runningTotal = bufferValue;
    else{
        
        flushOperation(bufferValue);
    }
    previousOperator = value;
    buffer = "0";
    
  
}

function flushOperation(bufferValue) {
    if(previousOperator === "+")
    {
        runningTotal+=bufferValue;
    }else if(previousOperator === "-"){
        runningTotal-=bufferValue;
    }else if(previousOperator === "×")
    {
        runningTotal*= bufferValue;
    }else{
        runningTotal /=bufferValue;
    }
  
}

function symbolClick(value) {
    switch(value){
        case "C":
            if(buffer === "0")
            {
                return; //do nothing
            }
            runningTotal = 0;  //reseting the running total to zero
            buffer = "0"; //emptying the buffer from previous operations
            break;
        case "=":
            if(previousOperator === null)
            {
                return;
            }
            flushOperation(parseInt(buffer));
            buffer =""+ runningTotal; //to display the result on the screen as a string
            runningTotal = 0;
            previousOperator = null; //after equals is clicked we flushed the operation
            break;
        case "←":
            if(buffer === "0")
                return;
            else {
                if(buffer.length === 1) //if the buffer is one number it clears it to zero
                {
                    buffer = "0";
                }
                else {
                    //if the buffer is more than one digits it decreases digits by one each press
                    buffer = buffer.substring(0, buffer.length - 1);
                }
            }
            break;
        case "+":
        case "-":
        case "÷":
        case "×":
            //same logic for mathematical operations
            doMath(value);
            break;

    }
}

function rerender() {
  screen.innerText = buffer; //to update the screen with buffer value
}

function init() {
  document
    .querySelector(".calculator-buttons")
    .addEventListener("click", function (event) {
      buttonClick(event.target.innerText);
    });
}

init();