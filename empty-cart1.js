
document.addEventListener('DOMContentLoaded', () => {
    loadCartItems(); 
    showSlides(); 
    setupCheckout(); 
});


function loadCartItems() {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    renderCart(cartItems); 
}


function renderCart(cartItems) {
    const cartTableBody = document.querySelector('#cartTable tbody');
    cartTableBody.innerHTML = ''; 

    if (cartItems.length === 0) {
        
        cartTableBody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align:center;">
                    <img src="empty-cart.png" alt="Empty Cart" width="auto" >
                    <p>Your cart is empty!</p>
                </td>
            </tr>
        `;
        document.querySelector('.cart-summary').style.display = 'none'; 
        return;
    }

    document.querySelector('.cart-summary').style.display = 'block'; 
    let total = 0;

    
    cartItems.forEach(item => {
        const itemTotal = item.price * item.quantity; 
        total += itemTotal; 

        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${item.image}" alt="${item.name}" width="50"></td>
            <td>${item.name}</td>
            <td>${item.id}</td>
            <td>
                <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity('${item.id}', this.value)">
            </td>
            <td>${item.price}</td>  // Removed dollar sign here
            <td>${itemTotal.toFixed(2)}</td>  // Removed dollar sign here
            <td><button onclick="removeFromCart('${item.id}')">Remove</button></td>
        `;
        cartTableBody.appendChild(row); 
    });

    
    document.getElementById('cartTotal').innerText = `${total.toFixed(2)}`; 
}


function removeFromCart(productId) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems = cartItems.filter(item => item.id !== productId); 
    localStorage.setItem('cartItems', JSON.stringify(cartItems)); 
    loadCartItems(); 
}


function updateQuantity(productId, quantity) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let product = cartItems.find(item => item.id === productId);
    if (product) {
        product.quantity = parseInt(quantity); 
        localStorage.setItem('cartItems', JSON.stringify(cartItems)); 
        loadCartItems(); 
    }
}


let slideIndex = 0; 
function showSlides() {
    const slides = document.querySelectorAll('.slide');
    slides.forEach(slide => {
        slide.style.display = 'none'; 
    });

    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1; 
    }

    slides[slideIndex - 1].style.display = 'block';  
    setTimeout(showSlides, 5000); 
}

function setupCheckout() {
    const cartTotal = calculateCartTotal();
    document.getElementById("totalPrice").innerText = `${cartTotal.toFixed(2)}`; 
    document.getElementById("orderId").innerText = `#${generateOrderId()}`; 

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
    });
}

function calculateCartTotal() {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
}


function generateOrderId() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}


function validateCardDetails() {
    const cardNumber = document.getElementById("cardNumber").value;
    const expiry = document.getElementById("expiry").value;
    const cvv = document.getElementById("cvv").value;

    return cardNumber && expiry && cvv;
}
