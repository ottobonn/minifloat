import React from "react";

import BitInput from "./BitInput";

export default class BinaryInput extends React.Component {

  constructor(props) {
    super();
    this.handleChange = this.handleChange.bind(this);
    let numBits = 1 + props.numExponentBits + props.numSignificandBits;
    this.inputs = new Array(numBits);
    this.values = new Array(numBits);
  }

  handleChange() {
    if (this.props.onChange) {
      let bits = this.inputs.reduce((acc, input) => acc + input.value(), "");
      this.props.onChange(bits);
    }
  }

  render() {
    let numBits = 1 + this.props.numExponentBits + this.props.numSignificandBits;
    let inputs = [];
    let values = [];
    let labelInfo = [
      {name: "Sign", bits: 1},
      {name: "Exponent", bits: this.props.numExponentBits},
      {name: "Significand", bits: this.props.numSignificandBits}
    ];
    let labels = labelInfo.map((l, index) => {
      return (
        <td key={"label" + index} colSpan={l.bits}>
          {l.name}
        </td>
      );
    });
    for (let i = 0; i < numBits; i++) {
      inputs.push(
        <td key={"bit" + i}>
          <BitInput
            ref={(input) => {this.inputs[i] = input;}}
            onChange={this.handleChange}
            getNextInputRef={i < numBits - 1 ? () => this.inputs[i + 1] : null}
            getPrevInputRef={i > 0 ? () => this.inputs[i - 1] : null}
          />
        </td>
      );
      values.push(
        <td key={"value" + i}>
          <div ref={(elem) => {this.values[i] = elem;}} />
        </td>
      );
    }

    return (
      <div className="form-group row">
        <label className="col-xs-12 col-2 col-form-label">Enter a bit pattern</label>
        <div className="col-xs-12 col-10">
          <table>
            <tbody>
              <tr>
                {labels}
              </tr>
              <tr>
                {inputs}
              </tr>
              <tr>
                {values}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };
};

BinaryInput.propTypes = {
  numExponentBits: React.PropTypes.number.isRequired,
  numSignificandBits: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func
};
