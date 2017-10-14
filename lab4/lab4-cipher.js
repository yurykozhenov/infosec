window.Cipher4 = function() {
  class Cipher4 {
    static encryptTransposition(input, key, placeholder) {
      return _.flow(
        _.bind(_.chunk, _, _, key.length),
        _.bind(this._transform, this, _, key, placeholder),
        this._transpose,
        _.flatten,
        _.bind(_.join, _, _, '')
      )(input);
    }

    static decryptTransposition(input, key, placeholder) {
      const reversedKey = [];

      key.forEach((num, index) => {
        reversedKey[num] = index;
      });

      return _.flow(
        _.bind(_.chunk, _, _, Math.ceil(input.length / key.length)),
        this._transpose,
        _.bind(this._transform, this, _, reversedKey, placeholder),
        _.flatten,
        _.bind(_.join, _, _, '')
      )(input);
    }

    static _transform(input, key, placeholder) {
      return input
        .map(row => row.length < key.length
          ? row.concat(_.fill(new Array(key.length - row.length), placeholder))
          : row)
        .map(row => row.map((char, index) => row[key[index]]));
    }

    static _transpose(arr) {
      return _.zip(...arr);
    }
  }

  return Cipher4;
}();
