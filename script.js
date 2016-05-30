var isNumberPressed = false;
var isOperatorPressed = true;
var operator = '';
var value = 0;
var memory = 0;
var result = '';
var valueArray = [];
var count = 0;
// CONSTANTS
var INVALID_INPUT_ERROR = 'error';
var ASCII_VALUE_BACKSPACE = 8;
var ASCII_VALUE_ASTERISK = 42;
var ASCII_VALUE_PLUS = 43;
var ASCII_VALUE_COMMA = 44;
var ASCII_VALUE_MINUS = 45;
var ASCII_VALUE_DELETE = 46;
var ASCII_VALUE_SLASH = 47;
var ASCII_VALUE_ZERO = 48;
var ASCII_VALUE_NINE = 57;
var ASCII_VALUE_EQUAL = 61;
var ASCII_VALUE_N = 78;
var ASCII_VALUE_P = 80;

/*
 * add() adds two numbers and return the result value
 * @param {type} numOne
 * @param {type} numTwo
 * @returns {String|INVALID_INPUT_ERROR|result|Number|add.numOne|numOne|numTwo|add.numTwo}
 */
function add(numOne, numTwo) {
    if(isFinite(numOne) && isFinite(numTwo)) {
        result = numOne + numTwo;
        display(result);
        return result;
    } else {
        return INVALID_INPUT_ERROR;
    }
}
/*
 * subtract() subtracts two numbers and return the result value
 * @param {type} numOne
 * @param {type} numTwo
 * @returns {String|INVALID_INPUT_ERROR|result|Number|subtract.numTwo|numOne|subtract.numOne|numTwo}
 */
function subtract(numOne, numTwo) {
    if(isFinite(numOne) && isFinite(numTwo)) {
        result = numOne - numTwo;
        display(result);
        return result;
    } else {
        return INVALID_INPUT_ERROR;
    }
}

/*
 * multiply() multiplies two numbers and return the result value
 * @param {type} numOne
 * @param {type} numTwo
 * @returns {String|INVALID_INPUT_ERROR|result|multiply.numTwo|Number|numOne|multiply.numOne|numTwo}
 */
function multiply(numOne, numTwo) {
    if(isFinite(numOne) && isFinite(numTwo)) {
        result = numOne * numTwo;
        display(result);
        return result;
    } else {
        return INVALID_INPUT_ERROR;
    }
}
/*
 * divide() divides two numbers and return the result value
 * @param {type} numOne
 * @param {type} numTwo
 * @returns {String|INVALID_INPUT_ERROR|result|Number|divide.numTwo|numOne|divide.numOne|numTwo}
 */
function divide(numOne, numTwo) {
    if(isFinite(numOne) && isFinite(numTwo)) {
        result = numOne / numTwo;
        display(result);
        return result;
    } else {
        return INVALID_INPUT_ERROR;
    }
}

/*
 * restrictCharacter() function restricts the textbox to display numbers and operators
 */
function restrictCharacter(event) {
    if ((event.keyCode >= ASCII_VALUE_ASTERISK) && (event.keyCode <= ASCII_VALUE_NINE) && (event.keyCode !== ASCII_VALUE_COMMA)) {
        event.returnValue = false;
        keyboardInput(event.keyCode);
    } else if (event.keyCode === ASCII_VALUE_EQUAL) {
        // restricts '=' sign to show in display
        event.returnValue = false;
        return calculate();   
    } else {
        // restricts all other keys
        event.returnValue = false;
    }
}

/*
 * buttonInput() is executed when a button is clicked,it assigns the value to the variable
 * @param {type} buttonValue
 * @returns {String|INVALID_INPUT_ERROR}
 */
function buttonInput(buttonValue) {
    if(operator === '' && result !== '') {
            memory = result;
    }
    if( isFinite(buttonValue) || buttonValue === '.' ) {
        // if the input is a number buttonInputNumber() is executed
        return buttonInputNumber(buttonValue);
    } else if(isOperatorPressed === false ) {
        // if the input is a operator buttonInputOperator() is executed
        return buttonInputOperator(buttonValue);
    } else {
        return INVALID_INPUT_ERROR;
    }
}

/*
 * buttonInputNumber() assigns number to the variable,when number button is clicked
 * @returns {Number|buttonValue|@exp;buttonValue|value}
 */
function buttonInputNumber(buttonValue) {
    if(buttonValue !== '.' && count === 0) { 
        buttonValue = buttonValue % 10; 
    } else {
        // if float values are entered this block gets executed
        if(buttonValue !== '.' || count === 0) {
            value = value + buttonValue;
        }
        count = 0.1;
    }
    
    if(isNumberPressed === true ) {
        // if multi-digit number is given as input, this block gets executed 
        if(buttonValue !== '.' && count === 0) { 
            value = (value * 10) + buttonValue;
        } else if(count > 0) {
            count = count * 10;
        }
    } else {
        // if single-digit number is given as input, this block gets executed
        value = buttonValue;
        displayHistory(operator);
    }
    display(value);
    isNumberPressed = true;
    isOperatorPressed = false;
    return value;
}

