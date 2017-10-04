export class Vigenere {
  static encrypt(input, key, alphabet) {
    const output = [];
    const cipherTable = this.getCipherTable(key, alphabet);

    let cycle = 1;

    for (let i = 0; i < input.length; i++) {
      if (cycle > key.length) {
        cycle = 1;
      }

      output.push(cipherTable[cycle][cipherTable[0].indexOf(input[i])]);
      cycle++;
    }

    return output.join('');
  }

  static decrypt(input, key, alphabet) {
    const output = [];
    const cipherTable = this.getCipherTable(key, alphabet);

    let cycle = 1;

    for (let i = 0; i < input.length; i++) {
      if (cycle > key.length) {
        cycle = 1;
      }

      output.push(cipherTable[0][cipherTable[cycle].indexOf(input[i])]);
      cycle++;
    }

    return output.join('');
  }

  static getCipherTable(key, alphabet) {
    const cipherTable = [];
    const vigenereTable = this.getVigenereTable(alphabet);

    cipherTable.push(vigenereTable[0]);

    for (let i = 0; i < key.length; i++) {
      for (let j = 0; j < vigenereTable.length; j++) {
        if (vigenereTable[j][0] === key[i]) {
          cipherTable.push(vigenereTable[j]);
        }
      }
    }

    return cipherTable;
  }

  static getVigenereTable(alphabet) {
    const table = [];

    for (let i = 0; i < alphabet.length; i++) {
      table.push([]);

      for (let j = alphabet.length - i; j < alphabet.length; j++) {
        table[i].push(alphabet[j]);
      }

      for (let j = 0; j < alphabet.length - i; j++) {
        table[i].push(alphabet[j]);
      }
    }

    return table;
  }
}
