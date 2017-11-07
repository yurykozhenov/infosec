window.Cipher1 = function() {
  class Cipher1 {
    static encryptAdditive(value, key, alphabet) {
      return this._transform(
        value,
        char => alphabet[(alphabet.indexOf(char) + key) % alphabet.length],
        alphabet
      );
    }

    static decryptAdditive(value, key, alphabet) {
      return this.encryptAdditive(value, key, alphabet);
    }

    static encryptMultiplicative(value, key, alphabet) {
      return this._transform(
        value,
        char => alphabet[(alphabet.indexOf(char) * key) % alphabet.length],
        alphabet
      );
    }

    static decryptMultiplicative(value, key, alphabet) {
      if (findMultiplicativeInverse(key, alphabet.length) == null) {
        return '-';
      }

      return this.encryptMultiplicative(value, key, alphabet);
    }

    static encryptAffine(value, key1, key2, alphabet) {
      return this._transform(
        value,
        char => alphabet[(alphabet.indexOf(char) * key1 + key2) % alphabet.length],
        alphabet
      );
    }

    static decryptAffine(value, key1, key2, alphabet) {
      if (findMultiplicativeInverse(key1, alphabet.length) == null) {
        return '-';
      }

      return this._transform(
        value,
        char => alphabet[((alphabet.indexOf(char) + key2) * key1) % alphabet.length],
        alphabet
      );
    }

    static inverseAdditiveKey(key, alphabet) {
      return alphabet.length - (key % alphabet.length);
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

  return Cipher1;
}();
