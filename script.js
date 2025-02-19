document.addEventListener("DOMContentLoaded", function () {
    let operationButtons = document.querySelectorAll(".calculation-item");
    let clearButtons = document.querySelectorAll(".clear-content");
    let calculateButton = document.querySelector(".calculate-result");
    let currentSelection = document.getElementById("operationPreviewText");
    let resultContainer = document.getElementById("resultItem");
    let backspaceButton = document.getElementById("backspace");

    let expression = "";
    let operandLeft = null;
    let operator = null;
    let newOperand = true;

    // Function for buttons that will be part of the operation
    operationButtons.forEach(button => {
        button.addEventListener("click", function(event) {
            let currentValue = event.target.value;

            if (["+", "÷", "-", "x"].includes(currentValue)) {
                handleOperator(currentValue);
            } else {
                handleNumber(currentValue);
            }
        })
    })

    backspaceButton.addEventListener("click", function() {
        if (currentSelection.value) {
            currentSelection.value = currentSelection.value.slice(0, -1);

            if (currentSelection.value === "") {
                currentSelection.value = "";

                if (newOperand) {
                    operandLeft = null;
                    operator = null;
                }
            }
        }
    })

    function handleNumber(currentValue) {
        if (currentValue === "." && currentSelection.value.includes(".")) {
            return;
        }
        
        if (newOperand) {
            currentSelection.value = currentValue;
            newOperand = false;
        } else {
            currentSelection.value += currentValue;
        }
    }

    function handleOperator(currentValue) {
        if (!operandLeft) {
            operandLeft = parseFloat(currentSelection.value);
            currentSelection.value = currentValue;
        } else if (!newOperand) {
            calculate();
            currentSelection.value = currentValue;
        } else {
            currentSelection.value = currentValue;
        }

        operator = currentValue;
        newOperand = true;
    }

    function calculate() {
        operandRight = parseFloat(currentSelection.value);

        if (operator === null || operandRight === null) {
            operandLeft = parseFloat(currentSelection.value);
            result = operandLeft;
        } else if (!isNaN(operandLeft) && !isNaN(operandRight)) {
            result = operate(operandLeft, operator, operandRight);
        } else {
            return;
        }

        currentSelection.value = result;
        resultContainer.value = result;

        operandLeft = result;
        operator = null;
        operandRight = null;
        newOperand = true;
    }

    // Function for clear buttons (C & CE)
    clearButtons.forEach(button => {
        button.addEventListener("click", function(event) {
            currentSelection.value = "";
            expression = "";
            resultContainer.value = 0;
            operandLeft = null;
            operator = null;
            newOperand = true;
        });
    });

    // Function for calculating the result
    calculateButton.addEventListener("click", function(event) {
        calculate();
    });

    // Function for appending value to display
    function appendToDisplay(value) {
        if (!currentSelection) return;
            
        currentSelection.value += value;
    }

    function updateDisplay(value) {
        currentSelection.value = value;
    }

    // Operation functions
    function addNum(operandLeft, operandRight) {
        let sum = parseFloat(operandLeft) + parseFloat(operandRight);

        return sum;
    }

    function subtractNum(operandLeft, operandRight) {
        let difference = parseFloat(operandLeft) - parseFloat(operandRight);

        return difference;
    }

    function multiplyNum(operandLeft, operandRight) {
        let product = parseFloat(operandLeft) * parseFloat(operandRight);

        return product;
    }

    function divideNum(operandLeft, operandRight) {
        let quotient = parseFloat(operandLeft) / parseFloat(operandRight);

        return quotient;
    }

    // Operate function for calculating the result
    function operate(operandLeft, operator, operandRight) {
        let result = 0;

        switch(operator) {
            case "+":
                result = addNum(operandLeft, operandRight);
                break;
            
            case "-":
                result = subtractNum(operandLeft, operandRight);
                break;

            case "÷":
                result = divideNum(operandLeft, operandRight);
                break;

            case "x":
                result = multiplyNum(operandLeft, operandRight);
                break;
            
            default:
                console.error("Invalid operation. Please try again.");
                return;
        }

        return result;
    }
});