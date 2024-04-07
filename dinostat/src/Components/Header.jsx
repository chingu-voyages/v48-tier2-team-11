import { React, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navDisplay = () => {
    if (isOpen || window.innerWidth > 1250) {
      return 'flex';
    }
    return 'none';
  };

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className="header">
        <div className="menu">
          <button type="button" onClick={toggle}>
            =
          </button>
        </div>

        <div className="app-name">
          <h1>DinoStat</h1>
        </div>

        <div className="nav-links" style={{ display: navDisplay() }}>
          <ul className="nav-list">
            <li className="link-item"><Link to="/"> Home </Link></li>
            <li className="link-item"><Link to="/dinosaurs"> Dinosaur List </Link></li>
            <li className="link-item"><Link to="/charts"> Charts </Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
