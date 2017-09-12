window.Z = (function() {
  const ALPHABET = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
  const ALPHABET_LENGTH = ALPHABET.length;

  function additiveCipher(value, key) {
    const transform = char => ALPHABET[(ALPHABET.indexOf(char) + key) % ALPHABET_LENGTH];
    return Array.from(value).map(char => transform(char)).join('');
  }

  function multiplicativeCipher(value, key) {
    const transform = char => ALPHABET[(ALPHABET.indexOf(char) * key) % ALPHABET_LENGTH];
    return Array.from(value).map(char => transform(char)).join('');
  }

  function affineCipher(value, key1, key2) {
    const transform = char => ALPHABET[(ALPHABET.indexOf(char) * key1 + key2) % ALPHABET_LENGTH];
    return Array.from(value).map(char => transform(char)).join('');
  }

  function reversedAffineCipher(value, key1, key2) {
    const transform = char => ALPHABET[((ALPHABET.indexOf(char) + key2) * key1) % ALPHABET_LENGTH];
    return Array.from(value).map(char => transform(char)).join('');
  }

  function init() {
    const variant = 5;
    const name = 'KOZHENOVYURIISAADOVYCH';

    const additiveForm = document.additiveForm;
    additiveForm.key.value = variant;
    additiveForm.value.value = name;

    const multiplicativeForm = document.multiplicativeForm;
    multiplicativeForm.key.value = variant + 3;
    multiplicativeForm.value.value = name;

    const affineForm = document.affineForm;
    affineForm.key1.value = variant;
    affineForm.key2.value = variant + 3;
    affineForm.value.value = name;
  }

  function calculateAdditive() {
    const form = document.additiveForm;
    const value = form.value.value;
    const key = Number(form.key.value);

    form.result.value = additiveCipher(value, key);
  }

  function calculateMultiplicative() {
    const form = document.multiplicativeForm;
    const value = form.value.value;
    const key = Number(form.key.value);

    form.result.value = multiplicativeCipher(value, key);
  }

  function calculateAffine() {
    const form = document.affineForm;
    const value = form.value.value;
    const key1 = Number(form.key1.value);
    const key2 = Number(form.key2.value);

    const result = affineCipher(value, key1, key2);
    form.result.value = result;

    calculateReversedAffine(result, key1, key2);
  }

  function calculateReversedAffine(value, key1, key2) {
    const form = document.reversedAffineForm;

    form.value.value = value;
    const invertedKey1 = inverseMultiplicativeKey(key1);
    form.key1.value = invertedKey1;
    const invertedKey2 = inverseAdditiveKey(key2);
    form.key2.value = invertedKey2;

    form.result.value = reversedAffineCipher(value, invertedKey1, invertedKey2);
  }

  function inverseAdditiveKey(key) {
    return ALPHABET_LENGTH - (key % ALPHABET_LENGTH);
  }

  function inverseMultiplicativeKey(key) {
    for (let i = 1; i <= ALPHABET_LENGTH; i++) {
      if ((i * key) % ALPHABET_LENGTH === 1) {
        return i;
      }
    }

    return null;
  }

  init();
  calculateAdditive();
  calculateMultiplicative();
  calculateAffine();

  return {
    calculateAdditive,
    calculateMultiplicative,
    calculateAffine,
  }
})();
