
const { saveProfileData } = require('../copiasJS/perfilPtest.js');

describe('(função saveProfileData), teste se os dados estão sendo salvos', () => {
    beforeEach(() => {
      // simulação
      document.body.innerHTML = `
        <form id="profileForm">
          <input type="text" id="nome" value="Mateus" />
          <input type="email" id="email" value="mateus@email.com" />
          <input type="tel" id="telefone" value="123456789" />
        </form>
      `;
      // Limpar o localStorage antes
      localStorage.clear();
    });
  
    test('salva os dados no localStorage corretamente, deixando visual ao usuário', () => {
      saveProfileData();
  
      expect(localStorage.getItem("nome")).toBe("Mateus");
      expect(localStorage.getItem("email")).toBe("mateus@email.com");
      expect(localStorage.getItem("telefone")).toBe("123456789");
    });
  });