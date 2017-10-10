window.Cipher4 = function() {
  class Cipher4 {
    static encryptTransposition(input, key, placeholder) {
      return _(input)
        .chunk(key.length)
        .map(row => {
          if (row.length < key.length) {
            row.push(..._.fill(new Array(key.length - row.length), placeholder));
          }

          return row;
        })
        .map(row => row.map((char, index) => row[key[index]]))
        .flatten()
        .join('');
    }

    static decryptTransposition(input, key, placeholder) {
      const reversedKey = [];

      key.forEach((num, index) => {
        reversedKey[num] = index;
      });

      return this.encryptTransposition(input, reversedKey, placeholder);
    }
  }

  return Cipher4;
}();
