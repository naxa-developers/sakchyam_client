/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import LeftPortion from './LeftPortion';
import RightPortion from './RightPortion';

class DiagramSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRedActive: false,
      isBlueActive: false,
      isGreenActive: false,
    };
  }

  onRedClick = () => {
    this.setState(prev => ({
      isRedActive: !prev.isRedActive,
      isBlueActive: false,
      isGreenActive: false,
    }));
  };

  onBlueClick = () => {
    this.setState(prev => ({
      isBlueActive: !prev.isBlueActive,
      isRedActive: false,
      isGreenActive: false,
    }));
  };

  onGreenClick = () => {
    this.setState(prev => ({
      isGreenActive: !prev.isGreenActive,
      isRedActive: false,
      isBlueActive: false,
    }));
  };

  render() {
    const { isRedActive, isBlueActive, isGreenActive } = this.state;

    return (
      <main className="payment-system">
        <LeftPortion
          isRedActive={isRedActive}
          isBlueActive={isBlueActive}
          isGreenActive={isGreenActive}
          onRedClick={this.onRedClick}
          onBlueClick={this.onBlueClick}
          onGreenClick={this.onGreenClick}
        />

        <RightPortion
          isRedActive={isRedActive}
          isBlueActive={isBlueActive}
          isGreenActive={isGreenActive}
          onRedClick={this.onRedClick}
          onBlueClick={this.onBlueClick}
          onGreenClick={this.onGreenClick}
        />
      </main>
    );
  }
}

export default DiagramSection;
