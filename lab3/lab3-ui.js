window.L3 = (function() {
  const ALPHABET = 'АБВГДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯ ';

  function init() {
    const encryptVigenereForm = document.encryptVigenereForm;
    encryptVigenereForm.value.value = 'Захист інформації';
    encryptVigenereForm.key.value = 'Мова';

    const decryptVigenereForm = document.decryptVigenereForm;
    decryptVigenereForm.key.value = encryptVigenereForm.key.value;

    createTables(encryptVigenereForm.key.value);

    encryptVigenere();
  }

  function encryptVigenere() {
    const form = document.encryptVigenereForm;
    const value = form.value.value.toUpperCase();
    const key = form.key.value.toUpperCase();

    createTables(key);

    form.result.value = Cipher3.encryptVigenere(value, key, ALPHABET);
  }

  function decryptVigenere() {
    const form = document.decryptVigenereForm;
    const value = form.value.value.toUpperCase();
    const key = form.key.value.toUpperCase();

    createTables(key);

    form.result.value = Cipher3.decryptVigenere(value, key, ALPHABET);
  }

  function createTables(key) {
    document.querySelector('#cipherTable').innerHTML = Cipher3._getCipherTable(key, ALPHABET)
      .map(arr => `<tr>${arr.map(char => `<td>${char}</td>`).join('')}</tr>`)
      .join('');

    document.querySelector('#table').innerHTML = Cipher3._getVigenereTable(ALPHABET)
      .map(arr => `<tr>${arr.map(char => `<td>${char}</td>`).join('')}</tr>`)
      .join('');
  }

  init();

  return {
    encryptVigenere,
    decryptVigenere,
  }
})();
