document.addEventListener("DOMContentLoaded", function () {
    let operationButtons = document.querySelectorAll('.calculation-item');
    let clearButtons = document.querySelectorAll('.clear-content');
    let calculateButton = document.querySelector('.calculate-result');
    let currentSelection = document.getElementById("operationPreviewText");
    let resultContainer = document.getElementById("resultItem");

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

    function handleNumber(currentValue) {
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
        result = operate(operandLeft, operator, operandRight);

        currentSelection.value = result;
        resultContainer.value = result;

        operandLeft = result;
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
            case '+':
                result = addNum(operandLeft, operandRight);
                break;
            
            case '-':
                result = subtractNum(operandLeft, operandRight);
                break;

            case '÷':
                result = divideNum(operandLeft, operandRight);
                break;

            case 'x':
                result = multiplyNum(operandLeft, operandRight);
                break;
            
            default:
                console.error("Invalid operation. Please try again.");
                return;
        }

        return result;
    }
});