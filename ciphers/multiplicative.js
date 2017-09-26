export class Multiplicative {
  static encrypt(value, key, alphabet) {
    return this._transform(
      value,
      char => alphabet[(alphabet.indexOf(char) * key) % alphabet.length],
      alphabet
    );
  }

  static decrypt(value, key, alphabet) {
    if (this.inverseMultiplicativeKey(key, alphabet) == null) {
      return '-';
    }

    return this.encrypt(value, key, alphabet);
  }

  static inverseMultiplicativeKey(key, alphabet) {
    for (let i = 1; i <= alphabet.length; i++) {
      if ((i * key) % alphabet.length === 1) {
        return i;
      }
    }

    return null;
  }

  static _transform(value, transformFunc, alphabet) {
    return Array.from(value)
      .filter(char => alphabet.indexOf(char) !== -1)
      .map(char => transformFunc(char))
      .join('');
  }
}
