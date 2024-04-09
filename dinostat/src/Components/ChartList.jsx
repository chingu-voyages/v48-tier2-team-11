import { Chart as ChartJs } from 'chart.js/auto';
import { Pie, Doughnut } from 'react-chartjs-2';
import { React, useState, useEffect } from 'react';
import axios from 'axios';

export default function ChartList() {
  // An array of size 3 that holds the number of herbivores, omnivores and carnivores in that order
  const [dietData, setDietData] = useState([5, 10, 25]);
  const [typeData, setTypeData] = useState([2, 3, 8, 9, 9, 10, 2, 8]);

  // Lambda function for counting the number of occurrences of each diet type.
  // To be used for reduce().
  const countDiets = (data, dino) => {
    const array = data;
    if (dino.diet === 'herbivorous') {
      array[0] += 1;
    } else if (dino.diet === 'omnivorous') {
      array[1] += 1;
    } else if (dino.diet === 'carnivorous') {
      array[2] += 1;
    }
    return array;
  };

  const countType = (data, dino) => {
    const array = data;
    if (dino.typeOfDinosaur === 'large theropod') {
      array[0] += 1;
    } else if (dino.typeOfDinosaur === 'small theropod') {
      array[1] += 1;
    } else if (dino.typeOfDinosaur === 'small ornithischian') {
      array[2] += 1;
    } else if (dino.typeOfDinosaur === 'sauropod') {
      array[3] += 1;
    } else if (dino.typeOfDinosaur === 'prosauropod') {
      array[4] += 1;
    } else if (dino.typeOfDinosaur === 'ceratopsian') {
      array[5] += 1;
    } else if (dino.typeOfDinosaur === 'armoured dinosaur') {
      array[6] += 1;
    } else if (dino.typeOfDinosaur === 'large ornithopod') {
      array[7] += 1;
    }
    return array;
  };

  useEffect(() => {
    axios.get('https://chinguapi.onrender.com/dinosaurs').then((res) => {
      // count the number of occurrences of each diet type in the response array
      setDietData(res.data.reduce(countDiets, [0, 0, 0]));
      setTypeData(res.data.reduce(countType, [0, 0, 0, 0, 0, 0, 0, 0]));
    });
  }, []);

  return (
    <div className="chartList">
      <div className="chartContainer">
        <Pie className="pie" data={{ labels: ['Herbivore', 'Omnivore', 'Carnivore'], datasets: [{ label: 'Diet Type', data: dietData }] }} />
        <Doughnut className="pie" data={{ labels: ['Large Theropod', 'Small Theropod', 'Small Ornithischian', 'Sauropod', 'Prosauropod', 'Ceratopsian', 'Armoured Dinosaur', 'Large Ornithopod'], datasets: [{ label: 'Type of Dinosaur', data: typeData }] }} />
      </div>
    </div>
  );
}
