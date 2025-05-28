const nomeInput = document.getElementById("nome");
const emailInput = document.getElementById("email");
const telefoneInput = document.getElementById("telefone");
const greeting = document.getElementById("greeting");
const sair = document.getElementById("save");

sair.addEventListener("click", function() {
    sessionStorage.removeItem("userEmail");
    window.location.href = "/";
});


function getLoggedUserEmail() {
    const email = sessionStorage.getItem("userEmail");
    if (!email) {
        alert("Usuário não autenticado.");
        window.location.href = "/";
    }
    return email;
}

async function loadProfile() {
    const email = getLoggedUserEmail();

    try {
        const response = await fetch(`http://localhost:3000/usuario/perfil/${encodeURIComponent(email)}`);
        if (!response.ok) throw new Error("Erro ao buscar perfil");

        const data = await response.json();

        nomeInput.value = `${data.nome} ${data.sobrenome}`.trim(); // nome completo
        emailInput.value = data.email || '';
        telefoneInput.value = data.telefone || '';
        greeting.textContent = `Seja Bem-Vindo, ${data.nome}!`;
    } catch (error) {
        console.error("Erro ao carregar perfil:", error);
        alert("Erro ao carregar os dados do perfil.");
    }
}

window.onload = loadProfile;




