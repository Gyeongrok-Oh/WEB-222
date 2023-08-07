const emailInput = document.getElementById("email");
const emailErrorMessage = document.getElementById("email-error-message");

// Function to check if the email is valid
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate the email input before submitting the form
document.getElementById("newsletter-form").addEventListener("submit", function (event) {
  if (!isValidEmail(emailInput.value)) {
    emailErrorMessage.style.display = "block"; // Show the error message
    event.preventDefault();
  } else {
    emailErrorMessage.style.display = "none"; // Hide the error message if valid
  }
});
