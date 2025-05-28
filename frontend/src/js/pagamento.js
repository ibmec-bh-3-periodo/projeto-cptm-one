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

async function comprarTicket() {
    const email = sessionStorage.getItem("userEmail");
    if (!email) {
        alert("Usuário não autenticado.");
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/usuario/comprar-ticket", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });

        const data = await response.json();
        if (response.ok && data.success) {
            alert("Ticket comprado!");
            carregarTicketsDisponiveis(); // corrigido: nome correto da função
        } else {
            alert("Erro: " + data.message);
        }
    } catch (error) {
        console.error("Erro ao comprar ticket:", error);
        alert("Erro ao processar a compra do ticket.");
    }
}

window.onload = carregarTicketsDisponiveis;
