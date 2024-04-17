import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [width, setWidth] = useState(window.innerWidth);

  const updateDimensions = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const navDisplay = () => {
    if (isOpen || width > 1250) {
      return 'flex';
    }
    return 'none';
  };

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className="header bg-[#003B49]">
        <div className="menu">
          <button type="button" onClick={toggle}>
            =
          </button>
        </div>

        <div className="app-name">
          <h1 className="text-[#D6D2C4]"><Link to="/"> DinoStat </Link></h1>
        </div>

        <div className="nav-links" style={{ display: navDisplay() }}>
          <ul className="nav-list">
            <li className="link-item text-[#D6D2C4]"><Link to="/dinosaurs"> Dinosaur List </Link></li>
            <li className="link-item text-[#D6D2C4]"><Link to="/charts"> Charts </Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
