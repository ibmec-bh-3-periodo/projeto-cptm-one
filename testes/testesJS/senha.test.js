// teste do funcionamento da senha 
const { validateSenha } = require('../copiasJS/validateSenha'); 

describe('Função validateSenha', () => {
  test('deve lançar erro se a senha estiver vazia', () => {
    expect(() => validateSenha("")).toThrow("Digite sua senha!");
  });

  test('não deve lançar erro para senha não vazia', () => {
    expect(() => validateSenha("123456")).not.toThrow();
  });

  test('aceita senhas com caracteres especiais', () => {
    expect(() => validateSenha("Senha@2025!")).not.toThrow();
  });
});