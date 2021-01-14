const display = document.querySelector('#display');

let hiddingOperator = false;
let currentMemory = '';
let calculate = false;
let prevOperator = '';
let onlyNumber = false;
let usedDecimal = false;

const init = () => {
    const calcTable = document.querySelector('.calc-table');
    calcTable.addEventListener('click', (e) => {
        const buttonValue = e.target.textContent;
        if (e.target.classList.contains('number')) {
            onClickNumber(buttonValue);
        } else if (e.target.classList.contains('operator')) {
            onClickOperator(buttonValue);
        } else if (e.target.classList.contains('clear')) {
            onClickClear(buttonValue);
        }
    })
}

function onClickNumber(buttonValue) {
    if (display.value.length > 12 && prevOperator === '' || usedDecimal && buttonValue === '.') {
        return false;
    }
    if (display.value === '0' || hiddingOperator) {
        if (buttonValue === '.') {
            display.value += buttonValue;
            usedDecimal = true;
        } else {
            display.value = buttonValue;
        }
        hiddingOperator = false;
    } else {
        display.value += buttonValue;
        if (buttonValue === '.') {
            usedDecimal = true;
        }
    }
    onlyNumber = false;
}

function onClickOperator(buttonValue) {
    hiddingOperator = true;

    if (!onlyNumber && prevOperator !== '=') {
        if (!calculate && buttonValue !== '=') {
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
    prevOperator = buttonValue;
    usedDecimal = false;
}

function onClickClear(buttonValue) {
    usedDecimal = false;
    display.value = '';
    if (buttonValue === 'c' || buttonValue === 'ce' && prevOperator === '=') {
        pendingOperator = false;
        currentMemory = '';
        calculate = false;
        prevOperator = '';
        onlyNumber = false;
    }
}

init();