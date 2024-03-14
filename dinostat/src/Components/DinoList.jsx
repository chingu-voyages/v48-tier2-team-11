import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function DinoList() {
  // Holds response data from the api to be fed to each dinosaur card.
  const [dinoJsonList, setDinoJsonList] = useState([{ id: 1 }]);

  // Every time dinoList is rendered, call api and set JsonList based on incoming response data
  useEffect(() => {
    axios.get('https://chinguapi.onrender.com/dinosaurs').then((res) => {
      setDinoJsonList(res.data);
    });
  }, []);

  // TODO: Replace this return block with a card component
  // For now I'm just rendering the id as a link to each info page
  // ~Yasir
  return (
    <div>
      {dinoJsonList.map((x) => (
        <ul>
          <Link to={`/dinosaurs/${x.id}`}>
            {x.id}
          </Link>
        </ul>
      ))}
    </div>
  );
}
