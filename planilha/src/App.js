// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Planilha from './components/Planilha';
import Motoristas from './components/Motoristas';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Planilha />} />
        <Route path="/motoristas" element={<Motoristas />} />
      </Routes>
    </Router>
  );
};

export default App;
