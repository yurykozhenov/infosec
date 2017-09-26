import { Cipher2 } from './lab2-cipher.js';

window.L2 = (function() {
  const PLAYFAIR_KEY = [
    ['L', 'G', 'D', 'B', 'A'],
    ['Q', 'M', 'H', 'E', 'C'],
    ['U', 'R', 'N', 'I', 'F'],
    ['X', 'V', 'S', 'O', 'K'],
    ['Z', 'Y', 'W', 'T', 'P'],
  ];
  const DOUBLE_SQUARE_KEY_1 = [
    ['Ч', ' ', 'В', 'І', 'П'],
    ['О', 'К', 'Й', 'Д', 'У'],
    ['Г', 'Ш', 'З', 'Є', 'Ф'],
    ['Л', 'Ї', 'Х', 'А', ','],
    ['Ю', 'Р', 'Ж', 'Щ', 'Н'],
    ['Ц', 'Б', 'И', 'Т', 'Ь'],
    ['.', 'С', 'Я', 'М', 'Е'],
  ];
  const DOUBLE_SQUARE_KEY_2 = [
    ['Е', 'Л', 'Ц', 'Й', 'П'],
    ['.', 'Х', 'Ї', 'А', 'Н'],
    ['Ш', 'Д', 'Є', 'К', 'С'],
    ['І', ' ', 'Б', 'Ф', 'У'],
    ['Я', 'Т', 'И', 'Ч', 'Г'],
    ['М', 'О', ',', 'Ж', 'Ь'],
    ['В', 'Щ', 'З', 'Ю', 'Р'],
  ];
  const PLAYFAIR_PLACEHOLDER = 'X';
  const DOUBLE_SQUARE_PLACEHOLDER = ' ';

  function init() {
    const encryptPlayfairForm = document.encryptPlayfairForm;
    encryptPlayfairForm.value.value = 'hello';

    const encryptDoubleSquareForm = document.encryptDoubleSquareForm;
    encryptDoubleSquareForm.value.value = 'приїзджаю шостого';

    encryptPlayfair();
    encryptDoubleSquare();
  }

  function encryptPlayfair() {
    const form = document.encryptPlayfairForm;
    const value = form.value.value;

    form.result.value = Cipher2.encryptPlayfair(
      value.toUpperCase().replace(/ /g, ''),
      PLAYFAIR_KEY,
      PLAYFAIR_PLACEHOLDER
    );
  }

  function encryptDoubleSquare() {
    const form = document.encryptDoubleSquareForm;
    const value = form.value.value;

    form.result.value = Cipher2.encryptDoubleSquare(
      value.toUpperCase(),
      DOUBLE_SQUARE_KEY_1,
      DOUBLE_SQUARE_KEY_2,
      DOUBLE_SQUARE_PLACEHOLDER,
    );
  }

  function decryptPlayfair() {
    const form = document.decryptPlayfairForm;
    const value = form.value.value;

    form.result.value = Cipher2.decryptPlayfair(
      value.toUpperCase().replace(/ /g, ''),
      PLAYFAIR_KEY,
      PLAYFAIR_PLACEHOLDER
    );
  }

  function decryptDoubleSquare() {
    const form = document.decryptDoubleSquareForm;
    const value = form.value.value;

    form.result.value = Cipher2.decryptDoubleSquare(
      value.toUpperCase(),
      DOUBLE_SQUARE_KEY_1,
      DOUBLE_SQUARE_KEY_2,
      DOUBLE_SQUARE_PLACEHOLDER,
    );
  }

  init();

  return {
    encryptPlayfair,
    encryptDoubleSquare,
    decryptPlayfair,
    decryptDoubleSquare,
  }
})();
