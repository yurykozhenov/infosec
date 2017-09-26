export class Additive {
  static encrypt(value, key, alphabet) {
    return this._transform(
      value,
      char => alphabet[(alphabet.indexOf(char) + key) % alphabet.length],
      alphabet
    );
  }

  static decrypt(value, key, alphabet) {
    return this.encrypt(value, key, alphabet);
  }

  static inverseAdditiveKey(key, alphabet) {
    return alphabet.length - (key % alphabet.length);
  }

  static _transform(value, transformFunc, alphabet) {
    return Array.from(value)
      .filter(char => alphabet.indexOf(char) !== -1)
      .map(char => transformFunc(char))
      .join('');
  }
}
