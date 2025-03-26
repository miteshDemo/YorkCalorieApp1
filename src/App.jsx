import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import UploadImage from './Components/UploadImage';
import Register from './Components/Register';

const App = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={isLoggedIn ? "/upload" : "/register"} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/upload" element={isLoggedIn ? <UploadImage /> : <Navigate to="/register" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
