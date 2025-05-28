document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Impede o envio do formulário até a validação ser realizada
    
    const emailInput = document.getElementById('email').value;
    const senhaInput = document.getElementById('senha').value;

    try {
        validateEmail(emailInput);        
        validateSenha(senhaInput);

        // Envio da requisição para a API
        fetch("/login/verificacao", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: emailInput,
                senha: senhaInput
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(data.message);  // Exibe mensagem de sucesso
                window.location.href = "/pages/home.html";  // Redireciona para a página de sucesso
            } else {
                alert(data.message);  // Exibe mensagem de erro
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao fazer login. Tente novamente mais tarde.');
        });

    } catch (error) {
        alert('Erro: ' + error.message);
    }
});

// Funções de validação
function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  // Padrão básico para validação de e-mail

    if (!emailPattern.test(email) && email !== "") {
        throw new Error('O e-mail digitado não é válido. Por favor, insira um e-mail correto.');
    }
    if (email === "") {
        throw new Error("Digite seu email!");
    }
}

function validateSenha(senha) {
    if (senha === "") {
        throw new Error("Digite sua senha!");
    }
}