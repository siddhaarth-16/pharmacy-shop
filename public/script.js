const API_URL = 'http://localhost:5000/api';
let cart = [];
let currentUser = null;

// Toggle Auth Modal
function toggleAuth() {
    const modal = document.getElementById('authModal');
    modal.classList.add('active');
}

function closeAuth() {
    const modal = document.getElementById('authModal');
    modal.classList.remove('active');
}

function switchTab(tab) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
    
    document.getElementById(tab + 'Form').classList.add('active');
    event.target.classList.add('active');
}

// Register
async function register() {
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const phone = document.getElementById('regPhone').value;
    const address = document.getElementById('regAddress').value;

    try {
        const response = await fetch(API_URL + '/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, phone, address })
        });
        const data = await response.json();
        alert(data.message);
        if (response.ok) closeAuth();
    } catch (error) {
        alert('Registration failed: ' + error.message);
    }
}

// Login
async function login() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch(API_URL + '/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (response.ok) {
            currentUser = data.user;
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            alert('Login successful!');
            closeAuth();
        } else {
            alert(data.message);
        }
    } catch (error) {
        alert('Login failed: ' + error.message);
    }
}

// Load Products
async function loadProducts() {
    try {
        const response = await fetch(API_URL + '/products');
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

// Display Products
function displayProducts(products) {
    const productsList = document.getElementById('productsList');
    productsList.innerHTML = '';
    
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <h3>${product.name}</h3>
            <p>${product.description || 'High-quality medicine'}</p>
            <p>Category: ${product.category || 'General'}</p>
            <p>Stock: ${product.stock}</p>
            <div class="product-price">₹${product.price}</div>
            <button onclick="addToCart(${product.id}, '${product.name}', ${product.price})">Add to Cart</button>
        `;
        productsList.appendChild(card);
    });
}

// Search Products
async function searchProducts() {
    const query = document.getElementById('searchInput').value;
    if (query.length === 0) {
        loadProducts();
        return;
    }

    try {
        const response = await fetch(API_URL + '/products/search/query?q=' + query);
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error searching products:', error);
    }
}

// Add to Cart
function addToCart(productId, productName, price) {
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ id: productId, name: productName, price, quantity: 1 });
    }
    displayCart();
    alert(productName + ' added to cart!');
}

// Display Cart
function displayCart() {
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>Quantity: ${item.quantity}</p>
                <p class="cart-item-price">₹${itemTotal}</p>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItems.appendChild(cartItem);
    });

    document.getElementById('totalPrice').textContent = total;
}

// Remove from Cart
function removeFromCart(index) {
    cart.splice(index, 1);
    displayCart();
}

// Checkout
async function checkout() {
    if (!currentUser) {
        alert('Please login first!');
        toggleAuth();
        return;
    }

    if (cart.length === 0) {
        alert('Cart is empty!');
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    try {
        const response = await fetch(API_URL + '/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user_id: currentUser.id,
                items: cart,
                total_amount: total
            })
        });
        const data = await response.json();
        if (response.ok) {
            alert('Order placed successfully! Order ID: ' + data.orderId);
            cart = [];
            displayCart();
        } else {
            alert(data.message);
        }
    } catch (error) {
        alert('Checkout failed: ' + error.message);
    }
}

// Scroll to Products
function scrollToProducts() {
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

// Check for logged-in user
function checkLogin() {
    const user = localStorage.getItem('user');
    if (user) {
        currentUser = JSON.parse(user);
    }
}

// Initialize
window.addEventListener('load', () => {
    checkLogin();
    loadProducts();
});
