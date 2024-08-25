
document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    let currentInput = '';
    let operator = '';
    let firstOperand = '';

    
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const value = e.target.getAttribute('data-value');

            if (value === '=') {
                
                if (firstOperand && operator && currentInput) {
                    const result = calculate(firstOperand, operator, currentInput);
                    display.textContent = formatResult(result);
                    currentInput = display.textContent;
                    operator = '';
                    firstOperand = '';
                }
            } else if (value === 'C') {
               
                display.textContent = '0';
                currentInput = '';
                operator = '';
                firstOperand = '';
            } else if (['+', '-', '*', '/'].includes(value)) {
               
                if (currentInput) {
                    firstOperand = currentInput;
                    operator = value;
                    currentInput = '';
                }
            } else {
                
                if (display.textContent === '0' || operator) {
                    display.textContent = value;
                } else {
                    display.textContent += value;
                }
                currentInput = display.textContent;
            }
        });
    });

    function calculate(a, op, b) {
        a = parseFloat(a);
        b = parseFloat(b);
        switch(op) {
            case '+': return a + b;
            case '-': return a - b;
            case '*': return a * b;
            case '/': return b !== 0 ? a / b : 'Error';
            default: return 'Error';
        }
    }

    function formatResult(result) {
        if (result === 'Error' || isNaN(result)) {
            return 'Error';
        }
        
        return result % 1 === 0 ? result.toString() : result.toString();
    }
});
