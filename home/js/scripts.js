document.addEventListener("DOMContentLoaded", function () {
    const carouselTickets = document.getElementById("carouselTickets");
    const ticketsPerItem = 3; // Número de tickets por "slide"
    let currentGroup = document.createElement("div");
    currentGroup.classList.add("carousel-item", "d-flex", "justify-content-center");

    // Função para adicionar tickets ao carrossel
    function addTicket(src) {
        const ticket = document.createElement("div");
        ticket.classList.add("ticket", "p-2");
        
        ticket.innerHTML = `
            <div class="imgticket">
                <img src="${src}" alt="Ticket" class="img-fluid">
            </div>
        `;

        currentGroup.appendChild(ticket);

        // Adiciona uma nova "carousel-item" ao atingir o limite de tickets
        if (currentGroup.children.length === ticketsPerItem) {
            if (carouselTickets.children.length === 0) {
                currentGroup.classList.add("active");
            }
            carouselTickets.appendChild(currentGroup);
            currentGroup = document.createElement("div");
            currentGroup.classList.add("carousel-item", "d-flex", "justify-content-center");
        }
    }

    // Função para finalizar qualquer grupo incompleto de tickets
    function finalizeTickets() {
        if (currentGroup.children.length > 0) {
            if (carouselTickets.children.length === 0) {
                currentGroup.classList.add("active");
            }
            carouselTickets.appendChild(currentGroup);
        }
    }

    // Exemplo de adição de múltiplos tickets
    const ticketSources = ["/home/img/ticket.png", "/home/img/ticket.png", "/home/img/ticket.png", "/home/img/ticket.png", "/home/img/ticket.png"];
    ticketSources.forEach(src => addTicket(src));
    finalizeTickets();
});