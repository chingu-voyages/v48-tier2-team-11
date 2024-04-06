import { React, useEffect, useState } from 'react';
import axios from 'axios';

export default function FilterChoose({ setFilterSelect }) {
  const [dinoJsonList, setDinoJsonList] = useState([]);

  useEffect(() => {
    axios.get('https://chinguapi.onrender.com/dinosaurs').then((res) => {
      setDinoJsonList(res.data);
    });
  }, []);

  const filterable = {
    typeOfDinosaur: [], diet: [], whenLived: [], foundIn: [], typeSpecies: [],
  };

  dinoJsonList.forEach((dino) => (
    Object.keys(filterable).forEach((key) => {
      if (dino[key]) {
        let result = dino[key];
        if (key === 'whenLived') {
          const keyee = result.split(',');
          [result] = keyee;
        }
        if (!filterable[key].includes(result)) filterable[key].push(result);
      }
    })
  ));

  return (
    <div className="filter-overlay">
      <div className="filter-choose">
        <h2>Choose filters</h2>
        <div className="filter-category">

          <div className="dino-type">
            <h3>Type</h3>
            {filterable.typeOfDinosaur.map((item) => (
              <button type="button" key={item} onClick={() => setFilterSelect(item)}>{item}</button>
            ))}
          </div>

          <div className="dino-diet">
            <h3>Diet</h3>
            {filterable.diet.map((item) => (
              <button type="button" key={item} onClick={() => setFilterSelect(item)}>{item}</button>
            ))}
          </div>
          <div className="dino-lived">
            <h3>Period</h3>
            {filterable.whenLived.map((item) => (
              <button type="button" key={item} onClick={() => setFilterSelect(item)}>{item}</button>
            ))}
          </div>
          <div className="dino-country">
            <h3>Country</h3>
            {filterable.foundIn.map((item) => (
              <button type="button" key={item} onClick={() => setFilterSelect(item)}>{item}</button>
            ))}
          </div>
          <div className="dino-species">
            <h3>Species</h3>
            {filterable.typeSpecies.map((item) => (
              <button type="button" key={item} onClick={() => setFilterSelect(item)}>{item}</button>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
