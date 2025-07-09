import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './pages/Login/LoginForm';
import RegisterForm from './pages/Register/RegisterForm';
import Home from './pages/Home/Home';
import PointDetail from './pages/Home/Componentes/PointDetail';
import Axios from 'axios';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

useEffect(() => {
  Axios.get("http://localhost:3001/verificar-login", {
    withCredentials: true
  }).then((res) => {
    setIsLoggedIn(res.data.logado);
  });
}, []);


  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/ponto-turistico/:id" element={<PointDetail />} />
        <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
