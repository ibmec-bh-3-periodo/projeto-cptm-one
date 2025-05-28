const track = document.querySelector('.carousel-track');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// 🔢 Quantidade de tickets a exibir
const numberOfTickets = 2;

// 🎟️ Gera os tickets dinamicamente
for (let i = 0; i < numberOfTickets; i++) {
    const ticketDiv = document.createElement("div");
    ticketDiv.classList.add("ticket");

    const link = document.createElement("a");
    link.href = "/pages/ticketemuso.html";

    const img = document.createElement("img");
    img.src = "/images/imghome/ticket.png";
    img.alt = `Ticket ${i + 1}`;

    link.appendChild(img);
    ticketDiv.appendChild(link);
    track.appendChild(ticketDiv);
}

// ➕ Adiciona o botão "Comprar Tickets"
const buyTicket = document.createElement("div");
buyTicket.classList.add("ticket", "buy-ticket");
buyTicket.innerHTML = `
    <a href="/pages/pagamento.html">
        <img src="/images/imghome/mais (1).png" alt="Comprar" class="buy-icon">
        <p>Comprar Tickets</p>
    </a>
`;
track.appendChild(buyTicket);

// 📦 Atualiza o carrossel
let currentIndex = 0;

function updateCarousel() {
    const ticketWidth = document.querySelector('.ticket').clientWidth;
    track.style.transform = `translateX(-${currentIndex * ticketWidth}px)`;

    prevBtn.style.visibility = currentIndex === 0 ? 'hidden' : 'visible';
    nextBtn.style.visibility = currentIndex >= document.querySelectorAll('.ticket').length - 1 ? 'hidden' : 'visible';
}

nextBtn.addEventListener('click', () => {
    const ticketCount = document.querySelectorAll('.ticket').length;
    if (currentIndex < ticketCount - 1) {
        currentIndex++;
        updateCarousel();
    }
});

prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
});

// Inicializa o carrossel com os botões corretos
updateCarousel();
