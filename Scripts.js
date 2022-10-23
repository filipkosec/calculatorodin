const numButtons = document.querySelectorAll(".NUM");
const operatorButtons = document.querySelectorAll(".OPERATOR");
const buttonClear = document.querySelectorAll('.clear')[0];
const buttonDelete = document.querySelectorAll('.delete')[0];
const valueDisplay = document.querySelectorAll('.screen')[0];
const buttonMakeNegative = document.querySelectorAll(".makeNegative")[0];

let screenValue = 0;
let memoryValue = 0;
let workingValue = "";
let numOfDecimals = 0;
let operatorChosen = false;
let previousOperator = "";
let chosenOperator = "";

valueDisplay.textContent = screenValue;
numButtons.forEach(numButton => numButton.addEventListener('click', () => numberAction(numButton)))
operatorButtons.forEach(operatorButton => operatorButton.addEventListener('click', () => operatorAction(operatorButton)));
buttonDelete.addEventListener('click', () => deleteAction());
buttonClear.addEventListener('click', () => clearAction());
buttonMakeNegative.addEventListener('click', () => makeNegative());

function numberAction(numButton) {
    if (operatorChosen === true) {
        workingValue = "";
        operatorChosen = false;
    }
    workingValue += numButton.textContent;
    if (numButton.textContent === "." && numOfDecimals>0) {
        alert("Only one decimal point!");
        workingValue = workingValue.slice(0,-1);
        numOfDecimals -= 1;
    };
    if (numButton.textContent === ".") {numOfDecimals += 1};
    if (workingValue.length > 8) {
        workingValue = workingValue.slice(0,8);
    }
    if (workingValue.slice(7,8) === ".") {
        console.log("usao");
        workingValue = workingValue.slice(0,7);
    }
    screenValue = workingValue;
    valueDisplay.textContent = screenValue;
}

function deleteAction() {
    if (workingValue.length === 1 || workingValue.length === 0) {workingValue = "00"};
    if (workingValue.slice(workingValue.length -1, workingValue.length) === ".") {
        numOfDecimals -= 1;
    }
    workingValue = workingValue.slice(0,-1);
    screenValue = workingValue;
    valueDisplay.textContent = screenValue;
    if (screenValue === "0") {workingValue = ""};
}

function clearAction() {
    screenValue = 0;
    memoryValue = 0;
    workingValue = "";
    numOfDecimals = 0;
    operatorChosen = false;
    previousOperator = "";
    chosenOperator = "";
    valueDisplay.textContent = screenValue;
}

function makeNegative() {
    if (workingValue.charAt(0) != "-") {
        workingValue = "-" + workingValue;
    } else {
        workingValue = workingValue.substring(1);
    }
    screenValue = workingValue;
    valueDisplay.textContent = screenValue;
}

function operatorAction(operatorButton) {
    previousOperator = chosenOperator;
    chosenOperator = operatorButton.textContent;
    if (previousOperator != "") {
        if (previousOperator === "+") {
            memoryValue += parseFloat(workingValue);
        } else if (previousOperator === "-") {
            memoryValue -= parseFloat(workingValue);
        } else if (previousOperator === "*") {
            memoryValue *= parseFloat(workingValue);
        } else if (previousOperator === "/") {
            if (workingValue === "0") {
                clearAction();
                valueDisplay.textContent = "ERROR: ∞";
                return;
            }
            memoryValue /= parseFloat(workingValue);
        } else if (previousOperator === "=" && chosenOperator === "=") {
            workingValue = screenValue;
            memoryValue = screenValue;
        }
        screenValue = memoryValue.toString();
        if (screenValue.length > 8) {
            screenValue = screenValue.slice(0,8);
        }
        console.log(screenValue);
        valueDisplay.textContent = screenValue;
    }
    if (previousOperator === "") {
        memoryValue = parseFloat(workingValue);
    }
    operatorChosen = true;
}