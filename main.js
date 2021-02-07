const buttons = document.querySelectorAll(".calculator__buttons p");
const screen = document.querySelector(".calculator__score_display p");

let firstValue = "";
let secondValue = "";
let firstOperator = "";
let secondOperator = "";
let lastScore = 0;
let fullScore = 0;
let calcIsDone = true;
let device = "desktop";

checkScore = () => {
	if (device === "desktop") {
		if (screen.textContent.length < 10) {
			screen.style.fontSize = "3vw";
		} else if (
			screen.textContent.length >= 10 &&
			screen.textContent.length <= 15
		) {
			screen.style.fontSize = "2vw";
		} else if (screen.textContent < 25) {
			screen.style.fontSize = "1.8vw";
		} else {
			screen.style.fontSize = "1.4vw";
		}
	} else {
		if (screen.textContent.length < 7) {
			screen.style.fontSize = "20vw";
		} else if (
			screen.textContent.length >= 7 &&
			screen.textContent.length <= 10
		) {
			screen.style.fontSize = "14vw";
		} else if (screen.textContent < 25) {
			screen.style.fontSize = "9vw";
		} else {
			screen.style.fontSize = "6vw";
		}
	}
};

const addNumbersToScreen = (element) => {
	if (calcIsDone && !screen.textContent.includes("0.")) {
		screen.textContent = "";
		calcIsDone = false;
	} else {
		calcIsDone = false;
		console.log(screen.textContent);
	}
	if (screen.textContent.length < 23) {
		screen.textContent += element;
	}

	checkScore();
};

const calculate = (value1, value2, operator) => {
	if (operator === "+") {
		if (!calcIsDone) {
			lastScore = value1 + value2;
			if (fullScore === 0) {
				fullScore += lastScore;
			} else {
				fullScore += value2;
			}
		} else {
			if (lastScore === 0) {
				lastScore = firstValue;
			} else {
				firstValue = lastScore;
				secondValue = 0;
			}
		}
	} else if (operator === "-") {
		if (!calcIsDone) {
			lastScore = value1 - value2;

			if (fullScore === 0) {
				fullScore = lastScore;
			} else {
				fullScore -= value2;
			}
		} else {
			if (lastScore === 0) {
				lastScore = firstValue;
			} else {
				firstValue = lastScore;
				secondValue = 0;
			}
		}
	} else if (operator === "*") {
		if (!calcIsDone) {
			lastScore = value1 * value2;
			if (fullScore === 0) {
				fullScore += lastScore;
			} else {
				fullScore *= value2;
			}
		} else {
			if (lastScore === 0) {
				lastScore = firstValue;
			} else {
				firstValue = lastScore;
				secondValue = 0;
			}
		}
	} else if (operator === "/") {
		if (!calcIsDone) {
			if (value2 !== 0) {
				lastScore = value1 / value2;
				if (fullScore === 0) {
					fullScore += lastScore;
				} else {
					fullScore /= value2;
				}
			} else {
				screen.textContent = "Nie można dzielić przez 0";
			}
		} else {
			if (lastScore === 0) {
				lastScore = firstValue;
			} else {
				firstValue = lastScore;
				secondValue = 0;
			}
		}
	} else if (operator === "=") {
		if (lastScore === 0) {
			lastScore = firstValue;
		} else {
			firstValue = lastScore;
			secondValue = 0;
		}
	}

	calcIsDone = true;
	screen.textContent = fullScore;
	firstValue = "";
	secondValue = "";
	firstOperator = secondOperator;
	secondOperator = "";
	checkScore();
};

const specialFunction = (element) => {
	if (element === "C") {
		firstOperator = "";
		secondOperator = "";
		lastScore = 0;
		fullScore = 0;
		firstValue = "";
		secondValue = "";
		calcIsDone = true;
		screen.textContent = fullScore;
	} else if (element === "CE") {
		screen.textContent = 0;
		calcIsDone = true;
	} else if (element === "%") {
		if (firstValue !== "") {
			secondValue = firstValue * (screen.textContent / 100);
			screen.textContent = secondValue;
		}
	} else if (element === "DEL") {
		if (screen.textContent !== "0" && screen.textContent !== "") {
			screen.textContent = screen.textContent.slice(
				0,
				screen.textContent.length - 1
			);
		}

		if (screen.textContent === "") {
			screen.textContent = 0;
			calcIsDone = true;
		}
	} else if (element === "1/x") {
		screen.textContent = 1 / screen.textContent;
	} else if (element === "x2") {
		screen.textContent = screen.textContent * screen.textContent;
	} else if (element === "√") {
		screen.textContent = Math.sqrt(screen.textContent);
	} else if (element === "+/-") {
		screen.textContent = screen.textContent * -1;
	} else if (element === ",") {
		if (screen.textContent.includes(".")) {
			throw Error("Item already contains a comma");
		} else {
			screen.textContent += ".";
		}
	}
	checkScore();
};

const setOperator = (element) => {
	if (
		firstOperator === element &&
		fullScore === 0 &&
		lastScore === 0 &&
		firstValue === ""
	) {
		firstValue = 0;
		calculate(firstValue, parseFloat(screen.textContent), firstOperator);
		firstOperator = element;
	} else if (
		firstValue === "" &&
		secondValue === "" &&
		firstOperator !== "" &&
		firstOperator !== element &&
		screen.textContent !== ""
	) {
		firstValue = lastScore;
		secondValue = parseFloat(screen.textContent);

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
		firstValue !== "" &&
		screen.textContent !== "" &&
		firstOperator !== element &&
		firstOperator !== "" &&
		calcIsDone === true
	) {
		if (screen.textContent === "0") {
			console.log("?");
		}

		secondValue = parseFloat(screen.textContent);
		calculate(firstValue, secondValue, firstOperator);
		firstOperator = element;
	} else if (firstOperator !== element && firstOperator !== "") {
		secondValue = parseFloat(screen.textContent);
		calculate(firstValue, secondValue, firstOperator);
		screen.textContent = fullScore;
		firstOperator = element;
	} else if (firstValue === "") {
		if (fullScore !== 0) {
			firstValue = fullScore;
			secondValue = parseFloat(screen.textContent);
			calculate(firstValue, secondValue, firstOperator);
		}

		firstValue = parseFloat(screen.textContent);
		firstOperator = element;
		screen.textContent = fullScore;
		calcIsDone = true;
	} else if (secondValue === "") {
		secondValue = parseFloat(screen.textContent);
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
			screen.textContent = "0";
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
	} else if (
		element === "CE" ||
		element === "%" ||
		element === "C" ||
		element === "DEL" ||
		element === "1/x" ||
		element === "x2" ||
		element === "√" ||
		element === "+/-" ||
		element === ","
	) {
		specialFunction(element);
	}
};

buttons.forEach((button) => {
	button.addEventListener("click", buttonHandleClick);
});

checkDevice = () => {
	if (this.screen.width > 1024) {
		device = "desktop";
	} else {
		device = "mobile";
	}
};
window.onload = checkDevice();
