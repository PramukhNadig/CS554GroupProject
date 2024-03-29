import React from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import CardMake from "./pages/CardMake";
import UserProfile from "./pages/UserProfile";
import Set from "./pages/Set";
import YourProfile from "./pages/YourProfile";
import Logout from "./pages/Logout";
import Search from "./pages/Search";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Assistant from "./pages/Assistant";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/cardmake" element={<CardMake />} />
        <Route path="/profile/:user" element={<UserProfile />} />
        <Route path="/set/:id" element={<Set />} />
        <Route path="/profile" element={<YourProfile />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/search" element={<Search  />} />
        <Route path="/search/:searchTerm" element={<Search />} />
        <Route path="/assistant" element={<Assistant />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
