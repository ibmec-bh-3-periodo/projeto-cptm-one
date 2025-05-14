function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  // Padrão básico para validação de e-mail

    if (!emailPattern.test(email) && email!="") {
        throw new Error('O e-mail digitado não é válido. Por favor, insira um e-mail correto.');
    }
    if(email==""){
        throw new Error("Digite seu email!")
    }
}
module.exports = {validateEmail};