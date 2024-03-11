import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function DinoInfo() {
  const { dinoId } = useParams();
  const [dinoJson, setDinoJson] = useState();
  // TODO: Add useEffect block that calls api with dinoId and uses response data to set dinoJson

  return (
    <div>
      The id for this dinosaur pulled from the url parameter is
      {dinoId}
      (try changing it)
    </div>
  );
}
