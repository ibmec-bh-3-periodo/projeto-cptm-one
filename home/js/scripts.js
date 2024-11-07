const track = document.querySelector('.carousel-track');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentIndex = 0;

// Função para atualizar a posição do carrossel
function updateCarousel() {
    const ticketWidth = document.querySelector('.ticket').clientWidth;
    track.style.transform = `translateX(-${currentIndex * ticketWidth}px)`;

    // Mostrar ou ocultar os botões conforme necessário
    prevBtn.style.visibility = currentIndex === 0 ? 'hidden' : 'visible';
    nextBtn.style.visibility = currentIndex === document.querySelectorAll('.ticket').length - 1 ? 'hidden' : 'visible';
}

// Botão "Próximo"
nextBtn.addEventListener('click', () => {
    const ticketCount = document.querySelectorAll('.ticket').length;
    if (currentIndex < ticketCount - 1) {
        currentIndex++;
        updateCarousel();
    }
});

// Botão "Anterior"
prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
});

// Inicializar a visibilidade dos botões
updateCarousel();