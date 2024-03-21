import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import DinoList from './Components/DinoList';
import DinoInfo from './Components/DinoInfo';
import ChartList from './Components/ChartList';
import Home from './Components/Home';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dinosaurs" element={<DinoList />} />
          <Route path="/dinosaurs/:dinoId" element={<DinoInfo />} />
          <Route path="/charts" element={<ChartList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
