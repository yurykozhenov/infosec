window.Cipher5 = function() {
  class Cipher5 {
    static generateRSAKeys() {
      const p = randomPrime(1000, 10000);

      let q;

      do {
        q = randomPrime(1000, 10000);
      } while (q === p);

      const n = p * q;
      const euler = (p - 1) * (q - 1);

      let e;

      do {
        e = randomPrime(2, euler);
      } while (math.gcd(e, n) !== 1);

      const d = findMultiplicativeInverse(e, euler);

      return { p, q, e, d };
    }

    static encryptRSA(text, e, n) {
      const input = Array.from(text).map(char => char.charCodeAt(0));
      const output = input.map(charCode => powmod(charCode, e, n));

      console.log('Encrypt input: ', input);
      console.log('Encrypt output: ', output);

      // return output.map(charCode => String.fromCharCode(charCode)).join('');
      return output.join(' ');
    }

    static decryptRSA(text, d, n) {
      // const input = Array.from(text).map(char => char.charCodeAt(0));
      const input = text.split(' ').map(char => Number(char));
      const output = input.map(charCode => powmod(charCode, d, n));

      console.log('Decrypt input: ', input);
      console.log('Decrypt output: ', output);

      return output.map(charCode => String.fromCharCode(charCode)).join('');
    }
  }

  return Cipher5;
}();
