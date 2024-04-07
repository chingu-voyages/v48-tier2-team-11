import { React, useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [dinoJsonList, setDinoJsonList] = useState([]);

  useEffect(() => {
    axios.get('https://chinguapi.onrender.com/dinosaurs').then((res) => {
      setDinoJsonList(res.data);
    });
  }, []);

  const currentDate = new Date();
  const startOfYear = new Date(currentDate.getFullYear(), 0, 0);
  let diff = Math.floor((currentDate - startOfYear) / (1000 * 60 * 60 * 24));

  while (dinoJsonList[diff]?.imageSrc === 'N/A') {
    diff += 1;
  }

  return (
    <div>
      <div className="day-dino">
        <h1 className="day-dino-title">Dinosaur of the day</h1>
        <img className="day-dino-image" src={dinoJsonList[diff]?.imageSrc} alt={dinoJsonList[diff]?.name} />
        <h2 className="day-dino-name">{dinoJsonList[diff]?.name}</h2>
      </div>
    </div>
  );
}
