document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();  
    
    const emailInput = document.getElementById('email').value;
    const senhaInput = document.getElementById('senha').value;

    try {
        validateEmail(emailInput);        
        try {
            validateSenha(senhaInput);
            alert("Login efetuado com sucesso!")
            window.location.href ="./frontend/src/pages/home.html";
        } catch (error) {
            alert('Erro: ' + error.message);
        }
    } catch (error) {
        alert('Erro: ' + error.message);
    }

});

function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  

    if (!emailPattern.test(email) && email!="") {
        throw new Error('O e-mail digitado não é válido. Por favor, insira um e-mail correto.');
    }
    if(email==""){
        throw new Error("Digite seu email!")
    }
}
function validateSenha(senha){
    if(senha==""){
        throw new Error("Digite sua senha!")
    }
}