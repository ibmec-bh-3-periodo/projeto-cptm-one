// Função acionada ao clicar em "Usar Ticket"
document.getElementById("usarTicketBtn").addEventListener("click", async () => {
  const email = sessionStorage.getItem("userEmail");

  if (!email) {
    alert("Usuário não autenticado.");
    window.location.href = "/pages/home.html";
    return;
  }

  try {
    // Buscar dados do usuário primeiro
    const response = await fetch(`http://localhost:3000/usuario/tickets/${encodeURIComponent(email)}`);
    if (!response.ok) throw new Error("Erro ao buscar dados do usuário");
    const user = await response.json();

    if (user.tickets <= 0) {
      alert("Você não possui tickets disponíveis. Redirecionando para compra.");
      window.location.href = "/pages/pagamento.html";
      return;
    }

    // Se possui ticket, atualiza via API
    const update = await fetch("http://localhost:3000/usuario/usar-ticket", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email })
    });

    const result = await update.json();

    if (result.success) {
      alert("Ticket utilizado com sucesso!");
      // Opcional: Atualiza a página ou redireciona
      window.location.href = "/pages/home.html";
    } else {
      alert(result.message || "Erro ao usar ticket.");
    }

  } catch (error) {
    console.error("Erro:", error);
    alert("Erro ao processar o uso do ticket.");
  }
});
