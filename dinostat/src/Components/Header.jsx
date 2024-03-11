import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div>
      <ul>
        <li><Link to="/"> Home </Link></li>
        <li><Link to="/dinosaurs"> Dinosaur List </Link></li>
        <li><Link to="/charts"> Charts </Link></li>
      </ul>
    </div>
  );
}
