export class DoubleSquare {
  static encrypt(text, key1, key2, placeholder) {
    const result = [];

    if (text.length % 2 !== 0) {
      text += placeholder;
    }

    for (let i = 0; i < text.length; i += 2) {
      const index1 = this._matrixIndexOf(text[i], key1);
      const index2 = this._matrixIndexOf(text[i+1], key2);

      result.push(key2[index1[0]][index2[1]], key1[index2[0]][index1[1]]);
    }

    return result.join('');
  }

  static decrypt(text, key1, key2, placeholder) {
    return this.encrypt(text, key2, key1, placeholder);
  }

  static _normalizeEncryptPlayfairInput(text, placeholder) {
    const normalizedText = [];

    for (let i = 0; i < text.length; i += 2) {
      normalizedText.push(text[i]);

      if (text[i] === text[i+1]) {
        normalizedText.push(placeholder);
      }

      if (i !== text.length - 1) {
        normalizedText.push(text[i+1]);
      }
    }

    if (normalizedText.length % 2 !== 0) {
      normalizedText.push(placeholder);
    }

    return normalizedText;
  }

  static _matrixIndexOf(char, array) {
    for (let i = 0; i < array.length; i++) {
      const index = array[i].indexOf(char);

      if (index !== -1) {
        return [i, index];
      }
    }
  }
}
