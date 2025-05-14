const validadeEmail = require('../copiasJS/validateEmail');

describe('validadeEmail', () => {
    test('should return true for a valid email', () => {
        const email = 'test@example.com';
        expect(validadeEmail(email)).toBe(true);
    });

    test('should return false for an invalid email', () => {
        const email = 'invalid-email';
        expect(validadeEmail(email)).toBe(false);
    });

    test('should return false for an empty string', () => {
        const email = '';
        expect(validadeEmail(email)).toBe(false);
    });

    test('should return false for a null value', () => {
        const email = null;
        expect(validadeEmail(email)).toBe(false);
    });

    test('should return false for an undefined value', () => {
        const email = undefined;
        expect(validadeEmail(email)).toBe(false);
    });
});