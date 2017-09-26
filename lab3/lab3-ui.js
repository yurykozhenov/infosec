import { Vigenere } from '../ciphers/vigenere';

window.L3 = (function() {
  const ALPHABET = 'АБВГДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯ ';

  function init() {
    const encryptVigenereForm = document.encryptVigenereForm;
    encryptVigenereForm.value.value = 'Захист інформації';
    encryptVigenereForm.key.value = 'Мова';

    const decryptVigenereForm = document.decryptVigenereForm;
    decryptVigenereForm.key.value = encryptVigenereForm.key.value;

    document.querySelector('#cipherTable').innerHTML = Cipher3._getCipherTable('КЛЮЧ', ALPHABET)
    .map(arr => `<tr>${arr.map(char => `<td>${char}</td>`).join('')}</tr>`)
    .join('');

    document.querySelector('#table').innerHTML = Cipher3._getVigenereTable(ALPHABET)
      .map(arr => `<tr>${arr.map(char => `<td>${char}</td>`).join('')}</tr>`)
      .join('');

    encryptVigenere();
  }

  function encryptVigenere() {
    const form = document.encryptVigenereForm;
    const value = form.value.value.toUpperCase();
    const key = form.key.value.toUpperCase();

    form.result.value = Vigenere.encrypt(value, key, ALPHABET);
  }

  function decryptVigenere() {
    const form = document.decryptVigenereForm;
    const value = form.value.value.toUpperCase();
    const key = form.key.value.toUpperCase();

    form.result.value = Vigenere.decrypt(value, key, ALPHABET);
  }

  init();

  return {
    encryptVigenere,
    decryptVigenere,
  }
})();
