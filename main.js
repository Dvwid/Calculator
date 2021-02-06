const buttons = document.querySelectorAll(".calculator__buttons p");
const screen = document.querySelector(".calculator__score_display p");

let firstValue = "";
let secondValue = "";
let firstOperator = "";
let secondOperator = "";
let lastScore = 0;
let fullScore = 0;
let calcIsDone = true;

const addNumbersToScreen = (element) => {
	if (calcIsDone) {
		screen.textContent = "";
		calcIsDone = false;
	}
	screen.textContent += element;
};

const calculate = (value1, value2, operator) => {
	if (operator === "+") {
		lastScore = value1 + value2;
		if (fullScore === 0) {
			fullScore += lastScore;
		} else {
			fullScore += value2;
		}
	} else if (operator === "-") {
		lastScore = value1 - value2;

		if (fullScore === 0) {
			fullScore = lastScore;
		} else {
			fullScore -= value2;
		}
	} else if (operator === "*") {
		lastScore = value1 * value2;
		if (fullScore === 0) {
			fullScore += lastScore;
		} else {
			fullScore *= value2;
		}
	} else if (operator === "/") {
		lastScore = value1 / value2;
		if (fullScore === 0) {
			fullScore += lastScore;
		} else {
			fullScore /= value2;
		}
	} else if (operator === "=") {
		console.log(secondOperator);
	}

	calcIsDone = true;
	screen.textContent = fullScore;
	firstValue = "";
	secondValue = "";
	firstOperator = secondOperator;
	secondOperator = "";
};

const setOperator = (element) => {
	if (
		firstOperator === element &&
		fullScore === 0 &&
		lastScore === 0 &&
		firstValue === ""
	) {
		firstValue = 0;
		calculate(firstValue, parseInt(screen.textContent), firstOperator);
		firstOperator = element;
	} else if (
		firstValue === "" &&
		secondValue === "" &&
		firstOperator !== "" &&
		firstOperator !== element &&
		screen.textContent !== ""
	) {
		console.log(element);

		firstValue = lastScore;
		secondValue = parseInt(screen.textContent);

		if (element !== "*" && firstOperator !== "*") {
			console.log(
				"Poprzednie działanie nie było mnożeniem, i wykonywane jest dodawanie lub odejmowanie"
			);
			calculate(firstValue, secondValue, firstOperator);
		} else if (firstOperator !== "*" && element === "*") {
			console.log(
				"Poprzednie działanie nie było mnożeniem, ale kliknięty element to mnożenie"
			);
			calculate(firstValue, secondValue, firstOperator);
		} else if (firstOperator === "*" && element === "*") {
			console.log(
				"Poprzednie działanie było mnożeniem i kliknięty element to mnożenie"
			);
			calculate(firstValue, 1, firstOperator);
		} else if (firstOperator === "*" && element !== "*") {
			console.log(
				"Poprzednie działanie było mnożeniem ale kolejny element nim nie jest"
			);
			calculate(firstValue, secondValue, firstOperator);
		} else {
			calculate(firstValue, secondValue, firstOperator);
		}
		firstOperator = element;
	} else if (
		// tu coś poszperać
		firstValue !== "" &&
		screen.textContent !== "" &&
		firstOperator !== element &&
		firstOperator !== "" &&
		calcIsDone === true
	) {
		if (screen.textContent === "0") {
			console.log("hahahaha");
		}

		secondValue = parseInt(screen.textContent);
		calculate(firstValue, secondValue, firstOperator);
		firstOperator = element;
	} else if (firstOperator !== element && firstOperator !== "") {
		secondValue = parseInt(screen.textContent);
		calculate(firstValue, secondValue, firstOperator);
		screen.textContent = fullScore;
		firstOperator = element;
	} else if (firstValue === "") {
		if (fullScore !== 0) {
			firstValue = fullScore;
			secondValue = parseInt(screen.textContent);
			calculate(firstValue, secondValue, firstOperator);
		}

		firstValue = parseInt(screen.textContent);
		firstOperator = element;
		screen.textContent = fullScore;
		calcIsDone = true;
	} else if (secondValue === "") {
		secondValue = parseInt(screen.textContent);
		secondOperator = element;

		calculate(firstValue, secondValue, firstOperator);
	} else if (firstValue !== "" && secondValue !== "") {
		calculate(firstValue, secondValue, firstOperator);
	}
};

const buttonHandleClick = function () {
	let element = this.textContent;
	if (element >= 0 && element < 10) {
		if (screen.textContent === "0" && element === "0") {
			console.log("Chce przypisać 0");
		} else {
			addNumbersToScreen(element);
		}
	} else if (
		element === "+" ||
		element === "-" ||
		element === "*" ||
		element === "/" ||
		element === "="
	) {
		setOperator(element);
	}
};

buttons.forEach((button) => {
	button.addEventListener("click", buttonHandleClick);
});
