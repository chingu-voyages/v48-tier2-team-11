import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function DinoList() {
  // Holds response data from the api to be fed to each dinosaur card.
  const [dinoJsonList, setDinoJsonList] = useState([]);

  // Every time dinoList is rendered, call api and set JsonList based on incoming response data
  useEffect(() => {
    axios.get('https://chinguapi.onrender.com/dinosaurs').then((res) => {
      setDinoJsonList(res.data);
    });
  }, []);

  const [pageCounter, setPageCounter] = useState(1);

  const handleUpClick = () => {
    setPageCounter(pageCounter + 1);
  };

  const handleDownClick = () => {
    setPageCounter(pageCounter - 1);
  };

  // TODO: Replace this return block with a card component
  // For now I'm just rendering the id as a link to each info page
  // ~Yasir

  const [dinoDisplayList, setDinoDisplayList] = useState([]);

  useEffect(() => {
    setDinoDisplayList(dinoJsonList.slice((pageCounter - 1) * 8, pageCounter * 8));
  }, [pageCounter, dinoJsonList]);

  return (
    <div>
      {dinoDisplayList.map((x) => (
        <ul key={x.id}>
          <Link to={`/dinosaurs/${x.id}`}>
            {x.id}
          </Link>
        </ul>
      ))}

      <div className="page-switch-buttons">

        <button type="button" onClick={handleDownClick}>
          &lt;
        </button>

        <div>
          {pageCounter}
        </div>

        <button type="button" onClick={handleUpClick}>
          &gt;
        </button>

      </div>

    </div>
  );
}
