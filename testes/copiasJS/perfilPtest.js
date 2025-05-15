
//----------
//ISSO É APENAS UMA FUNÇÃO DA PAGINA DE PERFIL

function saveProfileData() {
    const nomeInput = document.getElementById("nome");
    const emailInput = document.getElementById("email");
    const telefoneInput = document.getElementById("telefone");
  
    localStorage.setItem("nome", nomeInput.value);
    localStorage.setItem("email", emailInput.value);
    localStorage.setItem("telefone", telefoneInput.value);
  }
  
  module.exports = { saveProfileData };