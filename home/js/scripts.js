const track = document.querySelector('.carousel-track');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentIndex = 0;

// Função para atualizar a posição do carrossel
function updateCarousel() {
    const ticketWidth = document.querySelector('.ticket').clientWidth;
    track.style.transform = `translateX(-${currentIndex * ticketWidth}px)`;
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