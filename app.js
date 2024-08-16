document.addEventListener('DOMContentLoaded', () => {
    // Configurar el menú hamburguesa si está presente
    const menuToggle = document.querySelector('.menu-toggle');
    const navbar = document.querySelector('.navbar');

    if (menuToggle && navbar) {
        menuToggle.addEventListener('click', () => {
            navbar.classList.toggle('show');
        });
    }

    // Cargar productos y carrito si están disponibles en el HTML
    if (document.getElementById('products')) {
        loadProducts();
    }
    if (document.getElementById('cartItems')) {
        loadCart();
    }
});

// Ruta del archivo JSON
const productsUrl = 'https://reoobot.github.io/MarianyiFotos/data.json';

// Función para cargar los productos
function loadProducts() {
    fetch(productsUrl)
        .then(response => response.json())
        .then(products => {
            const productsContainer = document.getElementById('products');
            products.forEach(product => {
                // Crear elementos HTML para cada producto
                const productElement = document.createElement('div');
                productElement.classList.add('product');

                productElement.innerHTML = `
                    <img src="${product.url}" alt="${product.name}" class="product-image">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <p class="product-price">$${product.price}</p>
                    <button class="add-to-cart" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" data-url="${product.url}">Agregar al Carrito</button>
                `;

                productsContainer.appendChild(productElement);
            });

            // Agregar event listeners a los botones de agregar al carrito
            document.querySelectorAll('.add-to-cart').forEach(button => {
                button.addEventListener('click', () => {
                    const id = button.getAttribute('data-id');
                    const name = button.getAttribute('data-name');
                    const price = parseFloat(button.getAttribute('data-price'));
                    const url = button.getAttribute('data-url');

                    addToCart(id, name, price, url);
                });
            });
        })
        .catch(error => console.error('Error al cargar productos:', error));
}

// Función para agregar productos al carrito
function addToCart(id, name, price, url) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ id, name, price, url });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Producto agregado al carrito');
}

// Función para cargar los productos del carrito
function loadCart() {
    const cartItemsContainer = document.getElementById('cartItems');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    cartItemsContainer.innerHTML = ''; // Limpia el contenedor antes de cargar los artículos

    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.innerHTML = `
            <h3>${item.name}</h3>
            <p>Precio: $${item.price}</p>
            <img src="${item.url}" alt="${item.name}" class="cart-product-image">
        `;
        cartItemsContainer.appendChild(itemDiv);
    });
}

// Manejar el botón de pago en el carrito
const checkoutButton = document.getElementById('checkoutButton');
if (checkoutButton) {
    checkoutButton.addEventListener('click', () => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cart.length > 0) {
            alert('Procesando pago...');
            localStorage.removeItem('cart');
            window.location.href = 'index.html';
        } else {
            alert('El carrito está vacío');
        }
    });
}
