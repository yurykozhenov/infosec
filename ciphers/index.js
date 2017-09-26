import { Additive } from './additive.js';
import { Multiplicative } from './multiplicative.js';
import { Affine } from './affine.js';

import { Playfair } from './playfair.js';
import { DoubleSquare } from './double-square.js';

import { Vigenere } from './vigenere.js';

export class Ciphers {
  static get Additive() { return Additive; }
  static get Multiplicative() { return Multiplicative; }
  static get Affine() { return Affine; }

  static get Playfair() { return Playfair; }
  static get DoubleSquare() { return DoubleSquare; }

  static get Vigenere() { return Vigenere; }
}
