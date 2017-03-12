import React from "react";

/*
Given a Float `float`, return a human-readable string explaining how to reason
about its value.
*/
function explainValue(float) {
  let strings = {
    isSpecialCase: "All bits of the exponent are 1, indicating that this float is a special case.",
    isDenormal: "All bits of the exponent are 0, indicating that this float is denormal.",
    isNormal: "This exponent is not a special case, so the float is normal. The significand will have an implied leading 1.",
    isInfinity: "The significand contains only 0 bits, so the float's value is infinite.",
    isNaN: "The significand contains some nonzero bits, so the float's value is NaN (not-a-number).",
    isPositive: "The sign bit is 0, indicating that the float is positive.",
    isNegative: "The sign bit is 1, indicating that the float is negative."
  };
  if (!float) {
    return "";
  }
  let exponentValue = float.exponentValue();
  let out = [];
  if (float.isNormal()) {
    out.push(strings.isNormal);
  } else if (float.isDenormal()) {
    out.push(strings.isDenormal);
  } else if (float.isSpecial()) {
    out.push(strings.isSpecialCase);
    if (exponentValue === Infinity) {
      out.push(strings.isInfinity);
    } else if (isNaN(exponentValue)) {
      out.push(strings.isNaN);
    }
  }
  if (!isNaN(exponentValue)) {
    if (float.sign() > 0) {
      out.push(strings.isPositive);
    } else {
      out.push(strings.isNegative);
    }
  }
  return out.join(" ");
}

export default class ValueDisplay extends React.Component {
  render() {
    let float = this.props.float;
    return (
      <div className="jumbotron">
        <h2>Float Value</h2>
        <div id="valueString">
          {float ? float.valueString() : "No float"}
        </div>
        <hr />
        <h3>Why?</h3>
        <div id="explanation">
          {explainValue(float)}
        </div>
      </div>
    );
  }
};

ValueDisplay.propTypes = {
  float: React.PropTypes.object
};
