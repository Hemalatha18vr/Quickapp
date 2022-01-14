import React, { Component }  from 'react';
import logo from './logo.svg';
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import Home from './components/home/home';
import SavedData from './components/savedata/savedata';
import quiklogo from './images/logo.jpg';
function App() {
  return (
    <div className="App">
      <div className='NavBar bary'>
        <img src={quiklogo} className='logo' />
        <Link to="/home">Home</Link>
        <Link to="/view">Saved Data</Link>
      </div>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/view" element={<SavedData />} />
      </Routes>
    </div>
  );
}

export default App;
