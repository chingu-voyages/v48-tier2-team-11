import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function DinoInfo() {
  const { dinoId } = useParams();
  const [dinoJson, setDinoJson] = useState({ id: 'Loading...', name: 'Loading...', description: 'Loading...'});

  // Every time dinoInfo is rendered, call api by dinoId and set dinoJson with response
  useEffect(() => {
    axios.get(`https://chinguapi.onrender.com/dinosaurs/${dinoId}`).then((res) => {
      setDinoJson(res.data);
    });
  }, [dinoId]);

  // TODO: Replace this return block with a properly fleshed out component displaying all the info
  // For now I'm just rendering the id, name and description as plain text to demonstrate.
  // ~Yasir
  return (
    <>
      <div>{`Id: ${dinoJson.id}`}</div>
      <div>{`Name: ${dinoJson.name}`}</div>
      <div>{`Description: ${dinoJson.description}`}</div>
    </>
  );
}
