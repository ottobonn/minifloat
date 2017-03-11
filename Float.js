import assert from "assert";

function unsignedValue(bitArray) {
  return bitArray.reduce((sum, currentBit, index, array) => {
    var positionFromLSB = array.length - index - 1;
    return sum + currentBit * (1 << positionFromLSB);
  }, 0);
};

function floatFactory(numExponentBits=4, numSignificandBits=3) {
  let bias = (1 << (numExponentBits - 1)) - 1;

  class CustomFloat {
    constructor(bitPattern) {
      this.signBit = 0;
      this.exponentBits = new Array(numExponentBits).fill(0);
      this.significandBits = new Array(numSignificandBits).fill(0);
      if (bitPattern) {
        assert(Array.isArray(bitPattern));
        assert.strictEqual(bitPattern.length, 1 + numExponentBits + numSignificandBits);
        this.signBit = bitPattern[0];
        this.exponentBits = bitPattern.slice(1, 1 + numExponentBits);
        this.significandBits = bitPattern.slice(1 + numExponentBits);
      }
    }

    isDenormal() {
      return unsignedValue(this.exponentBits) === 0;
    }

    sign() {
      return this.signBit ? -1 : 1;
    }

    exponentValue() {
      let rawExp = unsignedValue(this.exponentBits);
      let significandValue = unsignedValue(this.significandBits);
      if (this.isDenormal()) {
        return 1 - bias;
      } else if (rawExp === (1 << numExponentBits) - 1) {
        // All-1 exponent
        if (significandValue === 0) {
          return this.sign() * Infinity;
        } else {
          return NaN;
        }
      } else {
        // Normal number
        return rawExp - bias;
      }
    }

    significandValueString() {
      return this.significandBits.map((currentBit, index) => {
        return currentBit ? `2^(-${index + 1})` : "0";
      }).join(" + ");
    }

    valueString() {
      var expValue = this.exponentValue();
      if (!isFinite(expValue) || isNaN(expValue)) {
        return expValue.toString();
      }
      var sign = this.sign().toString();
      var exp = `2^${expValue}`;
      var ones = this.isDenormal() ? "0" : "1";
      var sig = this.significandValueString();
      return `${sign} * ${exp} * ( ${ones} + ${sig} )`;
    }

  };
  CustomFloat.numExponentBits = numExponentBits;
  CustomFloat.numSignificandBits = numSignificandBits;
  CustomFloat.bias = bias;
  return CustomFloat;
};

let Minifloat = floatFactory(4, 3);
let Float = floatFactory(8, 23);

export {unsignedValue, floatFactory, Minifloat, Float};
