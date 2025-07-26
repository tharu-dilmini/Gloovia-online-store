document.addEventListener("DOMContentLoaded", function() {
    const brands = document.querySelectorAll('.brand');

    brands.forEach((brand, index) => {
        // Add fade-in effect for each brand
        brand.style.opacity = 0;
        brand.style.transition = `opacity 0.5s ease ${index * 0.2}s`; // Delay the fade-in for each brand

        setTimeout(() => {
            brand.style.opacity = 1;
        }, index * 200);

        // Apply shake effect on click
        brand.addEventListener('click', function() {
            brand.style.animation = "shake 0.3s";
            setTimeout(() => {
                brand.style.animation = ""; // Remove the shake effect after animation
            }, 300);
        });
    });
});

// Shake animation keyframes
const style = document.createElement('style');
style.innerHTML = `
@keyframes shake {
    0% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    50% { transform: translateX(5px); }
    75% { transform: translateX(-5px); }
    100% { transform: translateX(0); }
}`;
document.head.appendChild(style);
