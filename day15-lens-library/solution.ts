export function solve15(data: string) {
  const split = data.trim().split(',');
  const result = split.map(el => sumOfString(el));
  return result.reduce((a, b) => a + b);
}

export function sumOfString(str: string) {
  let result = 0;
  for (let char of str) {
    result += char.charCodeAt(0);
    result *= 17;
    result %= 256;
  }
  return result;
}

