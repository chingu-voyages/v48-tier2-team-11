import { React, useState, useEffect } from 'react';
import axios from 'axios';
import DinoCard from './DinoCard';

export default function DinoList() {
  // Holds response data from the api to be fed to each dinosaur card.
  const [dinoJsonList, setDinoJsonList] = useState([]);
  const [totalDinos, setTotalDinos] = useState(0);

  // Every time dinoList is rendered, call api and set JsonList based on incoming response data
  useEffect(() => {
    axios.get('https://chinguapi.onrender.com/dinosaurs').then((res) => {
      setDinoJsonList(res.data);
      setTotalDinos(res.data.length);
    });
  }, []);

  // Keeps track of the current page number
  const [pageCounter, setPageCounter] = useState(1);

  // Handles the next page button click
  const handleUpClick = () => {
    // Prevent the pageCounter from going over the total number of pages
    if (totalDinos / 8 < pageCounter) return;
    setPageCounter(pageCounter + 1);
  };

  // Handles the previous page button click
  const handleDownClick = () => {
    // Prevent the pageCounter from going to 0
    if (pageCounter === 1) return;

    setPageCounter(pageCounter - 1);
  };

  /*
    TODO: Replace this return block with a card component
    For now I'm just rendering the id as a link to each info page
    ~Yasir
  */

  /*
    Contains 8 dinosaurs to be displayed on the current page. So we don't need to change the
    dinoJsonList state every time the page changes.
  */
  const [dinoDisplayList, setDinoDisplayList] = useState([]);

  // Dynamically sets the dinoDisplayList based on the current page number
  useEffect(() => {
    setDinoDisplayList(
      dinoJsonList.slice((pageCounter - 1) * 8, pageCounter * 8),
    );
  }, [pageCounter, dinoJsonList]);

  return (
    <div>
      <div className="dino-list">
        {dinoDisplayList.map((x) => (
          <div key={x.id} className="dino-list-item">
            <DinoCard
              id={x.id}
              img={x.imageSrc}
              title={x.name}
              description={x.description}
            />
          </div>
        ))}
      </div>

      <div className="page-switch-buttons">
        <button type="button" onClick={handleDownClick}>
          &lt;
        </button>

        <div>
          {pageCounter}
          /
          {Math.ceil(totalDinos / 8)}
        </div>

        <button type="button" onClick={handleUpClick}>
          &gt;
        </button>
      </div>
    </div>
  );
}
