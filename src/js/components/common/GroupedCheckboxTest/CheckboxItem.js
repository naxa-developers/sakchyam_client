import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Checkbox from './Checkbox';

class CheckboxItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleCheckboxChange = event => {
    const { checkboxChangeCallback } = this.props;
    checkboxChangeCallback(event.target.checked);
  };

  render() {
    const {
      classes,
      checkboxValue,
      checkboxLabel,
      checked,
    } = this.props;
    return (
      <Checkbox
        checked={checked}
        onChange={this.handleCheckboxChange}
        value={checkboxValue}
        label={checkboxLabel}
      />
    );
  }
}

export default CheckboxItem;

CheckboxItem.propTypes = {
  checkboxLabel: PropTypes.string.isRequired,
  checkboxValue: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  handleCheckboxChange: PropTypes.func,
};
CheckboxItem.defaultProps = {
  handleCheckboxChange: null,
};
