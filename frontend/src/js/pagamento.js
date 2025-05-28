async function carregarTicketsDisponiveis() {
    const email = sessionStorage.getItem("userEmail");
    const spanTicketCount = document.getElementById("ticketCount");

    if (!email) {
        spanTicketCount.textContent = "Usuário não autenticado.";
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/usuario/tickets/${encodeURIComponent(email)}`);
        if (!response.ok) throw new Error("Erro ao buscar tickets");

        const data = await response.json();
        const quantidade = data.tickets;

        if (quantidade === 1) {
            spanTicketCount.textContent = "1 ticket disponível para uso";
        } else {
            spanTicketCount.textContent = `${quantidade} tickets disponíveis para uso`;
        }

    } catch (error) {
        console.error("Erro ao carregar tickets:", error);
        spanTicketCount.textContent = "Erro ao carregar os tickets.";
    }
}

// Chama a função assim que a página carrega
window.onload = carregarTicketsDisponiveis;
