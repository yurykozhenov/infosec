window.Cipher = function() {
  class Cipher {
    static additive(value, key) {
      return this._transform(value, char => ALPHABET[(ALPHABET.indexOf(char) + key) % ALPHABET_LENGTH]);
    }

    static multiplicative(value, key) {
      return this._transform(value, char => ALPHABET[(ALPHABET.indexOf(char) * key) % ALPHABET_LENGTH]);
    }

    static affine(value, key1, key2) {
      return this._transform(value, char => ALPHABET[(ALPHABET.indexOf(char) * key1 + key2) % ALPHABET_LENGTH]);
    }

    static reversedAffine(value, key1, key2) {
      if (this.inverseMultiplicativeKey(key1) == null) {
        return 'Impossible to decrypt';
      }

      return this._transform(value, char => ALPHABET[((ALPHABET.indexOf(char) + key2) * key1) % ALPHABET_LENGTH]);
    }

    static _transform(value, transformFunc) {
      return Array.from(value.toUpperCase())
        .filter(char => ALPHABET.indexOf(char) !== -1)
        .map(char => transformFunc(char)).join('');
    }

    static inverseAdditiveKey(key) {
      return ALPHABET_LENGTH - (key % ALPHABET_LENGTH);
    }

    static inverseMultiplicativeKey(key) {
      for (let i = 1; i <= ALPHABET_LENGTH; i++) {
        if ((i * key) % ALPHABET_LENGTH === 1) {
          return i;
        }
      }

      return null;
    }
  }

  return Cipher;
}();
