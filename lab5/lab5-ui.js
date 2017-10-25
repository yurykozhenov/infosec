window.L5 = (function() {
  function init() {
    const { p, q, d, e } = Cipher5.generateRSAKeys();
    const n = p * q;

    const encryptRSAForm = document.encryptRSAForm;
    encryptRSAForm.p.value = p;
    encryptRSAForm.q.value = q;
    encryptRSAForm.n.value = n;
    encryptRSAForm.e.value = e;
    encryptRSAForm.d.value = d;

    updateEncryptKeys();

    const decryptRSAForm = document.decryptRSAForm;
    decryptRSAForm.p.value = p;
    decryptRSAForm.q.value = q;
    decryptRSAForm.n.value = n;
    decryptRSAForm.e.value = e;
    decryptRSAForm.d.value = d;

    updateDecryptKeys();
  }

  function encryptRSA() {
    const form = document.encryptRSAForm;
    const p = Number(form.p.value);
    const q = Number(form.q.value);
    const n = Number(form.n.value);
    const e = Number(form.e.value);
    const d = Number(form.d.value);

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
    const n = Number(form.n.value);
    const e = Number(form.e.value);
    const d = Number(form.d.value);

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

  function updateEncryptKeys() {
    const form = document.encryptRSAForm;
    const p = Number(form.p.value);
    const q = Number(form.q.value);
    const n = Number(form.n.value);
    const e = Number(form.e.value);
    const d = Number(form.d.value);

    form.publicKey.value = `(${e}, ${n})`;
    form.privateKey.value = `(${d}, ${n})`;
  }

  function updateDecryptKeys() {
    const form = document.decryptRSAForm;
    const p = Number(form.p.value);
    const q = Number(form.q.value);
    const n = Number(form.n.value);
    const e = Number(form.e.value);
    const d = Number(form.d.value);

    form.publicKey.value = `(${e}, ${n})`;
    form.privateKey.value = `(${d}, ${n})`;
  }

  init();

  return {
    encryptRSA,
    decryptRSA,
    updateEncryptKeys,
    updateDecryptKeys,
  }
})();
