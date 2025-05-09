const nomeInput = document.getElementById("nome");
const emailInput = document.getElementById("email");
const telefoneInput = document.getElementById("telefone");
const imageUpload = document.getElementById("imageUpload");
const profileImage = document.getElementById("profileImage");
const greeting = document.getElementById("greeting");

// Função para carregar os dados salvos no localStorage
function loadProfileData() {
    const savedName = localStorage.getItem("nome");
    const savedEmail = localStorage.getItem("email");
    const savedTelefone = localStorage.getItem("telefone");
    const savedImage = localStorage.getItem("profileImage");

    if (savedName) {
        nomeInput.value = savedName;
        greeting.textContent = `Olá, ${savedName}`;
    }
    if (savedEmail) emailInput.value = savedEmail;
    if (savedTelefone) telefoneInput.value = savedTelefone;
    if (savedImage) profileImage.src = savedImage;
}

// Função para salvar os dados no localStorage
function saveProfileData() {
    localStorage.setItem("nome", nomeInput.value);
    localStorage.setItem("email", emailInput.value);
    localStorage.setItem("telefone", telefoneInput.value);
}

// Evento para salvar a imagem no localStorage e exibi-la
imageUpload.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            profileImage.src = e.target.result;
            localStorage.setItem("profileImage", e.target.result);
        };
        reader.readAsDataURL(file);
    }
});

// Eventos para salvar os campos de texto no localStorage quando forem modificados
nomeInput.addEventListener("input", saveProfileData);
emailInput.addEventListener("input", saveProfileData);
telefoneInput.addEventListener("input", saveProfileData);