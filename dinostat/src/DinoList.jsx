import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
export default function DinoList() {
  const [dinoJsonList, setDinoJsonList] = useState([{id: 1}, {id: 2}, {id: 3}, {id: 4}])
  // TODO: add useEffect block that calls api and uses response data to set dinoJsonList

  return (
    <div>
      {dinoJsonList.map((x)=><ul><Link to={'/dinosaurs/'+x.id}> {x.id} </Link></ul>)}
    </div>
  )
}
