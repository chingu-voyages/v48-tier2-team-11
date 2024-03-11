import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './Header';
import DinoList from './DinoList';
import DinoInfo from './DinoInfo';
import ChartList from './ChartList';
import Home from './Home';

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
