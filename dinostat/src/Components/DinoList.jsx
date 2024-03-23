import { React, useState, useEffect } from 'react';
import axios from 'axios';
import DinoCard from './DinoCard';

export default function DinoList() {
  const [dinoJsonList, setDinoJsonList] = useState([]); // holds the json from the api
  const [pageCounter, setPageCounter] = useState(1); // keeps track of current page number
  const [search, setSearch] = useState(''); // keeps track of the search bar
  const [dinoDisplayList, setDinoDisplayList] = useState([]); // sets the number of dinosaurs

  // Every time dinoList is rendered, call api and set JsonList based on incoming response data
  useEffect(() => {
    axios.get('https://chinguapi.onrender.com/dinosaurs').then((res) => {
      setDinoJsonList(res.data);
    });
  }, []);
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


  // Dynamically sets the dinoDisplayList based on the current page number
  useEffect(() => {
    setDinoDisplayList(
      filteredList.slice((pageCounter - 1) * 8, pageCounter * 8),
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
