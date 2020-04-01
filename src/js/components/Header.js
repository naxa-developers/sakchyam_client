import React from 'react';
import Logo from '../../img/logo.png';
import UkaidLogo from '../../img/ukaid.png';

function Header() {
  return (
    <header className="main-header">
      <div className="container">
        <ul>
          <li>
            <a href="index.html" className="logo">
              <img src={Logo} alt="sakchyam logo" />
            </a>
          </li>
          <li>
            <a href="index.html" className="logo">
              <img src={UkaidLogo} alt="ukaid" />
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
