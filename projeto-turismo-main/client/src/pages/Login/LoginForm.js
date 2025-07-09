import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import Axios from 'axios';
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import '../Login/style-login.css';
import logo from '../../assets/img/logo.png';

const LoginForm = () => {
  const navigate = useNavigate(); // Use useNavigate para navegação

  const handleClickLogin = (values) => {
  Axios.post("http://localhost:3001/login", {
    email: values.email,
    password: values.password
  }, {
    withCredentials: true // importante para enviar cookies
  })
    .then((response) => {
      console.log("Login resposta:", response.data);
      if (response.data.msg === "Login bem-sucedido!") {
      navigate('/');
}
    })
    .catch((error) => {
      console.error("Erro no login:", error);
      alert("Erro ao tentar fazer login.");
    });
};




  const validationLogin = yup.object().shape({
    email: yup
      .string()
      .email("Não é um e-mail válido.")
      .required("Este campo é obrigatório!"),

    password:
      yup.string().min(6, "A senha dever ter 6 caracteres.").required("Este campo é obrigatório!")
  });

  return (
    <div className="container">
      <div className="form-image">
        <img src={logo} alt="logo" />
      </div>
      <Formik
        initialValues={{
          email: '',
          password: ''
        }}
        onSubmit={handleClickLogin}
        validationSchema={validationLogin}
      >
        <Form className='login-form'>
          <div className="form-header">
            <div className="title">
              <h1>Login</h1>
            </div>
          </div>

          <div className='login-form-group'>
          <div className='form-box'>
            <Field name="email" className="form-field" placeholder="E-mail:" />
            <FaUser className='icon' />
            <ErrorMessage
              component="span"
              name="email"
              className='form-error' />
          </div>

          <div className='form-box'>
            <Field type="password" name="password" className="form-field" placeholder="Senha:" />
            <FaLock className='icon' />
            <ErrorMessage
              component="span"
              name="password"
              className='form-error' />
          </div>

          <button className='button' type='submit'>Login</button>

          <div className="register-link">
            <p>Não tem uma conta? <Link to="/register">Clique aqui.</Link></p>
          </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default LoginForm;
