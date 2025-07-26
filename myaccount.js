function validateForm() {
    let errorMessage = "";

    // Name validation
    const name = document.getElementById("name").value;
    if (name === "") {
        errorMessage += "Name is required. ";
    }

    // Email validation (simple regex pattern)
    const email = document.getElementById("email").value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        errorMessage += "Valid email is required. ";
    }

    // Address validation
    const address = document.getElementById("address").value;
    if (address === "") {
        errorMessage += "Address is required. ";
    }

    // Contact number validation (only numbers allowed, 10 digits)
    const contact = document.getElementById("contact").value;
    const contactPattern = /^[0-9]{10}$/;
    if (!contactPattern.test(contact)) {
        errorMessage += "Valid 10-digit contact number is required. ";
    }

    // Payment method validation (dropdown)
    const paymentMethod = document.getElementById("payment").value;
    if (paymentMethod === "") {
        errorMessage += "Please select a payment method. ";
    }

    // Display error messages if any
    if (errorMessage) {
        document.getElementById("errorMessages").innerText = errorMessage;
        return false; // Prevent form submission
    }

    // If no errors, show a pop-up message
    alert("Form submitted successfully!");
    return true; // Allow form submission if validation passes
}
