import React from 'react';
import { useParams } from 'react-router-dom';

export default function DinoInfo() {
    const { dinoId } = useParams();
  return (
    <div>
      The id for this dinosaur pulled from the url parameter is {dinoId}
    </div>
  )
}
