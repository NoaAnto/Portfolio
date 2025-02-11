document.addEventListener("DOMContentLoaded", function() {
    const cartButtons = document.querySelectorAll('.add-to-cart');
    const cartItemsList = document.getElementById('cartItems');
    const totalPriceElement = document.getElementById('totalPrice');
    
    // Recuperar el carrito del almacenamiento local o inicializar un array vacío
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Función para actualizar el precio total del carrito
    const updateTotalPrice = () => {
        const total = cart.reduce((acc, item) => acc + item.quantity * parseFloat(item.price), 0);
        totalPriceElement.textContent = `Total: ${total.toFixed(2)}€`;
    };

    // Función para actualizar la vista del carrito en el modal
    const updateCartModal = () => {
        cartItemsList.innerHTML = '';
        if (cart.length === 0) {
            cartItemsList.innerHTML = '<li>El carrito está vacío.</li>';
        } else {
            cart.forEach((item, index) => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <span>${item.name} - ${item.quantity} x ${item.price}€</span>
                    <button class="remove-item" data-index="${index}">Eliminar</button>
                `;
                cartItemsList.appendChild(li);
            });

            // Asignar funcionalidad a los botones de eliminar
            document.querySelectorAll('.remove-item').forEach(button => {
                button.addEventListener('click', (e) => {
                    const index = e.target.dataset.index;
                    cart.splice(index, 1);
                    localStorage.setItem('cart', JSON.stringify(cart));
                    updateCartModal();
                    updateTotalPrice();
                });
            });
        }
    };

    // Función para añadir productos al carrito
    const addToCart = (product, price, imageSrc) => {
        const productId = product;
        const productName = product;
        const productPrice = parseFloat(price);

        // Buscar si el producto ya está en el carrito
        const productExists = cart.find(item => item.id === productId);
        if (productExists) {
            productExists.quantity += 1;
        } else {
            cart.push({
                id: productId,
                name: productName,
                price: productPrice.toFixed(2),
                quantity: 1,
                image: imageSrc
            });
        }

        // Guardar el carrito en el almacenamiento local
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${productName} añadido al carrito.`);
        updateTotalPrice();
    };

    // Agregar productos al carrito al hacer clic en los botones de agregar
    cartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.dataset.id;
            const productName = this.dataset.name;
            const productPrice = parseFloat(this.closest('.product-card').querySelector('.product-price').textContent.replace('€', ''));
            const productImage = this.closest('.product-card').querySelector('.product-image').src;
            
            addToCart(productName, productPrice, productImage);
        });
    });

    // Mostrar el carrito en el modal
    window.showCart = function() {
        updateCartModal();
        updateTotalPrice();
        document.getElementById('cartModal').style.display = 'block';
    };

    // Cerrar el carrito
    window.closeCart = function() {
        document.getElementById('cartModal').style.display = 'none';
    };

    // Vaciar el carrito
    window.clearCart = function() {
        cart = [];
        localStorage.removeItem('cart');
        updateCartModal();
        updateTotalPrice();
    };
});
