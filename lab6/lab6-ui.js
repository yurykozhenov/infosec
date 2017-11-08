window.L6 = (function() {

  // RSA

  function initRSA() {
    const { p, q, d, e } = Cipher5.generateRSAKeys();
    const n = p * q;

    const signRSAForm = document.signRSAForm;
    signRSAForm.n.value = n;
    signRSAForm.e.value = e;
    signRSAForm.d.value = d;

    updateSignRSAKeys();
  }

  function signRSA() {
    const form = document.signRSAForm;
    const n = Number(form.n.value);
    const d = Number(form.d.value);

    const file = form.value.files[0];

    const fileReader = new FileReader();

    fileReader.onload = event => {
      const signature = Cipher6.signRSA(fileReader.result, d, n);

      form.s.value = signature;
    };

    fileReader.readAsText(file);
  }

  function verifyRSA() {
    const form = document.verifyRSAForm;
    const s = Number(form.s.value);
    const n = Number(form.n.value);
    const e = Number(form.e.value);

    const file = form.value.files[0];

    const fileReader = new FileReader();

    fileReader.onload = event => {
      const result = Cipher6.verifyRSA(fileReader.result, s, e, n);
      alert(result ? 'Підпис співпав!' : 'ПОМИЛКА: Підпис не співпав');
    };

    fileReader.readAsText(file);
  }

  function updateSignRSAKeys() {
    const form = document.signRSAForm;
    const n = Number(form.n.value);
    const e = Number(form.e.value);
    const d = Number(form.d.value);

    form.publicKey.value = `(${e}, ${n})`;
    form.privateKey.value = `(${d}, ${n})`;
  }

  function updateVerifyRSAKeys() {
    const form = document.verifyRSAForm;
    const n = Number(form.n.value);
    const e = Number(form.e.value);

    form.publicKey.value = `(${e}, ${n})`;
  }

  initRSA();

  // ELGAMAL

  function initElgamal() {
    const { p, g, x, y } = Cipher6.generateElgamalKeys();

    const signElgamalForm = document.signElgamalForm;
    signElgamalForm.p.value = p;
    signElgamalForm.g.value = g;
    signElgamalForm.x.value = x;
    signElgamalForm.y.value = y;
  }

  function signElgamal() {
    const form = document.signElgamalForm;
    const p = Number(form.p.value);
    const g = Number(form.g.value);
    const x = Number(form.x.value);

    const file = form.value.files[0];

    const fileReader = new FileReader();

    fileReader.onload = event => {
      const { a, b } = Cipher6.signElgamal(fileReader.result, p, g, x);

      form.a.value = a;
      form.b.value = b;
    };

    fileReader.readAsText(file);
  }

  function verifyElgamal() {
    const form = document.verifyElgamalForm;
    const p = Number(form.p.value);
    const g = Number(form.g.value);
    const y = Number(form.y.value);
    const a = Number(form.a.value);
    const b = Number(form.b.value);

    const file = form.value.files[0];

    const fileReader = new FileReader();

    fileReader.onload = event => {
      const result = Cipher6.verifyElgamal(fileReader.result, p, g, y, a, b);
      alert(result ? 'Підпис співпав!' : 'ПОМИЛКА: Підпис не співпав');
    };

    fileReader.readAsText(file);
  }

  initElgamal();

  return {
    signRSA,
    verifyRSA,
    updateSignRSAKeys,
    updateVerifyRSAKeys,

    signElgamal,
    verifyElgamal,
  }
})();
