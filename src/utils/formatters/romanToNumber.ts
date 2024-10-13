export const romanToNumber = (roman: string) => {
  const romanMap: Record<string, number> = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  return roman.split('').reduce((acc, curr, index, arr) => {
    if (romanMap[curr] < romanMap[arr[index + 1]]) {
      return acc - romanMap[curr];
    } else {
      return acc + romanMap[curr];
    }
  }, 0);
};

export const numberToRoman = (num: number) => {
  const romanMap: Record<number, string> = {
    1: 'I',
    4: 'IV',
    5: 'V',
    9: 'IX',
    10: 'X',
    40: 'XL',
    50: 'L',
    90: 'XC',
    100: 'C',
    400: 'CD',
    500: 'D',
    900: 'CM',
    1000: 'M',
  };

  const keys = Object.keys(romanMap)
    .map(Number)
    .sort((a, b) => b - a);
  let result = '';

  for (const key of keys) {
    while (num >= key) {
      result += romanMap[key];
      num -= key;
    }
  }

  return result;
};
