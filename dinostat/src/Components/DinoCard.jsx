import React from 'react';
import { Link } from 'react-router-dom';
import missing from '../../public/missing.png';

export default function DinoCard({
  id, img, title, description,
}) {
  return (
    <div className="dinoCard">
      <img src={img === 'N/A' ? missing : img} alt="Dinosaur" width={200} height={200} />
      <div className="detail-div">
        <div className="dinoCard-title">{title}</div>
        <div className="dinoCard-description">{description}</div>
        <div className="moreInfo-div">
          <Link to={`/dinosaurs/${id}`}>
            <button type="button" className="moreInfo">More info</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
