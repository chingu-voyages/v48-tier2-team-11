import { React, useState, useEffect } from 'react';
import axios from 'axios';
import DinoCard from './DinoCard';

export default function DinoList() {
  // Holds response data from the api to be fed to each dinosaur card.
  const [dinoJsonList, setDinoJsonList] = useState([]);

  // Every time dinoList is rendered, call api and set JsonList based on incoming response data
  useEffect(() => {
    axios.get('https://chinguapi.onrender.com/dinosaurs').then((res) => {
      setDinoJsonList(res.data);
    });
  }, []);

  // Keeps track of the current page number
  const [pageCounter, setPageCounter] = useState(1);
  const [search, setSearch] = useState('');
  const filteredList = search === '' ? dinoJsonList : dinoJsonList.filter((dino) => dino.name.toLowerCase().includes(search.toLowerCase()))

  // Handles the next page button click
  const handleUpClick = () => {
    // Prevent the pageCounter from going over the total number of pages
    if (filteredList.length / 8 < pageCounter) return;
    setPageCounter(pageCounter + 1);
  };

  // Handles the previous page button click
  const handleDownClick = () => {
    // Prevent the pageCounter from going to 0
    if (pageCounter === 1) return;

    setPageCounter(pageCounter - 1);
  };

  const [dinoDisplayList, setDinoDisplayList] = useState([]);

  // Dynamically sets the dinoDisplayList based on the current page number
  useEffect(() => {
    setDinoDisplayList(
      dinoJsonList.slice((pageCounter - 1) * 8, pageCounter * 8),
    );
  }, [pageCounter, dinoJsonList]);

  return (
    <div>
      <input type="text" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} className="search"/>
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
          {Math.ceil(filteredList.length / 8)}
        </div>

        <button type="button" onClick={handleUpClick}>
          &gt;
        </button>
      </div>
    </div>
  );
}
