window.Cipher6 = function() {
  const HASH_MAX_HALF_BYTES = 4;
  const HASH_MAX_NUMBER = Math.pow(2, HASH_MAX_HALF_BYTES * 4);

  class Cipher6 {
    static signRSA(text, d, n) {
      const hash = this._hash(text);
      const y = parseInt(hash, 16);

      console.log('Sign RSA input hash:', hash);
      console.log('Sign RSA input hash number:', y);

      const signature = powmod(y, d, n);

      return signature;
    }

    static verifyRSA(text, s, e, n) {
      const hash = this._hash(text);
      const y = parseInt(hash, 16);

      console.log('Verify RSA input hash:', hash);
      console.log('Verify RSA input hash number:', y);

      const resultHashNumber = powmod(s, e, n);

      console.log('Verify RSA input result hash number:', resultHashNumber);

      return resultHashNumber === y;
    }

    static generateElgamalKeys() {
      const p = randomPrime(HASH_MAX_NUMBER, HASH_MAX_NUMBER * 2); // p should be more than max possible hash number!
      const g = randomPrime(100, p);
      const x = math.randomInt(2, p);
      const y = powmod(g, x, p);

      return { p, g, x, y };
    }

    static signElgamal(text, p, g, x) {
      const hash = this._hash(text);
      const m = parseInt(hash, 16);

      console.log('Sign Elgamal input hash:', hash);
      console.log('Sign Elgamal input hash number:', m);

      // Find k
      let k;

      do {
        k = randomPrime(2, p - 1);
      } while (math.gcd(k, p - 1) !== 1);

      // Find a
      const a = powmod(g, k, p);

      // Find b (is p is less than m, b will not exist)
      let b;

      for (let i = 2; i < Number.MAX_SAFE_INTEGER; i++) {
        // Extended Eucledian algorithm equation
        if ((x * a + k * i) % (p - 1) === m) {
          b = i;
          break;
        }
      }

      return { a, b };
    }

    static verifyElgamal(text, p, g, y, a, b) {
      const hash = this._hash(text);
      const m = parseInt(hash, 16);

      console.log('Verify Elgamal input hash:', hash);
      console.log('Verify Elgamal input hash number:', m);

      /* !!! WARNING !!!
       * LEFT SIDE IS NOT CALCULATED WITH BIG NUMBERS, IT GIVES NaN!
       *
       * const superBigNumber = Math.pow(y, a) * Math.pow(a, b);
       *
       * There is solution (nice little equation):
       * (X * Y) % Z == ((X % Z) * (Y % Z)) % Z
       */

      const yPowAModP = powmod(y, a, p);
      const aPowBModP = powmod(a, b, p);

      console.log('y ^ a % p', yPowAModP);
      console.log('a ^ b % p', aPowBModP);

      const left = yPowAModP * aPowBModP % p;
      const right = powmod(g, m, p);

      console.log('Verify Elgamal left part of equation:', left);
      console.log('Verify Elgamal right part of equation:', right);

      return left === right;
    }

    // Returns hex number
    static _hash(text) {
      return md5(text).substring(0, HASH_MAX_HALF_BYTES); // Take first n half-bytes (1 hash symbol === 4 bits)
    }
  }

  return Cipher6;
}();
