export class Playfair {
  static encrypt(text, key, placeholder) {
    const result = [];
    const normalizedText = this._normalizeEncryptPlayfairInput(text, placeholder);

    for (let i = 0; i < normalizedText.length; i += 2) {
      const index1 = this._matrixIndexOf(normalizedText[i], key);
      const index2 = this._matrixIndexOf(normalizedText[i+1], key);

      if (index1[0] === index2[0]) {
        result.push(
          key[index1[0]][(index1[1] + 1) % key[0].length],
          key[index2[0]][(index2[1] + 1) % key[0].length],
        );
      } else if (index1[1] === index2[1]) {
        result.push(
          key[(index1[0] + 1) % key.length][index1[1]],
          key[(index2[0] + 1) % key.length][index2[1]],
        );
      } else {
        result.push(
          key[index1[0]][index2[1]],
          key[index2[0]][index1[1]],
        );
      }
    }

    return result.join('');
  }

  static decrypt(text, key, placeholder) {
    const result = [];

    for (let i = 0; i < text.length; i += 2) {
      const index1 = this._matrixIndexOf(text[i], key);
      const index2 = this._matrixIndexOf(text[i+1], key);

      if (index1[0] === index2[0]) {
        result.push(
          key[index1[0]][(key[0].length + index1[1] - 1) % key[0].length],
          key[index2[0]][(key[0].length + index2[1] - 1) % key[0].length]
        );
      } else if (index1[1] === index2[1]) {
        result.push(
          key[(key.length + index1[0] - 1) % key.length][index1[1]],
          key[(key.length + index2[0] - 1) % key.length][index2[1]],
        );
      } else {
        result.push(
          key[index1[0]][index2[1]],
          key[index2[0]][index1[1]],
        );
      }
    }

    return result.join('').replace(new RegExp(placeholder, 'g'), '');
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
