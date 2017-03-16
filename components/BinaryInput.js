import React from "react";

import BitInput from "./BitInput";

export default class BinaryInput extends React.Component {

  constructor(props) {
    super();
    this.handleChange = this.handleChange.bind(this);
    let numBits = 1 + props.numExponentBits + props.numSignificandBits;
    this.inputs = new Array(numBits);
  }

  handleChange() {
    if (this.props.onChange) {
      let bits = this.inputs.reduce((acc, input) => acc + input.value(), "");
      this.props.onChange(bits);
    }
  }

  renderSignValue() {
    return (
      <span className="bit-value-wrapper">
        {this.props.float ? this.props.float.sign() : ""}
      </span>
    );
  }

  renderExponentValue() {
    if (this.props.float) {
      let numExponentBits = this.props.float.exponentBits.length;
      return this.props.float.exponentBits.map((bit, index) => {
        let value = 0;
        if (bit) {
          value = (<span>2<sup>{numExponentBits - index - 1}</sup></span>);
        }
        return (
          <span key={index} className="bit-value-wrapper">
            {value}
          </span>
        );
      });
    } else {
      return null;
    }
  }

  renderSignificandValue() {
    if (this.props.float) {
      let exponent = this.props.float.exponentValue();
      let values = this.props.float.significandBits.map((bit, index) => {
        let value = 0;
        if (bit) {
          value = (<span>2<sup>{exponent - index - 1}</sup></span>);
        }
        return (
          <span key={index} className="bit-value-wrapper">
            {value}
          </span>
        );
      });
      return values;
    } else {
      return null;
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
      <div key={"group-" + groupInfo.name} className={`bit-group ${groupInfo.name.toLowerCase()}`} style={{flex: groupInfo.bits}}>
        <h3 className="name">{groupInfo.name}</h3>
        <div className="input-wrapper">
          {group}
        </div>
        <div className="value-wrapper">
          {groupInfo.renderValue()}
        </div>
      </div>
    );
  }

  render() {
    let numBits = 1 + this.props.numExponentBits + this.props.numSignificandBits;
    let groupInfo = [
      {
        name: "Sign",
        bits: 1,
        renderValue: () => this.renderSignValue()
      },
      {
        name: "Exponent",
        bits: this.props.numExponentBits,
        renderValue: () => this.renderExponentValue()
      },
      {
        name: "Significand",
        bits: this.props.numSignificandBits,
        renderValue: () => this.renderSignificandValue()
      }
    ];
    let offset = 0;
    let groups = groupInfo.map((group, i) => {
      let g = this.renderBitGroup(group, offset, numBits);
      offset += group.bits;
      return g;
    });
    return (
      <div className="binary-input">
        <h2>Bit pattern</h2>
        <p>Enter the float bit pattern below:</p>
        <div className="groups-wrapper">
          {groups}
        </div>
      </div>
    );
  };
};

BinaryInput.propTypes = {
  numExponentBits: React.PropTypes.number.isRequired,
  numSignificandBits: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func,
  float: React.PropTypes.object
};
