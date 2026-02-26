import { add } from './add'

describe('add', () => {
    it('should add two numbers', () => {
        expect(add(1, 2)).toBe(3)
    })
    it('should add negative numbers', () => {
        expect(add(-1, -2)).toBe(-3)
    })
    it('should add a positive and a negative number', () => {
        expect(add(5, -3)).toBe(2)
    })
    it('should add zero', () => {
        expect(add(0, 5)).toBe(5)
        expect(add(5, 0)).toBe(5)
    })
    it('should add decimal numbers', () => {
        expect(add(1.5, 2.5)).toBe(4)
    })
})
