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

  renderBitGroup(groupInfo, offset, totalNumBits) {
    let group = [];
    for (let j = 0; j < groupInfo.bits; j++) {
      let bitNumber = offset + j;
      group.push(
        <BitInput
          key={"bit-" + bitNumber}
          ref={(input) => {this.inputs[bitNumber] = input;}}
          onChange={this.handleChange}
          getNextInputRef={bitNumber < totalNumBits - 1 ? () => this.inputs[bitNumber + 1] : null}
          getPrevInputRef={bitNumber > 0 ? () => this.inputs[bitNumber - 1] : null}
        />
      );
    }
    return (
      <div key={"group-" + groupInfo.name} className="bit-group" style={{flex: groupInfo.bits}}>
        <h3 className="name">{groupInfo.name}</h3>
        <div className="bit-group-input-wrapper">
          {group}
        </div>
      </div>
    );
  }

  render() {
    let numBits = 1 + this.props.numExponentBits + this.props.numSignificandBits;
    let groupInfo = [
      {name: "Sign", bits: 1},
      {name: "Exponent", bits: this.props.numExponentBits},
      {name: "Significand", bits: this.props.numSignificandBits}
    ];
    let offset = 0;
    let inputs = groupInfo.map((group, i) => {
      let g = this.renderBitGroup(group, offset, numBits);
      offset += group.bits;
      return g;
    });
    return (
      <div className="binary-input">
        <h2>Bit pattern</h2>
        <div className="groups-wrapper">
          {inputs}
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
