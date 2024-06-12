export function isValidCPF(cpf: string) {
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
    return false;
  }
  let sum;
  let remainder;
  sum = 0;
  for (let i = 1; i <= 9; i++) sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  remainder = (sum * 10) % 11;
  if ((remainder === 10) || (remainder === 11)) remainder = 0;
  if (remainder !== parseInt(cpf.substring(9, 10))) return false;
  sum = 0;
  for (let i = 1; i <= 10; i++) sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  remainder = (sum * 10) % 11;
  if ((remainder === 10) || (remainder === 11)) remainder = 0;
  if (remainder !== parseInt(cpf.substring(10, 11))) return false;
  return true;
}

export const regexCNPJ = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;

export const validCNPJ = (value: any | number | number[] = ''): boolean => {
  const numbers = matchNumbers(value);

  if (numbers.length !== 14 || !regexCNPJ.test(value)) return false;

  const uniqueDigits = new Set(numbers);
  if (uniqueDigits.size === 1) return false;

  const digit0 = calculateDigit(12, numbers);
  const digit1 = calculateDigit(13, numbers);

  return digit0 === numbers[12] && digit1 === numbers[13];
};

function calculateDigit(position: number, numbers: number[]): number {
  let factor = position - 7;
  let sum = 0;

  for (let i = 0; i < position; i++) {
    sum += numbers[i] * factor--;
    if (factor < 2) factor = 9;
  }

  const result = 11 - (sum % 11);
  return result > 9 ? 0 : result;
}

function matchNumbers(value: string | number | number[] = ''): number[] {
  return value
    .toString()
    .replace(/[^\d]+/g, '')
    .split('')
    .map(Number);
}

