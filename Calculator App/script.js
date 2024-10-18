let currentInput = '0';
let previousInput = '';
let operator = '';
let shouldResetDisplay = false;

const resultDisplay = document.getElementById('result');

function updateDisplay(value) {
    resultDisplay.textContent = value;
}

document.querySelectorAll('.number').forEach(button => {
    button.addEventListener('click', () => {
        if (currentInput === '0' || shouldResetDisplay) {
            currentInput = button.getAttribute('data-number');
            shouldResetDisplay = false;
        } else {
            currentInput += button.getAttribute('data-number');
        }
        updateDisplay(currentInput);
    });
});

document.querySelectorAll('.operator').forEach(button => {
    button.addEventListener('click', () => {
        if (operator && previousInput && currentInput) {
            currentInput = calculate(previousInput, currentInput, operator);
            updateDisplay(currentInput);
        }
        operator = button.getAttribute('data-operator');
        previousInput = currentInput;
        shouldResetDisplay = true;
    });
});

document.getElementById('equals').addEventListener('click', () => {
    if (operator && previousInput && currentInput) {
        currentInput = calculate(previousInput, currentInput, operator);
        updateDisplay(currentInput);
        previousInput = '';
        operator = '';
    }
});

document.getElementById('clear').addEventListener('click', () => {
    currentInput = '0';
    previousInput = '';
    operator = '';
    shouldResetDisplay = false;
    updateDisplay('0');
});

function calculate(a, b, operator) {
    const prev = parseFloat(a);
    const curr = parseFloat(b);
    switch (operator) {
        case '+':
            return (prev + curr).toString();
        case '-':
            return (prev - curr).toString();
        case '*':
            return (prev * curr).toString();
        case '/':
            return (prev / curr).toString();
        case '**':
            return (prev ** curr).toString();
        case '%':
            return (prev % curr).toString();
        default:
            return b;
    }
}
