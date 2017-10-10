window.L4 = (function() {
  const PLACEHOLDER = 'Z';

  function init() {
    const encryptTranspositionForm = document.encryptTranspositionForm;
    encryptTranspositionForm.value.value = 'enemyattackstonight';
    encryptTranspositionForm.key.value = '31452';

    const decryptTranspositionForm = document.decryptTranspositionForm;
    decryptTranspositionForm.key.value = encryptTranspositionForm.key.value;

    encryptTransposition();
  }

  function encryptTransposition() {
    const form = document.encryptTranspositionForm;
    const value = form.value.value.toUpperCase();
    const key = form.key.value.toUpperCase().split('').map(num => Number(num) - 1);

    form.result.value = Cipher4.encryptTransposition(value, key, PLACEHOLDER);
  }

  function decryptTransposition() {
    const form = document.decryptTranspositionForm;
    const value = form.value.value.toUpperCase();
    const key = form.key.value.toUpperCase().split('').map(num => Number(num) - 1);

    form.result.value = Cipher4.decryptTransposition(value, key, PLACEHOLDER);
  }

  init();

  return {
    encryptTransposition,
    decryptTransposition,
  }
})();
