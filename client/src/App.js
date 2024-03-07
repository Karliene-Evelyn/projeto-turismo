import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginForm from './components/Forms/LoginForm.js';
import RegisterForm from './components/Forms/RegisterForm.js';

function App() {
  const [setShowRegister] = useState(false); // Corrigido: useState retorna um array com dois elementos, o estado atual e a função para atualizá-lo

  const handleLoginSubmit = () => {
    // Handle login logic here (e.g., validate form, send login request)
    setShowRegister(true); // Update state to potentially show a success message
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LoginForm onSubmit={handleLoginSubmit} />} />
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
