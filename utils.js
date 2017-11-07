function findMultiplicativeInverse(num, mod) {
  for (let i = 0; i <= mod; i++) {
    if ((i * num) % mod === 1) {
      return i;
    }
  }

  return null;
}

function randomPrime(min, max) {
  const num = math.randomInt(min, max);

  return math.isPrime(num) ? num : randomPrime(min, max);
}

function powmod(num, pow, mod) {
  if (!pow) {
    return 1;
  }

  if (pow % 2 === 0){
    return Math.pow(powmod(num, (pow / 2), mod), 2) % mod;
  }

  return (num * powmod(num, (pow - 1), mod)) % mod;
}
