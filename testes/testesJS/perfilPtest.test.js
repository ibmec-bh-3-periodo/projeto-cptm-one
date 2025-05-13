
const { saveProfileData }  = require('../copiasJS/perfilPtest.js');

describe('saveProfileData', () => {
  let nomeInput, emailInput, telefoneInput;

  beforeEach(() => {
    // Configura o HTML simulado
    document.body.innerHTML = `
      <input id="nome" />
      <input id="email" />
      <input id="telefone" />
    `;

    nomeInput = document.getElementById('nome');
    emailInput = document.getElementById('email');
    telefoneInput = document.getElementById('telefone');

    // Simula que o usuário preencheu os campos
    nomeInput.value = 'Mateus';
    emailInput.value = 'mateus@example.com';
    telefoneInput.value = '123456789';

    // Limpa o localStorage antes de cada teste
    localStorage.clear();

    // Aqui NÃO chamamos a função ainda — chamamos no teste
  });

  it('salva o nome, email e telefone no localStorage', () => {
    saveProfileData(); // Executa a função

    expect(localStorage.getItem('nome')).toBe('Mateus');
    expect(localStorage.getItem('email')).toBe('mateus@example.com');
    expect(localStorage.getItem('telefone')).toBe('123456789');
  });
});