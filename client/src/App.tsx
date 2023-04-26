import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import CardMake from './pages/CardMake';
import CardSubject from "./pages/CardSubject";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/cardmake" element={<CardMake />} />
        <Route path="/CardSubject" element={<CardSubject />} />
      </Routes>
    </Router>
  );
}

export default App;