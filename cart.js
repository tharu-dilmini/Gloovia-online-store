
function addToCart(productId, productName, productPrice, productImage) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || []; 
    let existingProduct = cartItems.find(item => item.id === productId); 

    if (existingProduct) {
        existingProduct.quantity += 1; 
    } else {
        let product = {
            id: productId,
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: 1
        };
        cartItems.push(product); 
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems)); 
    alert('Product added to cart');
}

