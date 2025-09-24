async function loadProducts() {
    try {
        const response = await fetch('products.json');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Failed to load products:', error);
    }
}

function displayProducts(products) {
    const productList = document.getElementById('product-list');
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';

        productDiv.innerHTML = `
      <img src="${product.image_url}" alt="${product.title}" />
      <div class="product-details">
        <h2>${product.title}</h2>
        <p><strong>Price:</strong> $${product.price.toFixed(2)}</p>
        <p>${product.description}</p>
        <button class="add-to-cart">Add to Cart</button>
      </div>
    `;

        const button = productDiv.querySelector('.add-to-cart');
        button.addEventListener('click', () => {
            addToCart(product);
            renderCart();
        });

        productList.appendChild(productDiv);
    });
}

function addToCart(product) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const cartItem = {
        id: product.id,
        name: product.title,
        price: product.price
    };

    cart.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.title} added to cart!`);
}

function renderCart() {
    const cartList = document.getElementById('cart-list');
    cartList.innerHTML = ''; // Clear previous content

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        cartList.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    cart.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.style.marginBottom = '10px';

        itemDiv.innerHTML = `
      <p><strong>${item.name}</strong> - $${item.price.toFixed(2)}</p>
      <button class="remove-from-cart">Remove</button>
    `;

        const removeBtn = itemDiv.querySelector('.remove-from-cart');
        removeBtn.addEventListener('click', () => {
            removeFromCart(index);
        });

        cartList.appendChild(itemDiv);
    });
}

function removeFromCart(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

let products = [
    { id: 1001, name: "EARTHWORM JIM 3D", price: 59.99 },
    { id: 1002, name: "VIDEO GAME 2", price: 59.99 },
    { id: 1003, name: "VIDEO GAME 3", price: 59.99 },
    { id: 1004, name: "VIDEO GAME 4", price: 59.99 },
    { id: 1005, name: "VIDEO GAME 5", price: 59.99 },
    { id: 1006, name: "VIDEO GAME 6", price: 59.99 },
    { id: 1007, name: "VIDEO GAME 7", price: 59.99 },
    { id: 1008, name: "VIDEO GAME 8", price: 59.99 },
    { id: 1009, name: "VIDEO GAME 9", price: 59.99 },
    { id: 1010, name: "VIDEO GAME 10", price: 59.99 },
    { id: 1011, name: "VIDEO GAME 11", price: 59.99 },
    { id: 1012, name: "VIDEO GAME 12", price: 59.99 },
    { id: 1013, name: "VIDEO GAME 13", price: 59.99 },
    { id: 1014, name: "VIDEO GAME 14", price: 59.99 },
    { id: 1015, name: "VIDEO GAME 15", price: 59.99 },
    { id: 1016, name: "VIDEO GAME 16", price: 59.99 },
    { id: 1017, name: "VIDEO GAME 17", price: 59.99 },
    { id: 1018, name: "VIDEO GAME 18", price: 59.99 },
    { id: 1019, name: "VIDEO GAME 19", price: 59.99 },
    { id: 1020, name: "VIDEO GAME 20", price: 59.99 }
];

function searchProducts(query) {
    return products.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase())
    );
}

function displaySearchResults(results) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Clear previous results

    results.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';

        productDiv.innerHTML = `
      <div class="product-details">
        <h2>${product.name}</h2>
        <p><strong>Price:</strong> $${product.price.toFixed(2)}</p>
        <button class="add-to-cart">Add to Cart</button>
      </div>
    `;

        const button = productDiv.querySelector('.add-to-cart');
        button.addEventListener('click', () => {
            addToCart(product);
            renderCart();
        });

        productList.appendChild(productDiv);
    });
}

document.getElementById('search-input').addEventListener('input', (e) => {
    const query = e.target.value;
    const results = searchProducts(query);
    displaySearchResults(results);
});

loadProducts();
renderCart(); // Load cart on page load