document.addEventListener("DOMContentLoaded", () => {
    const inputBox = document.getElementById("inputbox");
    const buttons = document.querySelectorAll("button");
    let currentInput = "";
    let lastOperation = "";
    let shouldResetInput = false;

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const value = button.textContent;

            if (button.classList.contains("operator")) {
                handleOperator(value);
            } else if (button.classList.contains("equalBtn")) {
                calculateResult();
            } else if (button.classList.contains("ac")) {
                clearAll();
            } else if (button.classList.contains("del")) {
                deleteLast();
            } else {
                handleNumber(value);
            }
        });
    });

    function handleNumber(value) {
        if (shouldResetInput) {
            currentInput = "";
            shouldResetInput = false;
        }
        if (value === '.' && currentInput.includes('.')) return;
        currentInput += value;
        updateInputBox();
    }

    function handleOperator(value) {
        if (currentInput === "" && value !== "-") return;
        if (shouldResetInput) {
            currentInput = "";
            shouldResetInput = false;
        }
        currentInput += ` ${value} `;
        lastOperation = value;
        updateInputBox();
    }

    function calculateResult() {
        try {
            currentInput = currentInput.replace(/x/g, "*").replace(/÷/g, "/");
            currentInput = eval(currentInput).toString();
            shouldResetInput = true;
            updateInputBox();
        } catch {
            currentInput = "Error";
            shouldResetInput = true;
            updateInputBox();
        }
    }
    function clearAll() {
        currentInput = "";
        updateInputBox();
    }
    function deleteLast() {
        currentInput = currentInput.trim();
        if (currentInput.endsWith(lastOperation)) {
            currentInput = currentInput.slice(0, -3);
        } else {
            currentInput = currentInput.slice(0, -1);
        }
        updateInputBox();
    }

    function updateInputBox() {
        inputBox.value = currentInput;
    }
});
