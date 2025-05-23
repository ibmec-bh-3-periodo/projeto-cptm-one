document.getElementById('signupForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Impede envio automático do formulário

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

        // Envia os dados para a API
        const response = await fetch("/login/cadastro", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ nome, sobrenome, email, senha, telefone })
        });

        const data = await response.json();
        console.log(data); // Para depuração

        if (data.success) {
            window.location.href = "/";
            alert(data.message); // Exibe mensagem de sucesso
             // Redireciona para a página de login (ajuste o caminho conforme sua estrutura real)
        } else {
            alert(data.message); // Mostra erro retornado da API
        }

    } catch (error) {
        console.error("Erro:", error);
        alert("Erro ao cadastrar. Tente novamente mais tarde.");
    }
});

function validateNome(nome) {
    if (!nome) throw new Error("Digite seu nome!");
}

function validateSobrenome(sobrenome) {
    if (!sobrenome) throw new Error("Digite seu sobrenome!");
}

function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) throw new Error("Digite um e-mail válido!");
}

function validateSenha(senha) {
    if (!senha || senha.length < 6) throw new Error("A senha deve ter pelo menos 6 caracteres!");
}

function validateTelefone(telefone) {
    const onlyNumbers = /^\d{10,11}$/;
    if (!onlyNumbers.test(telefone)) throw new Error("Digite um telefone válido com 10 ou 11 dígitos.");
}
