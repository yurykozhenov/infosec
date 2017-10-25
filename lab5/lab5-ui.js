window.L5 = (function() {
  function init() {
    const { p, q, d, e } = Cipher5.generateRSAKeys();
    const n = p * q;

    const encryptRSAForm = document.encryptRSAForm;
    encryptRSAForm.p.value = p;
    encryptRSAForm.q.value = q;
    encryptRSAForm.d.value = d;
    encryptRSAForm.e.value = e;
    encryptRSAForm.publicKey.value = `(${e}, ${n})`;
    encryptRSAForm.privateKey.value = `(${d}, ${n})`;

    const decryptRSAForm = document.decryptRSAForm;
    decryptRSAForm.p.value = p;
    decryptRSAForm.q.value = q;
    decryptRSAForm.d.value = d;
    decryptRSAForm.e.value = e;
    decryptRSAForm.publicKey.value = `(${e}, ${n})`;
    decryptRSAForm.privateKey.value = `(${d}, ${n})`;
  }

  function encryptRSA() {
    const form = document.encryptRSAForm;
    const p = Number(form.p.value);
    const q = Number(form.q.value);
    const e = Number(form.e.value);
    const n = p * q;

    const file = form.value.files[0];

    const fileReader = new FileReader();

    fileReader.onload = event => {
      const result = Cipher5.encryptRSA(fileReader.result, e, n);

      const newFile = new Blob([result], { type: file.type });
      const fileUrl = URL.createObjectURL(newFile);

      const link = document.createElement('a');
      link.download = 'encrypted_' + file.name;
      link.href = fileUrl;
      link.click();
    };

    fileReader.readAsText(file);
  }

  function decryptRSA() {
    const form = document.decryptRSAForm;
    const p = Number(form.p.value);
    const q = Number(form.q.value);
    const d = Number(form.d.value);
    const n = p * q;

    const file = form.value.files[0];

    const fileReader = new FileReader();

    fileReader.onload = event => {
      const result = Cipher5.decryptRSA(fileReader.result, d, n);

      const newFile = new Blob([result], { type: file.type });
      const fileUrl = URL.createObjectURL(newFile);

      const link = document.createElement('a');
      link.download = 'decrypted_' + file.name;
      link.href = fileUrl;
      link.click();
    };

    fileReader.readAsText(file);
  }

  init();

  return {
    encryptRSA,
    decryptRSA,
  }
})();
