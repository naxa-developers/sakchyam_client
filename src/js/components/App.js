import React, { Component } from 'react';
import logo from '../../images/saklogo.jpg';

class App extends Component {
  handleChange = event => {
    const { value } = event.target;
    this.setState(() => {
      return {
        value,
      };
    });
  };

  render() {
    return (
      <div>
        <img alt="sakchyam" src={logo} />
      </div>
    );
  }
}

export default App;
