import React from "react";

export default class BitInput extends React.Component {

  isValidBit(value) {
    return (value === "0" || value === "1");
  }

  focus() {
    this.input.focus();
    this.input.select();
  }

  value() {
    if (this.isValidBit(this.input.value)) {
      return this.input.value;
    }
    return undefined;
  }

  render() {
    return (
      <div className="bit-input-wrapper">
        <input
          type="number"
          className="bit-input"
          min="0"
          max="1"
          maxLength="1"
          ref={(input) => {this.input = input;}}
          onFocus={() => this.focus()}
          onChange={(event) => {
            // Handle the new value and advance to the next input
            if (this.props.onChange) {
              this.props.onChange(event.target.value);
            }
            if (this.isValidBit(event.target.value)) {
              if (this.props.getNextInputRef) {
                this.props.getNextInputRef().focus();
              }
            }
          }}
          onKeyDown={(event) => {
            // Back up through the inputs on backspace
            let backspace = (event.keyCode === 8);
            if (backspace) {
              if (event.target.value === "" && this.props.getPrevInputRef) {
                this.props.getPrevInputRef().focus();
              }
            } else {
              // Prevent more than one bit in this field
              if (event.target.value.length == 1 && !this.input.isSelected()) {
                event.preventDefault();
              }
            }
          }}
        />
      </div>
    );
  }
};

BitInput.propTypes = {
  getNextInputRef: React.PropTypes.func,
  getPrevInputRef: React.PropTypes.func,
  onChange: React.PropTypes.func
};
