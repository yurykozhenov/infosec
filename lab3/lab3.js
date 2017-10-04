import { Vigenere } from '../ciphers/vigenere.js';

window.L3 = (function() {
  const ALPHABET = 'АБВГДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯ ';

  function init() {
    const encryptVigenereForm = document.encryptVigenereForm;
    encryptVigenereForm.value.value = 'Захист інформації';
    encryptVigenereForm.key.value = 'Мова';

    const decryptVigenereForm = document.decryptVigenereForm;
    decryptVigenereForm.key.value = encryptVigenereForm.key.value;

    generateCipherTable();
    generateVigenereTable();

    encryptVigenere();
  }

  function encryptVigenere() {
    const form = document.encryptVigenereForm;
    const value = form.value.value.toUpperCase();
    const key = form.key.value.toUpperCase();

    generateCipherTable();

    form.result.value = Vigenere.encrypt(value, key, ALPHABET);
  }

  function decryptVigenere() {
    const form = document.decryptVigenereForm;
    const value = form.value.value.toUpperCase();
    const key = form.key.value.toUpperCase();

    form.result.value = Vigenere.decrypt(value, key, ALPHABET);
  }

  function generateVigenereTable() {
    document.querySelector('#table').innerHTML = Vigenere.getVigenereTable(ALPHABET)
    .map(arr => `<tr>${arr.map(char => `<td>${char}</td>`).join('')}</tr>`)
    .join('');
  }

  function generateCipherTable() {
    const form = document.encryptVigenereForm;
    const key = form.key.value.toUpperCase();

    document.querySelector('#cipherTable').innerHTML = Vigenere.getCipherTable(key, ALPHABET)
    .map(arr => `<tr>${arr.map(char => `<td>${char}</td>`).join('')}</tr>`)
    .join('');
  }

  init();

  return {
    encryptVigenere,
    decryptVigenere,
  }
})();
