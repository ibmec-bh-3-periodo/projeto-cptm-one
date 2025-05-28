const track = document.querySelector('.carousel-track');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let numberOfTickets = 0; // Essa variável será preenchida via API
let currentIndex = 0;

// 🔹 Busca número de tickets do usuário logado
async function carregarQuantidadeDeTickets() {
    const email = sessionStorage.getItem("userEmail");
    if (!email) {
        alert("Usuário não autenticado.");
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/usuario/tickets/${encodeURIComponent(email)}`);
        if (!response.ok) throw new Error("Erro ao buscar tickets");

        const data = await response.json();
        numberOfTickets = data.tickets;

        console.log("Número de tickets do usuário:", numberOfTickets);

        gerarTickets();         // Renderiza os tickets
        updateCarousel();       // Atualiza o carrossel

    } catch (error) {
        console.error("Erro ao carregar número de tickets:", error);
    }
}

// 🎟️ Gera visualmente os tickets com base em `numberOfTickets`
function gerarTickets() {
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

    // ➕ Botão de comprar tickets
    const buyTicket = document.createElement("div");
    buyTicket.classList.add("ticket", "buy-ticket");
    buyTicket.innerHTML = `
        <a href="/pages/pagamento.html">
            <img src="/images/imghome/mais (1).png" alt="Comprar" class="buy-icon">
            <p>Comprar Tickets</p>
        </a>
    `;
    track.appendChild(buyTicket);
}

// 🔄 Atualiza visualmente o carrossel
function updateCarousel() {
    const ticketWidth = document.querySelector('.ticket')?.clientWidth || 0;
    track.style.transform = `translateX(-${currentIndex * ticketWidth}px)`;

    prevBtn.style.visibility = currentIndex === 0 ? 'hidden' : 'visible';
    nextBtn.style.visibility = currentIndex >= document.querySelectorAll('.ticket').length - 1 ? 'hidden' : 'visible';
}

// ⬅️ Botão Anterior
prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
});

// ➡️ Botão Próximo
nextBtn.addEventListener('click', () => {
    const ticketCount = document.querySelectorAll('.ticket').length;
    if (currentIndex < ticketCount - 1) {
        currentIndex++;
        updateCarousel();
    }
});

// 🚀 Inicia o carregamento ao abrir a página
window.onload = () => {
    carregarQuantidadeDeTickets();
};
