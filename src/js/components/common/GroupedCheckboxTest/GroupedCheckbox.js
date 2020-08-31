import React, { Component } from 'react';

import CheckboxItem from './CheckboxItem';

class GroupedCheckbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parentCheckboxChecked: false,
    };
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps(nextProps) {
    this.updateParentWithChildren(nextProps);
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillMount() {
    this.updateParentWithChildren(this.props);
  }

  handleParentCheckboxChange = isChecked => {
    const { checkboxes, onCheckboxGroupChange } = this.props;
    const newCheckState = checkboxes.map(aCheckbox => ({
      ...aCheckbox,
      checked: isChecked,
    }));
    onCheckboxGroupChange(newCheckState);
  };

  updateParentWithChildren = props => {
    const { checkboxes } = props;
    let allChecked = false;
    for (let i = 0; i < checkboxes.length; i += 1) {
      if (checkboxes[i].checked) {
        allChecked = true;
      } else {
        allChecked = false;
        break;
      }
    }
    this.setState({
      parentCheckboxChecked: allChecked,
    });
  };

  handleChildCheckboxChange = (isChecked, index) => {
    const { checkboxes } = this.props;
    const { onCheckboxGroupChange } = this.props;
    const newCheckState = checkboxes.map((aCheckbox, i) =>
      index === i ? { ...aCheckbox, checked: isChecked } : aCheckbox,
    );
    onCheckboxGroupChange(newCheckState);
  };

  renderCheckboxes = () => {
    const { checkboxes } = this.props;
    if (!checkboxes) {
      return null;
    }
    return checkboxes.map((aCheckbox, index) => {
      return (
        <CheckboxItem
          // key={m}
          checkboxLabel={aCheckbox.name}
          checkboxValue={aCheckbox.id}
          checked={aCheckbox.checked}
          checkboxChangeCallback={
            checkStatus =>
              this.handleChildCheckboxChange(checkStatus, index)
            // eslint-disable-next-line react/jsx-curly-newline
          }
        />
      );
    });
  };

  render() {
    const { parentCheckboxChecked } = this.state;
    return (
      <div className="checklist-group">
        <div className="checklist-header">
          <div className="custom-checkbox">
            <CheckboxItem
              checkboxLabel="All"
              checkboxValue="all"
              checked={parentCheckboxChecked}
              checkboxChangeCallback={this.handleParentCheckboxChange}
            />
          </div>
        </div>
        <ul className="checkbox-list">{this.renderCheckboxes()}</ul>
      </div>

      // <div className="checkbox-wrapper">
      //   <div className="checkbox-head">
      //     <CheckboxItem
      //       checkboxLabel="All"
      //       checkboxValue="all"
      //       checked={parentCheckboxChecked}
      //       checkboxChangeCallback={this.handleParentCheckboxChange}
      //     />
      //   </div>
      //   <div className="checkbox-children">
      //     {this.renderCheckboxes()}
      //   </div>
      // </div>
    );
  }
}

export default GroupedCheckbox;
