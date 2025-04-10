  import React from 'react';
  import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
  import { useSelector } from 'react-redux';
  import UploadImage from './Components/UploadImage';
  import Register from './Components/Register';
  import Profile from './Components/Profile';
  import History from './Components/History';
  import Start from './Components/Start'; 

  const App = () => {
    const user = useSelector((state) => state.user.user);

    return (
      <BrowserRouter>
        <Routes>
          
          <Route
            path="/"
            element={user ? <Navigate to="/upload" /> : <Start />}
          />

          
          <Route
            path="/register"
            element={!user ? <Register /> : <Navigate to="/upload" replace />}
          />

          
          <Route
            path="/upload"
            element={user ? <UploadImage /> : <Navigate to="/" replace />}
          />
          <Route
            path="/profile"
            element={user ? <Profile /> : <Navigate to="/" replace />}
          />
          <Route
            path="/history"
            element={user ? <History /> : <Navigate to="/" replace />}
          />
        </Routes>
      </BrowserRouter>
    );
  };

  export default App;
