const OPERATORS = ['+', '-', '×', '÷'] as const;
type Operator = (typeof OPERATORS)[number];

export type EvaluationResult =
    | { ok: true; value: number; formatted: string }
    | { ok: false; error: 'Cannot divide by zero' | 'Invalid Calculation' };

function isOperator(token: string): token is Operator {
    return OPERATORS.includes(token as Operator);
}

function tokenize(expression: string): Array<number | Operator> | null {
    const compact = expression.replace(/\s/g, '');
    if (!compact) {
        return null;
    }

    const tokens: Array<number | Operator> = [];
    let number = '';

    for (let index = 0; index < compact.length; index += 1) {
        const character = compact[index];
        const unaryMinus =
            character === '-' &&
            (index === 0 || isOperator(compact[index - 1])) &&
            number === '';

        if (/\d|\./.test(character) || unaryMinus) {
            number += character;
            continue;
        }

        if (!isOperator(character) || number === '' || number === '-') {
            return null;
        }

        const numericValue = Number(number);
        if (!Number.isFinite(numericValue)) {
            return null;
        }
        tokens.push(numericValue, character);
        number = '';
    }

    if (number === '' || number === '-') {
        return null;
    }
    const numericValue = Number(number);
    if (!Number.isFinite(numericValue)) {
        return null;
    }
    tokens.push(numericValue);
    return tokens;
}

function apply(left: number, right: number, operator: Operator): number {
    switch (operator) {
        case '+':
            return left + right;
        case '-':
            return left - right;
        case '×':
            return left * right;
        case '÷':
            return left / right;
    }
}

export function formatNumber(value: number): string {
    if (!Number.isFinite(value)) {
        return 'Invalid Calculation';
    }
    const normalized = Number(value.toPrecision(14));
    const absolute = Math.abs(normalized);
    if ((absolute >= 1e15 || (absolute > 0 && absolute < 1e-9))) {
        return normalized.toExponential(8).replace(/\.0+e/, 'e');
    }
    return normalized.toLocaleString('en-US', {
        maximumFractionDigits: 12,
        useGrouping: false,
    });
}

export function evaluateExpression(expression: string): EvaluationResult {
    const tokens = tokenize(expression);
    if (!tokens) {
        return { ok: false, error: 'Invalid Calculation' };
    }

    const reduced: Array<number | Operator> = [tokens[0]];
    for (let index = 1; index < tokens.length; index += 2) {
        const operator = tokens[index] as Operator;
        const right = tokens[index + 1] as number;
        if (operator === '÷' && right === 0) {
            return { ok: false, error: 'Cannot divide by zero' };
        }
        if (operator === '×' || operator === '÷') {
            const left = reduced.pop() as number;
            reduced.push(apply(left, right, operator));
        } else {
            reduced.push(operator, right);
        }
    }

    let result = reduced[0] as number;
    for (let index = 1; index < reduced.length; index += 2) {
        result = apply(result, reduced[index + 1] as number, reduced[index] as Operator);
    }

    if (!Number.isFinite(result)) {
        return { ok: false, error: 'Invalid Calculation' };
    }
    return { ok: true, value: result, formatted: formatNumber(result) };
}

export function appendInput(expression: string, key: string): string {
    const last = expression.slice(-1);
    if (/\d/.test(key)) {
        if (expression === '0') {
            return key;
        }
        return expression + key;
    }
    if (key === '.') {
        const currentNumber = expression.split(/[+\-×÷]/).pop() ?? '';
        if (currentNumber.includes('.')) {
            return expression;
        }
        return expression + (currentNumber ? '.' : '0.');
    }
    if (isOperator(key)) {
        if (!expression && key === '-') {
            return '-';
        }
        if (!expression || expression === '-') {
            return expression;
        }
        return isOperator(last) ? expression.slice(0, -1) + key : expression + key;
    }
    return expression;
}

export function toggleSign(expression: string): string {
    if (!expression) {
        return expression;
    }
    const match = expression.match(/(-?\d*\.?\d+)$/);
    if (!match || match.index === undefined) {
        return expression;
    }
    const value = match[0];
    const replacement = value.startsWith('-') ? value.slice(1) : `-${value}`;
    return expression.slice(0, match.index) + replacement;
}

export function applyPercentage(expression: string): string {
    const match = expression.match(/(-?\d*\.?\d+)$/);
    if (!match || match.index === undefined) {
        return expression;
    }
    const replacement = formatNumber(Number(match[0]) / 100);
    return expression.slice(0, match.index) + replacement;
}
