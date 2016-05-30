
var tests = [
    testAdd,
    testSubtract,
    testMultiply,
    testDivide,
    testButonInput
];

function startTests() {
    
    var resultsList = document.createElement('ul');
    resultsList.id = 'testResults';
    document.getElementsByTagName('body')[0].appendChild(resultsList);
    
    for(iLoop = 0 ;iLoop < tests.length ; iLoop++ ) {
        var result = tests[iLoop].call();
        var li = document.createElement("li");
        li.innerHTML = tests[iLoop].name +':'+ (result === true ? "PASSED": result.msg);
        li.className = result === true ? 'passed' : 'failed';
        resultsList.appendChild(li);
    }
}

/*
 * pass() if the test passes this gets executed
 */
function pass(msg) {
    console.log(msg);
    return true;
}

/*
 * fail() if the test fails this gets executed
 */
function fail(msg) {
    console.log(msg);
    return {'result': 'FAILED','msg': msg};
}

/*
 * testAdd() tests add() with some input values and expected output
 */
function testAdd() {
    var a = add(1, 2);
    if (a !== 3) {
        return fail(' 1 + 2 should be 3, but result is ' + a);
    }
    
    var a = add(1.23, -2);
    if (a !== -0.77) {
        return fail(' 1.23 + -2 should be -0.77, but result is ' + a);
    }
    
    var a = add('a1', 2);
    if (a !== 'error') {
        return fail(' a1 + 2 should not be allowed, but result is ' + a);
    }
    
    var a = add(-1, 'b');
    if (a !== 'error') {
        return fail(' -1 + b should not be allowed, but result is ' + a);
    }
    
    var a = add('!', 1);
    if (a !== 'error') {
        return fail(' ! + 1 should not be allowed, but result is ' + a);
    }
    
    return pass('All test cases are passed');
}

/*
 * testSubtract() tests subtract() with some input values and expected output
 */
function testSubtract() {
    var a = subtract(1, 2);
    if (a !== -1) {
        return fail(' 1 - 2 should be -1, but result is ' + a);
    }
    
    var a = subtract(1.23, -2);
    if (a !== 3.23) {
        return fail(' 1.23 - -2 should be 3.23, but result is ' + a);
    }
    
    var a = subtract('a1', 2);
    if (a !== 'error') {
        return fail(' a1 - 2 should not be allowed, but result is ' + a);
    }
    
    var a = subtract(-1, 'b');
    if (a !== 'error') {
        return fail(' -1 - b should not be allowed, but result is ' + a);
    }
    
    var a = subtract('!', 1);
    if (a !== 'error') {
        return fail(' ! - 1 should not be allowed, but result is ' + a);
    }
    
    return pass('All test cases are passed');
}

/*
 * testMultiply() tests multiply() with some input values and expected output
 */
function testMultiply() {
    var a = multiply(1, 2);
    if (a !== 2) {
        return fail(' 1 * 2 should be 2, but result is ' + a);
    }
    
    var a = multiply(1.23, -2);
    if (a !== -2.46) {
        return fail(' 1.23 * -2 should be -2.46, but result is ' + a);
    }
    
    var a = multiply('a1', 2);
    if (a !== 'error') {
        return fail(' a1 * 2 should not be allowed, but result is ' + a);
    }
    
    var a = multiply(-1, 'b');
    if (a !== 'error') {
        return fail(' -1 * b should not be allowed, but result is ' + a);
    }
    
    var a = multiply('!', 1);
    if (a !== 'error') {
        return fail(' ! * 1 should not be allowed, but result is ' + a);
    }
    
    return pass('All test cases are passed');
}

/*
 * testDivide() tests divide() with some input and expected output values
 */
function testDivide() {
    var a = divide(1, 2);
    if (a !== 0.5) {
        return fail(' 1 / 2 should be 0.5, but result is ' + a);
    }
    
    var a = divide(1.23, -2);
    if (a !== -0.615) {
        return fail(' 1.23 / -2 should be -0.615, but result is ' + a);
    }
    
    var a = divide('a1', 2);
    if (a !== 'error') {
        return fail(' a1 / 2 should not be allowed, but result is ' + a);
    }
    
    var a = divide(-1, 'b');
    if (a !== 'error') {
        return fail(' -1 / b should not be allowed, but result is ' + a);
    }
    
    var a = divide('!', 1);
    if (a !== 'error') {
        return fail(' ! / 1 should not be allowed, but result is ' + a);
    }
    
    return pass('All test cases are passed');
}

/*
 * testButtonInput() tests buttonPressed() with some input and expected output values
 */
function testButonInput() {
    
    var value = buttonInput('a');
    if(value !== 'error') {
        return fail('a is pressed,but the value obtained is '+ value);
    }
    
    var value = buttonInput(6);
    if(isNaN(value) === true) {
        return fail('6 is pressed,but the value obtained is '+ value);
    }
    var value = buttonInput('+');
    if(isFinite(value)) {
        return fail('+ is pressed,but the value obtained is '+ value);
    }
    
    var value = buttonInput(5);
    if(isNaN(value) === true) {
        return fail('65 is pressed,but the value obtained is '+ value);
    }
    
    return pass('All test cases are successfully passed');
}