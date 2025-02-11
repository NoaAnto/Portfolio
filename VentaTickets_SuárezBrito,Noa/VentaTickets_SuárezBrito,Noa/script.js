// Abrir modal al hacer clic en el botón de compra y detener el flip
document.querySelectorAll('.card button').forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation(); // Evitar que el clic en el botón active el flip
        document.getElementById('payment-modal').style.display = 'flex';
    });
});

// Alternar la clase flipped al hacer clic en la tarjeta
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
        const innerCard = card.querySelector('.card-inner');
        innerCard.classList.toggle('flipped');
    });
});

// Cerrar modal al hacer clic en la 'X'
document.querySelector('.close-button').addEventListener('click', () => {
    document.getElementById('payment-modal').style.display = 'none';
});

// Mostrar mensaje de confirmación al enviar el formulario
document.getElementById('payment-form').addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('payment-form').style.display = 'none';
    document.getElementById('confirmation-message').style.display = 'block';
});
