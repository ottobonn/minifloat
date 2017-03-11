import React from "react";

export default class BinaryInput extends React.Component {

  constructor(props) {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    if (this.props.onChange) {
      this.props.onChange(event.target.value);
    }
  }

  render() {
    return (
      <div className="form-group row">
        <label htmlFor="binaryInput" className="col-xs-12 col-2 col-form-label">Enter a bit pattern</label>
        <div className="col-xs-12 col-10">
          <input className="form-control" type="text" id="binaryInput" placeholder="Float bit pattern" onChange={this.handleChange} />
        </div>
      </div>
    );
  };
};

BinaryInput.propTypes = {
  numBits: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func
};
