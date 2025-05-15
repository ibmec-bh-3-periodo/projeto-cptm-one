const {validateEmail} = require('../copiasJS/validateEmail');

describe('validarEmail', () => {
    test('deve retornar true para um email válido', () => {
        const email = 'teste@exemplo.com';
        expect(() => validateEmail(email)).not.toThrow();
    });

    test('deve lançar um erro para um email inválido', () => {
        const email = 'email-invalido';
        expect(() => validateEmail(email)).toThrow('O e-mail digitado não é válido. Por favor, insira um e-mail correto.');
    });

    test('deve lançar um erro para uma string vazia', () => {
        const email = '';
        expect(() => validateEmail(email)).toThrow('Digite seu email!');
    });

    test('deve lançar um erro para um valor nulo', () => {
        const email = null;
        expect(() => validateEmail(email)).toThrow('O e-mail digitado não é válido. Por favor, insira um e-mail correto.');
    });

    test('deve lançar um erro para um valor indefinido', () => {
        const email = undefined;
        expect(() => validateEmail(email)).toThrow('O e-mail digitado não é válido. Por favor, insira um e-mail correto.');
    });
});