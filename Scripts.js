const numButtons = document.querySelectorAll(".NUM");
const operatorButtons = document.querySelectorAll(".OPERATOR");
const buttonDecimal = document.querySelectorAll('.decimal')[0];
const buttonClear = document.querySelectorAll('.clear')[0];
const buttonDelete = document.querySelectorAll('.delete')[0];
const valueDisplay = document.querySelectorAll('.screen')[0];
let screenValue = 0;
let memoryValue = 0;
let workingValue = "";
let numOfDecimals = 0;
valueDisplay.textContent = screenValue;

numButtons.forEach(numButton => numButton.addEventListener('click', () => numberAction(numButton)))
operatorButtons.forEach(operatorButton => operatorButton.addEventListener('click', () => operatorAction(operatorButton)));

function numberAction(numButton) {
    workingValue += numButton.textContent;
    console.log(numButton.textContent)
    if (numButton.textContent === "." && numOfDecimals>0) {
        alert("Only one decimal point!");
        workingValue = workingValue.slice(0,-1);
    };
    if (numButton.textContent === ".") {numOfDecimals += 1};
    screenValue = workingValue;
    valueDisplay.textContent = screenValue;
}

function operatorAction(operatorButton) {
    workingValue = parseInt(workingValue);
    let whichOperator = operatorButton.textContent;
    console.log(whichOperator);
    if (whichOperator === "+") {
        memoryValue += workingValue;
    } else if (whichOperator === "-") {
        memoryValue -= workingValue
    } else if (whichOperator === "*") {
        memoryValue *= workingValue
    } else if (whichOperator === "/") {
        memoryValue /= workingValue
    } else {
        memoryValue += workingValue
    };
    screenValue = memoryValue;
    valueDisplay.textContent = screenValue;
    memoryValue = 0;
    workingValue = "";
}
