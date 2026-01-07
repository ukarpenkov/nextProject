import { validateInput } from '../../search/page'

describe('validateInput', () => {
    test('returns true for empty values', () => {
        expect(validateInput('quote', '')).toBe(true)
        expect(validateInput('author', '')).toBe(true)
        expect(validateInput('category', '')).toBe(true)
    })

    test('valid quote strings', () => {
        expect(validateInput('quote', 'Life is beautiful!')).toBe(true)
        expect(validateInput('quote', "Don't stop believing.")).toBe(true)
        expect(validateInput('quote', 'Numbers 123 and punctuation.,!? - are ok')).toBe(true)
    })

    test('invalid quote strings (disallowed chars)', () => {
        expect(validateInput('quote', 'emoji 😀 not allowed')).toBe(false)
        expect(validateInput('quote', 'cyrillic тест')).toBe(false)
    })

    test('valid author strings', () => {
        expect(validateInput('author', 'John Doe')).toBe(true)
        expect(validateInput('author', 'A. B. C.')).toBe(true)
        expect(validateInput('author', "O'Connor")).toBe(true)
    })

    test('invalid author strings (digits not allowed)', () => {
        expect(validateInput('author', 'John Doe2')).toBe(false)
    })

    test('valid category strings (lowercase, digits, hyphen)', () => {
        expect(validateInput('category', 'inspiration')).toBe(true)
        expect(validateInput('category', 'life-101')).toBe(true)
        expect(validateInput('category', 'quote-category')).toBe(true)
    })

    test('invalid category strings (uppercase or spaces)', () => {
        expect(validateInput('category', 'Inspiration')).toBe(false)
        expect(validateInput('category', 'life tips')).toBe(false)
        expect(validateInput('category', 'life_tips')).toBe(false)
    })

    test('unknown field defaults to true', () => {
        expect(validateInput('unknown', 'anything')).toBe(true)
    })
})
