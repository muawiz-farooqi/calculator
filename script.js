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
let equalsClicked = false;

const display = document.querySelector("#display");

// 0 1 2 3 4 5 6 7 8 9
const numbers = document.querySelectorAll(".number");

numbers.forEach((number) => {
    number.addEventListener("click", () => {
        if (display.value === "0" || equalsClicked) {
            display.value = number.textContent;
            equalsClicked = false;
        } else {
            display.value += number.textContent;
        }
    });
});

// + - * / =
const operators = document.querySelectorAll(".operator");
operators.forEach((operator) =>
    operator.addEventListener("click", () => {
        if (first_num === null) {
            first_num = Number(display.value);
            display.value = "0";
            curr_operator = operator.textContent;
        } else {
            second_num = Number(display.value);
            first_num = operate(curr_operator, first_num, second_num);
            curr_operator = operator.textContent;
            if (curr_operator === "=") {
                equalsClicked = true;
                display.value = first_num;
                first_num = null;
                second_num = null;
                curr_operator = null;
            } else {
                display.value = "0";
            }
        }
    }),
);

// AC
const clear = document.querySelector("#clear");
clear.addEventListener("click", () => {
    display.value = "0";
    first_num = null;
    second_num = null;
    curr_operator = null;
});

// backspace
const backspace = document.querySelector("#delete");
backspace.addEventListener("click", () => {
    if (display.value.length === 1) {
        display.value = "0";
    } else if (display.value.length > 1) {
        display.value = display.value.slice(0, -1);
    }
});
