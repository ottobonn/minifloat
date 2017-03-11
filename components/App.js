import React from "react";
import {Minifloat} from "../Float";

import BinaryInput from "./BinaryInput";

export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
      float: null,
      numBits: 8
    };
    this.handleChange = this.handleChange.bind(this);
  }

  parseBits(string) {
    length = string.length;
    if (length != this.state.numBits) {
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
    let bits = this.parseBits(valueString);
    if (bits) {
      this.setState({
        float: new Minifloat(bits)
      });
    } else {
      this.setState({
        float: null
      });
    }
  }

  render() {
    return (
      <div>
        <form>
          <BinaryInput numBits={8} onChange={this.handleChange} />
        </form>
        <div className="jumbotron">
          <h2>Float Value</h2>
          <div id="valueString">
            {this.state.float ? this.state.float.valueString() : "No float"}
          </div>
        </div>

      </div>
    );
  }
};
