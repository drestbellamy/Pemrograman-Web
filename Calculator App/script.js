let expression = '';
const expressionDisplay = document.getElementById('expression');

function updateDisplay() {
    expressionDisplay.textContent = expression || '0';
}

document.querySelectorAll('.number, .operator').forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-number') || button.getAttribute('data-operator');
        if (value) {
            if (['+', '-', '', '/', '%', '^'].includes(value) && expression && '/+-%^'.includes(expression.slice(-1))) return;
            expression += value === 'x²' ? '^' : ' ' + value + ' ';
            updateDisplay();
        }   
    });
});

document.getElementById('equals').addEventListener('click', () => {
    try {
        expression = evaluateExpression(expression).toString();
    } catch {
        expression = 'Error';
    }
    updateDisplay();
});

document.getElementById('clear').addEventListener('click', () => {
    expression = '';
    updateDisplay();
});

function evaluateExpression(expr) {
    const tokens = expr.split(' ').filter(Boolean);
    const values = [];
    const ops = [];

    tokens.forEach(token => {
        if (!isNaN(token)) values.push(parseFloat(token));
        else {
            while (ops.length && precedence(ops[ops.length - 1]) >= precedence(token)) {
                const b = values.pop(), a = values.pop(), op = ops.pop();
                values.push(calculate(a, b, op));
            }
            ops.push(token);
        }
    });

    while (ops.length) {
        const b = values.pop(), a = values.pop(), op = ops.pop();
        values.push(calculate(a, b, op));
    }

    return values[0];
}

function precedence(op) {
    if (op === '+' || op === '-') return 1;
    if (op === '*' || op === '/' || op === '%') return 2;
    if (op === '^') return 3;
    return 0;
}

const calculate = (a, b, operator) => {
    switch (operator) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return a / b;
        case '%': return a % b;
        case '^': return Math.pow(a, b);
        default: return b;
    }
};