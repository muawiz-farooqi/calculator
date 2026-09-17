const add = (x, y) => x + y;
const subtract = (x, y) => x - y;
const divide = (x, y) => x / y;
const multiply = (x, y) => x * y;

function operate(operator, num1, num2) {
    switch (operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "/":
            return divide(num1, num2);
        case "*":
            return multiply(num1, num2);
    }
}

let first_num = null;
let second_num = null;
let curr_operator = null;
let operatorClicked = false;
const MAX_INPUT_DIGITS = 8;
const MAX_RESULT_DIGITS = 10;

const display = document.querySelector("#display");

// 0 1 2 3 4 5 6 7 8 9
const numbers = document.querySelectorAll(".number");

numbers.forEach((number) => {
    number.addEventListener("click", () => {
        if (display.value === "0" || operatorClicked) {
            display.value = number.innerText;
            operatorClicked = false;
        } else {
            if (display.value.length < MAX_INPUT_DIGITS) {
                display.value += number.innerText;
            }
        }
    });
});

// + - * / =
const operators = document.querySelectorAll(".operator");
operators.forEach((operator) =>
    operator.addEventListener("click", () => {
        if (operator.innerText === "=" && curr_operator === null) return;

        if (operatorClicked && first_num !== null) {
            curr_operator = operator.innerText;
            return;
        }
        operatorClicked = true;
        console.log(first_num, second_num, curr_operator)
        if (first_num === null) {
            console.log(first_num, second_num, curr_operator)
            first_num = Number(display.value);
            curr_operator = operator.innerText;
        } else {
            console.log(first_num, second_num, curr_operator)
            second_num = Number(display.value);

            // catch divide by zero
            if (curr_operator === "/" && second_num == 0) {
                display.value = "💥💥💥💥";
                first_num = null;
                second_num = null;
                curr_operator = null;
                return;
            }

            first_num = operate(curr_operator, first_num, second_num);
            curr_operator = operator.innerText;
            display.value = formatCalculatorDisplay(first_num);

            if (curr_operator === "=") {
                first_num = null;
                second_num = null;
                curr_operator = null;
            }
        }
    }),
);

// .
const decimal = document.querySelector("#decimal");
decimal.addEventListener("click", () => {
    if (operatorClicked) {
        display.value = "0.";
        operatorClicked = false;
    } else if (!display.value.includes(".")) {
        if (display.value.length < MAX_INPUT_DIGITS) {
            display.value = String(display.value) + ".";
        }
    }
});

// AC/clear
const clear = document.querySelector("#clear");
clear.addEventListener("click", () => {
    display.value = "0";
    first_num = null;
    second_num = null;
    curr_operator = null;
    operatorClicked = false;
});

// delete/backspace
const backspace = document.querySelector("#delete");
backspace.addEventListener("click", () => {
    if (display.value.length === 1) {
        display.value = "0";
    } else if (display.value.length > 1) {
        display.value = display.value.slice(0, -1);
    }
});

// toggle sign
const signToggle = document.querySelector("#toggle");
signToggle.addEventListener("click", () => {
    if (display.value !== 0) {
        display.value *= -1;
    }
});

// percentage
const percentage = document.querySelector("#percent");
percentage.addEventListener("click", () => {
    if (display.value !== "0" && display.value !== "💥💥💥💥") {
        let currentValue = Number(display.value);
        let pctValue = currentValue / 100;
        display.value = formatCalculatorDisplay(pctValue);
        // If they hit percent right after an operator, update the tracked state
        if (operatorClicked) {
            operatorClicked = false;
        }
    }
});

// keyboard support
document.addEventListener("keydown", (event) => {
    const pressedKey = event.key;

    const allButtons = document.querySelectorAll('#keys button');

    const matchingButton = Array.from(allButtons).find(button => {
        const dataKeys = button.getAttribute('data-key') || '';
        return dataKeys.split(/\s+/).includes(pressedKey);
    });
    console.log(pressedKey, matchingButton)

    if (matchingButton) {
        matchingButton.click();
    }
});

// formatting display
function formatCalculatorDisplay(value) {
    if (value === "0" || value === "0.") return value;

    let num = Number(value);
    if (isNaN(num)) return value;

    // scientific notation for large nums
    if (Math.abs(num) >= 10 ** MAX_RESULT_DIGITS) {
        return num.toExponential(2);
    }

    let formatted = num.toPrecision(MAX_INPUT_DIGITS);
    return Number(formatted).toString();
}
