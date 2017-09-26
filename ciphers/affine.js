export class Affine {
  static encrypt(value, key1, key2, alphabet) {
    return this._transform(
      value,
      char => alphabet[(alphabet.indexOf(char) * key1 + key2) % alphabet.length],
      alphabet
    );
  }

  static decrypt(value, key1, key2, alphabet) {
    if (this.inverseMultiplicativeKey(key1, alphabet) == null) {
      return '-';
    }

    return this._transform(
      value,
      char => alphabet[((alphabet.indexOf(char) + key2) * key1) % alphabet.length],
      alphabet
    );
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
