import { evaluateExpression, appendInput, applyPercentage, formatNumber, toggleSign } from '../src/utils/calculatorEngine';

describe('calculator engine', () => {
    it('respects multiplication and division precedence', () => {
        expect(evaluateExpression('34+56×2')).toMatchObject({ ok: true, formatted: '146' });
        expect(evaluateExpression('50÷2+80×9')).toMatchObject({ ok: true, formatted: '745' });
    });

    it('handles decimals and negative values', () => {
        expect(evaluateExpression('-3.5×2')).toMatchObject({ ok: true, formatted: '-7' });
        expect(evaluateExpression('0.1+0.2')).toMatchObject({ ok: true, formatted: '0.3' });
    });

    it('returns a clear divide-by-zero error', () => {
        expect(evaluateExpression('5÷0')).toEqual({ ok: false, error: 'Cannot divide by zero' });
    });

    it('rejects incomplete or invalid expressions', () => {
        expect(evaluateExpression('')).toEqual({ ok: false, error: 'Invalid Calculation' });
        expect(evaluateExpression('5+')).toEqual({ ok: false, error: 'Invalid Calculation' });
        expect(evaluateExpression('5..2')).toEqual({ ok: false, error: 'Invalid Calculation' });
    });

    it('builds keypad input safely', () => {
        expect(appendInput('0', '3')).toBe('3');
        expect(appendInput('3', '.')).toBe('3.');
        expect(appendInput('3.', '.')).toBe('3.');
        expect(appendInput('3+', '+')).toBe('3+');
        expect(appendInput('3', '-')).toBe('3-');
    });

    it('supports sign, percentage, and formatting helpers', () => {
        expect(toggleSign('34+56')).toBe('34+-56');
        expect(applyPercentage('50')).toBe('0.5');
        expect(formatNumber(1000000000000000)).toContain('e');
    });
});
