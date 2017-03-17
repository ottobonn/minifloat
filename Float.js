import assert from "assert";

function unsignedValue(bitArray) {
  return bitArray.reduce((sum, currentBit, index, array) => {
    var positionFromLSB = array.length - index - 1;
    return sum + currentBit * (1 << positionFromLSB);
  }, 0);
};

function floatFactory(numExponentBits=4, numSignificandBits=3, name="Custom Float") {
  let bias = (1 << (numExponentBits - 1)) - 1;

  class CustomFloat {
    constructor(bitPattern) {
      this.signBit = 0;
      this.exponentBits = new Array(numExponentBits).fill(0);
      this.significandBits = new Array(numSignificandBits).fill(0);
      if (bitPattern) {
        assert(Array.isArray(bitPattern), "Float bit pattern must be an array.");
        let numBits = 1 + numExponentBits + numSignificandBits;
        assert.strictEqual(bitPattern.length, numBits, `Float bit pattern must contain ${numBits} bits.`);
        this.signBit = bitPattern[0];
        this.exponentBits = bitPattern.slice(1, 1 + numExponentBits);
        this.significandBits = bitPattern.slice(1 + numExponentBits);
      }
    }

    isDenormal() {
      return unsignedValue(this.exponentBits) === 0;
    }

    isSpecial() {
      return unsignedValue(this.exponentBits) === (1 << numExponentBits) - 1;
    }

    isNormal() {
      return !(this.isDenormal() || this.isSpecial());
    }

    sign() {
      return this.signBit ? -1 : 1;
    }

    value() {
      let exponentValue = this.exponentValue();
      if (!isFinite(exponentValue) || isNaN(exponentValue)) {
        return this.sign() * exponentValue;
      } else {
        let significandValue = unsignedValue(this.significandBits) / Math.pow(2, this.significandBits.length);
        if (this.isNormal()) {
          significandValue += 1;
        }
        return this.sign() * Math.pow(2, exponentValue) * significandValue;
      }
    }

    exponentValue() {
      let rawExp = unsignedValue(this.exponentBits);
      let significandValue = unsignedValue(this.significandBits);
      if (this.isDenormal()) {
        return 1 - bias;
      } else if (this.isSpecial()) {
        // All-1 exponent
        if (significandValue === 0) {
          return Infinity;
        } else {
          return NaN;
        }
      } else {
        // Normal number
        return rawExp - bias;
      }
    }
  };
  CustomFloat.numExponentBits = numExponentBits;
  CustomFloat.numSignificandBits = numSignificandBits;
  CustomFloat.bias = bias;
  CustomFloat.numBits = 1 + numExponentBits + numSignificandBits;
  CustomFloat.typeName = name;
  return CustomFloat;
};

let Minifloat = floatFactory(4, 3, "Minifloat");
let Float = floatFactory(8, 23, "IEEE-754 Float");

export {unsignedValue, floatFactory, Minifloat, Float};
