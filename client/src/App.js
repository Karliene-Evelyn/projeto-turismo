import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './pages/Login/LoginForm.js';
import RegisterForm from './pages/Register/RegisterForm.js';
import Home from './pages/Home/Home.js';
import PointDetail from './pages/Home/Componentes/PointDetail.js'
import CategoryComponent from './pages/Home/Componentes/CategoryComponent.jsx';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/categoria/:categoria" element={<CategoryComponent />} />
          <Route path="/ponto-turistico/:id" element={<PointDetail />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;