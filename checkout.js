document.addEventListener("DOMContentLoaded", () => {
    const paymentMethods = document.querySelectorAll('input[name="payment"]');
    const cardDetails = document.getElementById("cardDetails");

    paymentMethods.forEach(method => {
        method.addEventListener("change", () => {
            if (method.value === "visa" || method.value === "debit") {
                cardDetails.classList.remove("hidden");
            } else {
                cardDetails.classList.add("hidden"); 
            }
        });
    });


    document.getElementById("totalPrice").innerText = "0.00";
    document.getElementById("orderId").innerText = #${generateOrderId()};


    function generateOrderId() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }


    document.getElementById("checkoutForm").addEventListener("submit", (event) => {
        event.preventDefault();  

        const payment = document.querySelector('input[name="payment"]:checked');
        if (!payment) {
            alert("Please select a payment method.");
            return;
        }

        
        if ((payment.value === "visa" || payment.value === "debit") && !validateCardDetails()) {
            alert("Please enter valid card details.");
            return;
        }

        
        alert("Checkout successful!");
        
        document.getElementById("checkoutForm").reset(); 
        document.getElementById("totalPrice").innerText = "0.00"; 
        cardDetails.classList.add("hidden"); 
    });


    function validateCardDetails() {
        const cardNumber = document.getElementById("cardNumber").value;
        const expiry = document.getElementById("expiry").value;
        const cvv = document.getElementById("cvv").value;

        return cardNumber && expiry && cvv; 
    }
});