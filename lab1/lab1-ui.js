window.Z = (function() {
  function init() {
    const variant = 5;
    const name = 'KOZHENOVYURIISAADOVYCH';

    const additiveForm = document.encryptAdditiveForm;
    additiveForm.key.value = variant;
    additiveForm.value.value = name;

    const multiplicativeForm = document.encryptMultiplicativeForm;
    multiplicativeForm.key.value = variant + 3;
    multiplicativeForm.value.value = name;

    const affineForm = document.encryptAffineForm;
    affineForm.key1.value = variant;
    affineForm.key2.value = variant + 3;
    affineForm.value.value = name;

    encryptAdditive();
    encryptMultiplicative();
    encryptAffine();
  }

  function encryptAdditive() {
    const form = document.encryptAdditiveForm;
    const value = form.value.value;
    const key = Number(form.key.value);

    form.result.value = Cipher.additive(value, key);
  }

  function encryptMultiplicative() {
    const form = document.encryptMultiplicativeForm;
    const value = form.value.value;
    const key = Number(form.key.value);

    form.result.value = Cipher.multiplicative(value, key);
  }

  function encryptAffine() {
    const form = document.encryptAffineForm;
    const value = form.value.value;
    const key1 = Number(form.key1.value);
    const key2 = Number(form.key2.value);

    form.result.value = Cipher.affine(value, key1, key2);
  }

  function decryptAdditive() {
    const form = document.decryptAdditiveForm;
    const value = form.value.value;

    const result = [];

    for (let i = 0; i < ALPHABET_LENGTH; i++) {
      result.push(`${i}: ${Cipher.additive(value, i)}`);
    }

    form.result.value = result.join('\n');
  }

  function decryptMultiplicative() {
    const form = document.decryptMultiplicativeForm;
    const value = form.value.value;

    const result = [];

    for (let i = 0; i < ALPHABET_LENGTH; i++) {
      result.push(`${i}: ${Cipher.multiplicative(value, i)}`);
    }

    form.result.value = result.join('\n');
  }

  function decryptAffine() {
    const form = document.decryptAffineForm;
    const value = form.value.value;

    const result = [];

    for (let i = 0; i < ALPHABET_LENGTH; i++) {
      for (let j = 0; j < ALPHABET_LENGTH; j++) {
        result.push(`${i}, ${j}: ${Cipher.reversedAffine(value, i, j)}`);
      }
    }

    form.result.value = result.join('\n');
  }

  init();

  return {
    encryptAdditive,
    encryptMultiplicative,
    encryptAffine,
    decryptAdditive,
    decryptMultiplicative,
    decryptAffine,
  }
})();
