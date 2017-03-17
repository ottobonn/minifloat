import React from "react";
import {Minifloat} from "../Float";

import BinaryInput from "./BinaryInput";
import ValueDisplay from "./ValueDisplay";
import SpecDisplay from "./SpecDisplay";

export default class FloatPage extends React.Component {

  constructor() {
    super();
    this.state = {
      float: null,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  parseBits(string) {
    let floatClass = this.props.floatClass;
    let length = string.length;
    if (length != floatClass.numBits) {
      return null;
    }
    let bits = new Array(length);
    for (let i = 0; i < length; i++) {
      let bit = parseInt(string[i]);
      if (bit != 0 && bit != 1) {
        return null;
      }
      bits[i] = bit;
    }
    return bits;
  }

  handleChange(valueString) {
    let floatClass = this.props.floatClass;
    let bits = this.parseBits(valueString);
    if (bits) {
      this.setState({
        float: new floatClass(bits)
      });
    } else {
      this.setState({
        float: null
      });
    }
  }

  render() {
    let floatClass = this.props.floatClass;
    return (
      <div>
        <form>
          <BinaryInput
            numExponentBits={floatClass.numExponentBits}
            numSignificandBits={floatClass.numSignificandBits}
            onChange={this.handleChange}
            float={this.state.float}
          />
        </form>
        <ValueDisplay float={this.state.float} />
        <SpecDisplay floatClass={floatClass} />
      </div>
    );
  }
};

FloatPage.propTypes = {
  floatClass: React.PropTypes.func.isRequired
};
