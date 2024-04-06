import { React, useState, useEffect } from 'react';
import axios from 'axios';
import DinoCard from './DinoCard';
import Dropdown from './DropDown';
import FeatureChoose from './FilterChoose';

export default function DinoList() {
  const [dinoJsonList, setDinoJsonList] = useState([]); // holds the json from the api
  const [pageCounter, setPageCounter] = useState(1); // keeps track of current page number
  const [search, setSearch] = useState(''); // keeps track of the search bar
  const [filterKey, setFilterKey] = useState([]);
  const [filterSuggestion, setFilterSuggesstion] = useState([]);
  const [filterSelect, setFilterSelect] = useState();
  const [selectedList, setSelectedList] = useState([]);
  const [dinoDisplayList, setDinoDisplayList] = useState([]); // sets the number of dinosaurs
  const [origDinoJson, setOrigDinoJson] = useState([]);

  // Every time dinoList is rendered, call api and set JsonList based on incoming response data
  useEffect(() => {
    axios.get('https://chinguapi.onrender.com/dinosaurs').then((res) => {
      setDinoJsonList(res.data);
      setOrigDinoJson(res.data);
    });
  }, []);

  // Handles the next page button click
  const handleUpClick = () => {
    // Prevent the pageCounter from going over the total number of pages
    if (dinoJsonList.filter((dino) => (
      dino?.name?.toLowerCase().includes(search.toLowerCase())
    )).length / 8 < pageCounter) {
      return;
    }
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
    if (pageCounter > dinoJsonList.filter((dino) => (
      dino?.name?.toLowerCase().includes(search.toLowerCase())
    )).length / 8) setPageCounter(1);
    if (search === '') {
      setDinoDisplayList(
        dinoJsonList.slice((pageCounter - 1) * 8, pageCounter * 8),
      );
    } else {
      setDinoDisplayList(
        dinoJsonList.filter((dino) => (
          dino?.name?.toLowerCase().includes(search.toLowerCase())
        )).slice((pageCounter - 1) * 8, pageCounter * 8),
      );
    }
  }, [pageCounter, dinoJsonList, search]);

  const searchList = ['typeOfDinosaur', 'diet', 'whenLived', 'foundIn', 'typeSpecies'];

  useEffect(() => {
    const filteredList = [];

    if (filterKey === '') {
      setFilterSuggesstion([]);
      return;
    }

    // Add the matching key, value pairs to filtered list *avoid duplicates
    dinoJsonList.forEach((dino) => (
      searchList.some((key) => {
        if (dino[key]?.toLowerCase().includes(filterKey.toLowerCase())) {
          let result = dino[key];
          if (key === 'whenLived') {
            const keyee = result.split(',');
            [result] = keyee;
          }
          if (!filteredList.some((item) => item.key === key && item.value === result)) {
            filteredList.push({ key, value: result });
          }
        }
        return null;
      })
    ));

    setFilterSuggesstion(filteredList);
  }, [filterKey]);

  useEffect(() => {
    if (filterSelect === undefined) return;
    if (!selectedList.some((item) => item === filterSelect)) {
      setSelectedList([...selectedList, filterSelect]);
    }
  }, [filterSelect]);

  useEffect(() => {
    if (selectedList.length === 0) return;
    selectedList.forEach((selection) => {
      const selectionValue = selection.split(': ')[1];
      setDinoJsonList(dinoJsonList.filter((dino) => Object.values(dino).includes(selectionValue)));
    });
  }, [selectedList]);

  function removeFilter(item) {
    setDinoJsonList(origDinoJson);

    setSelectedList(selectedList.filter((dino) => dino !== item));
  }

  const [filterChoose, setFilterChoose] = useState(false);

  return (
    <div>
      <div className="input-bars">
        <input type="text" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} className="search" />

        <div className="filter-drop">
          <input type="text" placeholder="Type for filters" onChange={(e) => setFilterKey(e.target.value)} className="filter" />
          <button type="button" onClick={() => setFilterChoose(true)}>Choose Filters</button>

          {filterChoose ? (<FeatureChoose />) : null}

          {filterSuggestion.length > 0 ? (
            <Dropdown
              filterSuggestion={filterSuggestion}
              setFilterSelect={setFilterSelect}
            />
          ) : null }
        </div>

      </div>

      <div className="filter-selections">
        {selectedList.map((item) => (

          <div className="filter-widget">

            <div key={item} className="filter-item">
              {item}
            </div>

            <button type="button" onClick={() => removeFilter(item)}>
              X
            </button>

          </div>

        ))}
      </div>

      <div className="dino-list">
        {dinoDisplayList.length === 0 ? 'No Results Found' : dinoDisplayList.map((x) => (
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
          {Math.ceil(dinoJsonList.filter((dino) => (
            dino?.name?.toLowerCase().includes(search.toLowerCase())
          )).length / 8) || 1}
        </div>

        <button type="button" onClick={handleUpClick}>
          &gt;
        </button>
      </div>
    </div>
  );
}
