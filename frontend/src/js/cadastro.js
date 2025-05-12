document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede envio automático

    // Coleta os valores dos inputs
    const nome = document.querySelector('input[name="nome"]').value.trim();
    const sobrenome = document.querySelector('input[name="sobrenome"]').value.trim();
    const email = document.getElementById('email').value.trim();
    const senha = document.querySelector('input[name="senha"]').value;
    const telefone = document.querySelector('input[name="telefone"]').value.trim();

    try {
        // Validações
        validateNome(nome);
        validateSobrenome(sobrenome);
        validateEmail(email);
        validateSenha(senha);
        validateTelefone(telefone);

        // Envia para a API
        fetch("http://localhost:3000/login/cadastro", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ nome, sobrenome, email, senha, telefone })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(data.message); // Exibe sucesso
                window.location.href = "frontend/src/pages/home.html";
            } else {
                alert(data.message); // Erro da API (ex: e-mail já cadastrado)
            }
        })
        .catch(error => {
            console.error("Erro:", error);
            alert("Erro ao cadastrar. Tente novamente mais tarde.");
        });

    } catch (error) {
        alert("Erro: " + error.message);
    }
});

// Funções de validação
function validateNome(nome) {
    if (nome === "") throw new Error("Digite seu nome!");
}

function validateSobrenome(sobrenome) {
    if (sobrenome === "") throw new Error("Digite seu sobrenome!");
}

function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) throw new Error("Digite um email válido!");
}

function validateSenha(senha) {
    if (senha.length < 6) throw new Error("A senha deve ter pelo menos 6 caracteres!");
}

function validateTelefone(telefone) {
    const onlyNumbers = /^\d{10,11}$/;
    if (!onlyNumbers.test(telefone)) throw new Error("Digite um telefone válido com 10 ou 11 dígitos.");
}
