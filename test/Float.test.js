import assert from "assert";
import arrayEqual from "array-equal";
import {unsignedValue, floatFactory, Minifloat} from "../Float";

describe("floatFactory", function () {

  it("is a function", function () {
    assert.strictEqual(typeof(floatFactory), "function");
  });

});

describe("unsignedValue", function () {
  it("returns a number", function () {
    assert.strictEqual(typeof(unsignedValue([0])), "number");
  });

  it("returns 0 for the empty Array", function () {
    assert.strictEqual(unsignedValue([]), 0);
  });

  it("returns 7 for 111", function () {
    assert.strictEqual(unsignedValue([1,1,1]), 7);
  });
});

describe("Minifloat", function () {
  let mf = new Minifloat();

  it("constructs instances", function () {
    assert(mf instanceof Minifloat);
  });

  it("has 4 exponent bits", function () {
    assert.strictEqual(Minifloat.numExponentBits, 4);
  });

  it("has 3 significand bits", function () {
    assert.strictEqual(Minifloat.numSignificandBits, 3);
  });

  it("has a bias of 7", function () {
    assert.strictEqual(Minifloat.bias, 7);
  });

  it("has 8 total bits", function () {
    assert.strictEqual(Minifloat.numBits, 8);
  });
});

describe("Minifloat with pattern 01111000", function () {
  let mf = new Minifloat([0, 1, 1, 1, 1, 0, 0, 0]);

  it("has 0 sign bit", function () {
    assert.strictEqual(mf.signBit, 0);
  });

  it("has 1111 exponentBits", function () {
    assert(arrayEqual(mf.exponentBits, [1, 1, 1, 1]));
  });

  it("has 000 significandBits", function () {
    assert(arrayEqual(mf.significandBits, [0, 0, 0]));
  });

  it("has exponentValue Infinity", function () {
    assert.strictEqual(mf.exponentValue(), Infinity);
  });

  it("has value Infinity", function () {
    assert.strictEqual(mf.value(), Infinity);
  });
});

describe("Minifloat with pattern 11111000", function () {
  let mf = new Minifloat([1, 1, 1, 1, 1, 0, 0, 0]);

  it("has 1 sign bit", function () {
    assert.strictEqual(mf.signBit, 1);
  });

  it("has 1111 exponentBits", function () {
    assert(arrayEqual(mf.exponentBits, [1, 1, 1, 1]));
  });

  it("has 000 significandBits", function () {
    assert(arrayEqual(mf.significandBits, [0, 0, 0]));
  });

  it("has exponent value Infinity", function () {
    assert.strictEqual(mf.exponentValue(), Infinity);
  });

  it("has value -Infinity", function () {
    assert.strictEqual(mf.value(), -Infinity);
  });
});

describe("Minifloat with pattern 011110001", function () {
  let mf = new Minifloat([0, 1, 1, 1, 1, 0, 0, 1]);

  it("has 0 sign bit", function () {
    assert.strictEqual(mf.signBit, 0);
  });

  it("has 1111 exponentBits", function () {
    assert(arrayEqual(mf.exponentBits, [1, 1, 1, 1]));
  });

  it("has 001 significandBits", function () {
    assert(arrayEqual(mf.significandBits, [0, 0, 1]));
  });

  it("has exponentValue NaN", function () {
    assert(isNaN(mf.exponentValue()));
  });

  it("has value NaN", function () {
    assert(isNaN(mf.value()));
  });
});

describe("Minifloat with pattern 00000000 (positive 0)", function () {
  let mf = new Minifloat([0, 0, 0, 0, 0, 0, 0, 0]);

  it("has 0 sign bit", function () {
    assert.strictEqual(mf.signBit, 0);
  });

  it("has 0000 exponentBits", function () {
    assert(arrayEqual(mf.exponentBits, [0, 0, 0, 0]));
  });

  it("has 000 significandBits", function () {
    assert(arrayEqual(mf.significandBits, [0, 0, 0]));
  });

  it("has exponentValue -6", function () {
    assert.strictEqual(mf.exponentValue(), -6);
  });

  it("has value 0", function () {
    assert.strictEqual(mf.value(), 0);
  });
});

describe("Minifloat with pattern 10000000 (negative 0)", function () {
  let mf = new Minifloat([1, 0, 0, 0, 0, 0, 0, 0]);

  it("has 1 sign bit", function () {
    assert.strictEqual(mf.signBit, 1);
  });

  it("has 0000 exponentBits", function () {
    assert(arrayEqual(mf.exponentBits, [0, 0, 0, 0]));
  });

  it("has 000 significandBits", function () {
    assert(arrayEqual(mf.significandBits, [0, 0, 0]));
  });

  it("has exponentValue -6", function () {
    assert.strictEqual(mf.exponentValue(), -6);
  });

  it("has value 0", function () {
    assert.strictEqual(mf.value(), 0);
  });
});

describe("Minifloat with pattern 01110101", function () {
  let mf = new Minifloat([0, 1, 1, 1, 0, 1, 0, 1]);

  it("has 0 sign bit", function () {
    assert.strictEqual(mf.signBit, 0);
  });

  it("has 1110 exponentBits", function () {
    assert(arrayEqual(mf.exponentBits, [1, 1, 1, 0]));
  });

  it("has 101 significandBits", function () {
    assert(arrayEqual(mf.significandBits, [1, 0, 1]));
  });

  it("has exponentValue 7", function () {
    assert.strictEqual(mf.exponentValue(), 7);
  });

  it("has value 208", function () {
    assert.strictEqual(mf.value(), 208);
  });
});
