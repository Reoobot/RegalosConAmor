document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    loadCart();
});

function loadProducts() {
    // Aquí simulas la carga de productos
    const products = [
        { id: 1, name: 'Torta de Chocolate', price: 10 },
        { id: 2, name: 'Torta de Fresa', price: 12 },
        { id: 3, name: 'Torta de Vainilla', price: 8 }
    ];

    const productsContainer = document.getElementById('products');
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <p>Precio: $${product.price}</p>
            <button onclick="addToCart(${product.id}, '${product.name}', ${product.price})">Agregar al Carrito</button>
        `;
        productsContainer.appendChild(productDiv);
    });
}

function addToCart(id, name, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ id, name, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Producto agregado al carrito');
}

function loadCart() {
    const cartItemsContainer = document.getElementById('cartItems');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `
            <h3>${item.name}</h3>
            <p>Precio: $${item.price}</p>
        `;
        cartItemsContainer.appendChild(itemDiv);
    });
}

document.getElementById('checkoutButton').addEventListener('click', () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length > 0) {
        alert('Procesando pago...');
        localStorage.removeItem('cart');
        window.location.href = 'index.html';
    } else {
        alert('El carrito está vacío');
    }
});
