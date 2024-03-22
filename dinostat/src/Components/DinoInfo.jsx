import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import missing from '../../public/missing.png';

export default function DinoInfo() {
  const { dinoId } = useParams();
  const [dinoJson, setDinoJson] = useState({
    id: 'Loading...',
    name: 'Loading...',
    description: 'Loading...',
  });
  useEffect(() => {
    axios
      .get(`https://chinguapi.onrender.com/dinosaurs/${dinoId}`)
      .then((res) => {
        setDinoJson(res.data);
      });
  }, [dinoId]);

  const camelToFlat = (camel) => {
    const camelCase = camel.toString().replace(/([a-z])([A-Z])/g, '$1 $2');
    return camelCase;
  };

  const keys = Object.keys(dinoJson).splice(3);

  return (
    <section className="dinoInfo">
      <h2 className="dinoInfo-header">{`${dinoJson.name}`}</h2>
      <picture className="dinoInfo-img">
        <img
          src={dinoJson.imageSrc === 'N/A' ? missing : dinoJson.imageSrc}
          alt={`${dinoJson.name}`}
        />
      </picture>
      <div className="dinoInfo-content">
        {keys.map((key) => (
          <div>
            <b>{camelToFlat(key)}</b>
            :
            {dinoJson[key]}
          </div>
        ))}
      </div>
    </section>
  );
}
