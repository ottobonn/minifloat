import React from "react";

export default class SpecDisplay extends React.Component {
  render() {
    let floatClass = this.props.floatClass;
    return(
      <div className="jumbotron spec-display">
        <h2>{`${floatClass.typeName} Details`}</h2>
        <dl>
          <dt>Width</dt>
          <dd>{`${floatClass.numBits} bits`}</dd>

          <dt>Exponent Bits</dt>
          <dd>{`${floatClass.numExponentBits} bits`}</dd>

          <dt>Significand Bits</dt>
          <dd>{`${floatClass.numSignificandBits} bits`}</dd>

          <dt>Exponent Bias</dt>
          <dd>{`${floatClass.bias}`}</dd>

          <dt>Formula for epsilon</dt>
          <dd>&epsilon; = 2<sup>(exp - {floatClass.numSignificandBits})</sup></dd>
        </dl>
      </div>
    );
  }
};

SpecDisplay.propTypes = {
  floatClass: React.PropTypes.func.isRequired
};
