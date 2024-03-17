import React from 'react';
import { Link } from 'react-router-dom';
import missing from '/missing.png';

export default function DinoCard({ id, img, title, description }) {
  return (
    <div className="dinoCard">
      <img src={img === 'N/A' ? missing : img} alt="Dinosaur" width={200} height={200} />
      <div>
        <div className="dinoCard-title">{title}</div>
        {description.length < 80
          ? <div className="dinoCard-description">{description}</div>
          : <div className="dinoCard-description">{description.slice(0, 77)}...</div>}
        <Link to={`/dinosaurs/${id}`}>
          <button type="button" className="moreInfo">More info</button>
        </Link>
      </div>
    </div>
  );
}
