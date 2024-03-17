import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function DinoInfo() {
  const { dinoId } = useParams();
  const [dinoJson, setDinoJson] = useState({ id: 'Loading...', name: 'Loading...', description: 'Loading...' });
  useEffect(() => {
    axios.get(`https://chinguapi.onrender.com/dinosaurs/${dinoId}`).then((res) => {
      setDinoJson(res.data);
    });
    console.log(dinoJson);
  }, [dinoId]);

  return (
    <section className="dinoInfo">
      <h2 className="dinoInfo-header">{`${dinoJson.name}`}</h2>
      <img src={dinoJson.imageSrc} alt={`${dinoJson.name}`} className="dinoInfo-img" />
      <div>{`Description: ${dinoJson.description}`}</div>
      <div>{`Length: ${dinoJson.length}m`}</div>
      <div>{`Found In: ${dinoJson.foundIn}`}</div>
      <div>{`Named by: ${dinoJson.namedBy}`}</div>
      <div>{`Taxonomy: ${dinoJson.taxonomy}`}</div>
      <div>{`Type of Dinosaur: ${dinoJson.typeOfDinosaur}`}</div>
      <div>{`Species: ${dinoJson.typeSpecies}`}</div>
      <div>{`Weight: ${dinoJson.weight}`}</div>
      <div>{`When Lived: ${dinoJson.whenLived}`}</div>
      <div>{`Diet: ${dinoJson.diet}`}</div>
    </section>
  );
}
