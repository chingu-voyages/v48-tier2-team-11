import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function DinoInfo() {
  const { dinoId } = useParams();
  const [dinoJson, setDinoJson] = useState()
  // TODO: add useEffect block that calls api with dinoId and uses response data to se dinoJson
  return (
    <div>
      The id for this dinosaur pulled from the url parameter is {dinoId}
    </div>
  )
}
