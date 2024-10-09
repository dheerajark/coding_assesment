console.log('====================================');
console.log("Connected");
const apiUrl = 'https://cdn.shopify.com/s/files/1/0883/2188/4479/files/apiCartData.json?v=1728384889';

const cartList = document.getElementById('cart-list');
const subtotalElement = document.getElementById('subtotal');
const totalElement = document.getElementById('total');
let cartItems = [];

// Fetch Cart Data
async function fetchCartData() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        cartItems = data.items;
        displayCartItems(cartItems);
        calculateTotals(cartItems);
    } catch (error) {
        console.error("Error fetching cart data:", error);
    }
}

// Display Cart Items
function displayCartItems(items) {
    cartList.innerHTML = ''; // Clear any existing content
    items.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div>
                <h4>${item.title}</h4>
                <p>Price: ₹${(item.presentment_price / 100).toFixed(2)}</p>
                <p>Quantity: <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${item.id}, this.value)"></p>
            </div>
            <div>
                <p>Subtotal: ₹${(item.line_price / 100).toFixed(2)}</p>
                <button onclick="removeItem(${item.id})">🗑️</button>
            </div>
        `;
        cartList.appendChild(cartItem);
    });
}

// Calculate Totals
function calculateTotals(items) {
    let subtotal = 0;
    items.forEach(item => {
        subtotal += item.line_price;
    });
    subtotalElement.textContent = (subtotal / 100).toFixed(2);
    totalElement.textContent = (subtotal / 100).toFixed(2); // Assuming no additional tax
}

// Update Quantity
function updateQuantity(id, newQuantity) {
    const item = cartItems.find(item => item.id === id);
    if (item) {
        item.quantity = newQuantity;
        item.line_price = item.presentment_price * newQuantity;
        displayCartItems(cartItems);
        calculateTotals(cartItems);
    }
}

// Remove Item
function removeItem(id) {
    cartItems = cartItems.filter(item => item.id !== id);
    displayCartItems(cartItems);
    calculateTotals(cartItems);
}

// On page load
window.onload = fetchCartData;

console.log('====================================');
