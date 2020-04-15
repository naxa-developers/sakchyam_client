import React, { Component } from 'react';
import { useHistory } from 'react-router-dom';

const history = useHistory();

class LogOutButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // eslint-disable-next-line consistent-return
  //   handleLogOutClick = () => {
  //     if (localStorage.getItem('userToken')) {
  //       localStorage.removeItem('userToken');
  //       history.push('/');
  //     }
  //   };

  render() {
    return (
      <button
        style={{ zIndex: 999999999, position: 'fixed' }}
        type="button"
        onClick={this.handleLogOutClick}
      >
        Log Out
      </button>
    );
  }
}

export default LogOutButton;
