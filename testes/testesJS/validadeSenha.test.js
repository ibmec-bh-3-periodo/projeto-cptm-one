const { validateSenha } = require('./validadeSenha.test');


describe('validateSenha', () => {
    test('deve aceitar senha não vazia', () => {
        expect(() => validateSenha("123456")).not.toThrow();
    });

    test('deve lançar erro se a senha estiver vazia', () => {
        expect(() => validateSenha("")).toThrow("Digite sua senha!");
    });
});