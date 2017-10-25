window.Cipher5 = function() {
  class Cipher5 {
    static generateRSAKeys() {
      const p = this._randomPrime(1000, 10000);

      let q;

      do {
        q = this._randomPrime(1000, 10000);
      } while (q === p);

      const n = p * q;
      const euler = (p - 1) * (q - 1);

      let e;

      do {
        e = this._randomPrime(2, euler);
      } while (math.gcd(e, n) !== 1);

      const d = this._findMultiplicativeInverse(e, euler);

      return { p, q, e, d };
    }

    static encryptRSA(text, e, n) {
      const input = Array.from(text).map(char => char.charCodeAt(0));
      const output = input.map(charCode => this._powmod(charCode, e, n));

      console.log('Encrypt input: ', input);
      console.log('Encrypt output: ', output);

      // return output.map(charCode => String.fromCharCode(charCode)).join('');
      return output.join(' ');
    }

    static decryptRSA(text, d, n) {
      // const input = Array.from(text).map(char => char.charCodeAt(0));
      const input = text.split(' ').map(char => Number(char));
      const output = input.map(charCode => this._powmod(charCode, d, n));

      console.log('Decrypt input: ', input);
      console.log('Decrypt output: ', output);

      return output.map(charCode => String.fromCharCode(charCode)).join('');
    }

    static _randomPrime(min, max) {
      const num = math.randomInt(min, max);

      return math.isPrime(num) ? num : this._randomPrime(min, max);
    }

    static _powmod(num, pow, mod) {
      if (!pow) {
        return 1;
      }

      if (pow % 2 === 0){
        return Math.pow(this._powmod(num, (pow / 2), mod), 2) % mod;
      }

      return (num * this._powmod(num, (pow - 1), mod)) % mod;
    }

    static _findMultiplicativeInverse(num, mod) {
      for (let i = 0; i <= mod; i++) {
        if ((i * num) % mod === 1) {
          return i;
        }
      }
    }
  }

  return Cipher5;
}();