/*
 * buttonInputOperator() assigns operator to the variable, when operator button is clicked
 * @returns {Number|String|buttonValue|@exp;buttonValue|operator}
 */
function buttonInputOperator(buttonValue) {
    if(count > 0) {
        value = value / count;
        count = 0;
    }
    if(operator === '') {
        // if each time input is given seperately after equals, this block gets executed 
        if(result === '') {
            memory = value;
            displayHistory(memory);
        }
    } else {
        // if the input is given continuously this block gets executed
        calculate();
        memory = result;
    }
    operator = buttonValue;
    display(operator);
    isOperatorPressed = true;
    isNumberPressed = false;
    return operator;
}

/*
 * calculate() selects which method to execute based on operator
 * @param {type} operator
 * @returns {undefined}
 */
function calculate() {
    if(count > 0) {
            value = value / count;
            count = 0;
    }
    displayHistory(value);
    var obj = {
      "leftOperand": memory,
      "rightOperand": value,
      "operator": operator
    };
    switch(operator) {
        case '+':
            // addition operation is to be done
            obj.result = add(obj.leftOperand, obj.rightOperand);
            valueArray.push(obj);
            break;
        case '-':
            // subtraction operation is to be done
            obj.result = subtract(obj.leftOperand, obj.rightOperand);
            valueArray.push(obj);
            break;
        case '*':
            // multiplication operation is to be done
            obj.result = multiply(obj.leftOperand, obj.rightOperand);
            valueArray.push(obj);
            break;
        case '/':
            // division operation is to be done
            obj.result = divide(obj.leftOperand, obj.rightOperand);
            valueArray.push(obj);
            break;
    }
    operator = '';
    tempValue = valueArray.length;
}

/*
 * inputByKey() Add values to the display when keyboard key is pressed
 */
function keyboardInput(keyValue) {
    if ((keyValue === ASCII_VALUE_ASTERISK || keyValue === ASCII_VALUE_PLUS || keyValue === ASCII_VALUE_MINUS || keyValue === ASCII_VALUE_SLASH) && isOperatorPressed === false) {
        // inserting symbols into the array based on ASCII values
        switch (keyValue) {
            case ASCII_VALUE_ASTERISK:
                // '*' key pressed
                buttonInput('*');
                break;
            case ASCII_VALUE_PLUS:
                // '+' key pressed
                buttonInput('+');
                break;
            case ASCII_VALUE_MINUS:
                // '-' key pressed
                buttonInput('-');
                break;
            case ASCII_VALUE_SLASH:
                // '/' key pressed
                buttonInput('/');
                break;
        }
    } else if((keyValue >= ASCII_VALUE_ZERO && keyValue <= ASCII_VALUE_NINE) || keyValue === 46){
        // inserting numbers into the number array
        if(keyValue === 46) {
            buttonInput('.');
        } else {
            var buttonValue = keyValue - ASCII_VALUE_ZERO;
            buttonInput(buttonValue);
        }
    }
}

/*
 * traverseValue() function is to check values entered by the user for Re-checking
 */
function traverseValue(value) {
    isNumberPressed = false;
    isOperatorPressed = true;
    var displayValue;
    if( tempValue === 0 && value === -1) {
        displayValue = valueArray[tempValue].leftOperand;
    } else if(tempValue === valueArray.length && value === 1) {
        displayValue = valueArray[tempValue + value].result;
    } else {
        displayValue = valueArray[tempValue + value].rightOperand;
    }
    tempValue = tempValue + value;
    display(displayValue);
}

function recheck() {
    if(tempValue === -1) {
        valueArray[0].leftOperand = value;
    } else {
        valueArray[tempValue].rightOperand = value;
    }
}

/*
 * prevNxtKey() traverses previous and next values using P ans N keys
 */
function prevNxtKey(e) {
    switch (e.keyCode) {
        case ASCII_VALUE_N:
            //n key pressed
            traverseValue(1);
            break;
        case ASCII_VALUE_P:
            //p key pressed
            traverseValue(-1);
            break;
    }
}

/*
 * display() displays value,operator and result in the display
 */
function display(value) {
    var mainDisplay = document.getElementById("mainDisplay");
    mainDisplay.value = value;
}

/*
 * displayHistory() displays value,operator and result in the display
 */
function displayHistory(value) {
    var historyDisplay = document.getElementById("historyDisplay");
    historyDisplay.value += value;
    if(value === '')
    {
        historyDisplay.value = value;
    }
}

/*
 * clclearAllValue() reset all the value to its intial value
 */
function clearAllValue() {
    display('');
    displayHistory('');
    value = 0;
    operator = '';
    result = '';
    memory = 0;
    isNumberPressed = false;
    isOperatorPressed = true;
    valueArray = [];
    count = 0;
}