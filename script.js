const display = document.querySelector('#display');
let hiddingOperator = false;
let currentMemory = '';
let calculate = false;
let prevOperator = '';
let onlyNumber = false;
let usedDecimal = false;

const pressNumber = () => {
    const numbers = document.querySelectorAll('.number');
    numbers.forEach(number => {
        number.addEventListener('click', (e) => {
            let number = e.target.textContent;
            if (display.value.length > 12 && prevOperator === '' || usedDecimal && number === '.') {
                return false;
            }
            if (display.value === '0' || hiddingOperator) {
                if (number === '.') {
                    display.value += number;
                    usedDecimal = true;
                } else {
                    display.value = number;
                }
                hiddingOperator = false;
            } else {
                display.value += number;
                if (number === '.') {
                    usedDecimal = true;
                }
            }
            onlyNumber = false;
        });
    });
}

const pressOperation = () => {
    const operations = document.querySelectorAll('.operator');

    operations.forEach(operator => {
        operator.addEventListener('click', (e) => {
            let operator = e.target.textContent;
            hiddingOperator = true;

            if (!onlyNumber && prevOperator !== '=') {
                if (!calculate && operator !== '=') {
                    calculate = true;
                    currentMemory = display.value;
                } else {
                    if (prevOperator !== '' && prevOperator !== '=') {
                        currentMemory += prevOperator;
                    }

                    currentMemory += display.value;
                    currentMemory = (parseFloat(eval(currentMemory).toFixed(12)));
                    if (currentMemory === Infinity) {
                        currentMemory = 0;
                    }
                    display.value = currentMemory;
                }
                onlyNumber = true;
            }
            prevOperator = operator;
            usedDecimal = false;
        });
    });
}

const pressClearButton = () => {
    const clearButtons = document.querySelectorAll('.clear');
    clearButtons.forEach(clear => {
        clear.addEventListener('click', (e) => {
            let clearer = e.target.textContent;
            usedDecimal = false;
            display.value = '';

            if (clearer === 'c' || clearer === 'ce' && prevOperator === '=') {
                pendingOperator = false;
                currentMemory = '';
                calculate = false;
                prevOperator = '';
                onlyNumber = false;
            }
        })
    })
}

pressNumber();
pressOperation();
pressClearButton();
