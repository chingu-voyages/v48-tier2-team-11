import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function DinoList() {
  // Holds response data from the api to be fed to each dinosaur card.
  const [dinoJsonList, setDinoJsonList] = useState([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]);

  // TODO: Add useEffect block that calls api and uses response data to set dinoJsonList

  return (
    <div>
      {dinoJsonList.map((x) => (
        <ul>
          <Link to={`/dinosaurs/ ${x.id}`}>
            {x.id}
          </Link>
        </ul>
      ))}
    </div>
  );
}
