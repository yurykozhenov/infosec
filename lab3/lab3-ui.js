window.L3 = (function() {
  const ALPHABET = 'АБВГДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯ ';

  function init() {
    const encryptVigenereForm = document.encryptVigenereForm;
    encryptVigenereForm.value.value = 'Захист інформації';
    encryptVigenereForm.key.value = 'Мова';

    const decryptVigenereForm = document.decryptVigenereForm;
    decryptVigenereForm.key.value = encryptVigenereForm.key.value;

    encryptVigenere();
  }

  function encryptVigenere() {
    const form = document.encryptVigenereForm;
    const value = form.value.value.toUpperCase();
    const key = form.key.value.toUpperCase();

    form.result.value = Cipher3.encryptVigenere(value, key, ALPHABET);
  }

  function decryptVigenere() {
    const form = document.decryptVigenereForm;
    const value = form.value.value.toUpperCase();
    const key = form.key.value.toUpperCase();

    form.result.value = Cipher3.decryptVigenere(value, key, ALPHABET);
  }

  init();

  return {
    encryptVigenere,
    decryptVigenere,
  }
})();
