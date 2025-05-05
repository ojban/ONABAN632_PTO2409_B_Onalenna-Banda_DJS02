const form = document.querySelector("[data-form]");
const result = document.querySelector("[data-result]");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  try {
    const entries = new FormData(event.target);
    const { dividend, divider } = Object.fromEntries(entries);

    // Scenario: Validation when values are missing.
    if (!dividend.trim() || !divider.trim()) {
      result.innerText =
        "Division not performed. Both values are required in inputs. Try again";
      return;
    }

    // Convert input values to numbers.
    const dividendNumber = Number(dividend);
    const dividerNumber = Number(divider);

    // Scenario: Providing anything that is not a number should crash the program.
    if (isNaN(dividendNumber) || isNaN(dividerNumber)) {
      throw new Error("Non-numeric input provided");
    }

    // Scenario: An invalid division (division by zero).
    if (dividerNumber === 0) {
      result.innerText =
        "Division not performed. Invalid number provided. Try again";
      console.error(new Error("Division by zero error"));
      return;
    }

    // Perform division.
    let divisionResult = dividendNumber / dividerNumber;
    // Scenario: Dividing numbers result in a decimal number.
    // Remove the decimal portion so that 20 ÷ 3 becomes 6.
    divisionResult = Math.trunc(divisionResult);

    result.innerText = divisionResult;
  } catch (error) {
    // Log the error with its call stack.
    console.error(error);
    // Replace the entire screen with a critical error message.
    document.body.innerText =
      "Something critical went wrong. Please reload the page";
  }
});
