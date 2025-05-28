document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Impede envio do formulário

    const emailField = document.getElementById('email'); // elemento input
    const senhaField = document.getElementById('senha');

    const emailValue = emailField.value.trim();  // valor digitado
    const senhaValue = senhaField.value.trim();

    try {
        validateEmail(emailValue);
        validateSenha(senhaValue);

        fetch("/login/verificacao", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: emailValue, senha: senhaValue })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                sessionStorage.setItem("userEmail", emailValue); // ← AQUI: salvando o valor, não o elemento!
                alert("Login bem-sucedido");
                window.location.href = "/pages/home.html";
            } else {
                alert(data.message);
            }
        })
        .catch(err => {
            console.error("Erro na requisição:", err);
            alert("Erro na conexão com o servidor.");
        });

    } catch (error) {
        alert("Erro: " + error.message);
    }
});

function validateEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!pattern.test(email)) throw new Error("E-mail inválido.");
    if (!email) throw new Error("Digite seu e-mail!");
}

function validateSenha(senha) {
    if (!senha) throw new Error("Digite sua senha!");
}
