// Get display element
const display = document.getElementById('display');

// Append number to display
function appendNumber(num) {
    display.value += num;
}

// Append operator to display
function appendOperator(op) {
    const lastChar = display.value.slice(-1);
    // Prevent multiple operators in a row
    if (lastChar === '+' || lastChar === '-' || lastChar === '*' || lastChar === '/') {
        return;
    }
    display.value += op;
}

// Append function to display
function appendFunction(func) {
    display.value += func;
}

// Append constant to display
function appendConstant(constant) {
    if (constant === 'π') {
        display.value += Math.PI.toString();
    } else if (constant === 'e') {
        display.value += Math.E.toString();
    }
}

// Clear display
function clearDisplay() {
    display.value = '';
}

// Backspace function
function backspace() {
    display.value = display.value.slice(0, -1);
}

// Toggle sign (positive/negative)
function toggleSign() {
    if (display.value !== '') {
        if (display.value.charAt(0) === '-') {
            display.value = display.value.slice(1);
        } else {
            display.value = '-' + display.value;
        }
    }
}

// Calculate the result
function calculate() {
    try {
        let expression = display.value;
        
        // Replace custom functions with JavaScript equivalents
        expression = expression.replace(/sin\(/g, 'Math.sin(');
        expression = expression.replace(/cos\(/g, 'Math.cos(');
        expression = expression.replace(/tan\(/g, 'Math.tan(');
        expression = expression.replace(/log\(/g, 'Math.log10(');
        expression = expression.replace(/ln\(/g, 'Math.log(');
        expression = expression.replace(/sqrt\(/g, 'Math.sqrt(');
        expression = expression.replace(/π/g, Math.PI);
        expression = expression.replace(/e/g, Math.E);
        expression = expression.replace(/pow\(/g, 'Math.pow(');
        expression = expression.replace(/factorial\(/g, 'factorial(');
        expression = expression.replace(/abs\(/g, 'Math.abs(');
        expression = expression.replace(/deg2rad\(/g, 'deg2rad(');
        expression = expression.replace(/1\/x/g, '1/');
        expression = expression.replace(/1\//g, '(1/');
        expression = expression.replace(/\(/g, '(');
        
        // Handle degree to radian conversion
        expression = expression.replace(/deg2rad\(/g, 'Math.PI/180*');
        
        // Evaluate the expression
        let result = eval(expression);
        
        // Round to avoid floating point errors
        result = Math.round(result * 100000000) / 100000000;
        
        display.value = result;
    } catch (error) {
        display.value = 'Error';
        setTimeout(() => {
            clearDisplay();
        }, 1500);
    }
}

// Factorial function
function factorial(n) {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

// Convert degrees to radians
function deg2rad(degrees) {
    return degrees * (Math.PI / 180);
}

// Keyboard support
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    if (key >= '0' && key <= '9') {
        appendNumber(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        appendOperator(key);
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    } else if (key === 'Backspace') {
        event.preventDefault();
        backspace();
    } else if (key === 'Escape') {
        clearDisplay();
    } else if (key === '.') {
        appendNumber('.');
    }
});
