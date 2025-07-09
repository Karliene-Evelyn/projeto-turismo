import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import Axios from 'axios';
import { FaUser, FaLock } from "react-icons/fa";
import { Link } from 'react-router-dom';
import './style-register.css';
import logo from '../../assets/img/logo.png';


const RegisterForm = () => {
  const [isRegistered, setIsRegistered] = useState(false);

  const handleClickCadastro = (values) => {
      Axios.post("http://localhost:3001/cadastro", {
      email: values.email.trim(),
      password: values.password.trim(),
    })
    .then((response) => {
      console.log("Cadastro resposta:", response.data);
      if (response.data.msg === "Cadastrado com sucesso!") {
        setIsRegistered(true);
      } else {
        alert(response.data.msg); // mostra se usuário já existe ou erro
      }
    })
    .catch((error) => {
      console.error("Erro ao cadastrar:", error);
      alert("Erro ao tentar cadastrar usuário.");
    });

  };

  const validationCadastro = yup.object().shape({
    email: yup
      .string()
      .email("Não é um e-mail válido.")
      .required("Este campo é obrigatório!"),

    password: yup
      .string()
      .min(6, "A senha dever ter 6 caracteres.")
      .required("Este campo é obrigatório!"),

    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "As senhas não são iguais.")
  });

  return (
    <div className="container">
      <div className="form-image">
        <img src={logo} alt="logo" />
      </div>


      <Formik
        initialValues={{
          email: '',
          password: '',
          confirmPassword: ''
        }}
        onSubmit={handleClickCadastro}
        validationSchema={validationCadastro}
      >
        {({ handleChange }) => (
          <Form className='register-form'>
            <div className="form-header">
              <div className="title">
                <h1>Cadastre-se</h1>
              </div>
            </div>


            <div className='register-form-group'>

              <div className='form-box'>
              <FaUser className='icon' />
              <Field name="email" type="email" className="form-field" placeholder="E-mail:" onChange={handleChange} />
              <ErrorMessage
                component="span"
                name="email"
                className='form-error'
              />
            </div>

            <div className='form-box'>
              <FaLock className='icon' />
              <Field name="password" type="password" className="form-field" placeholder="Senha:" onChange={handleChange} />
              <ErrorMessage
                component="span"
                name="password"
                className='form-error'
              />
            </div>

            <div className='form-box'>
              <FaLock className='icon' />
              <Field name="confirmPassword" type="password" className="form-field" placeholder="Confirmar senha:" onChange={handleChange} />
              <ErrorMessage
                component="span"
                name="confirmPassword"
                className='form-error'
              />
            </div>
            </div>
            {isRegistered && <p className='cd-sucesso'>Usuário cadastrado com sucesso!</p>}
            <Link to="/login">
              <button className='button' type='submit'>Continue</button>
            </Link>

          </Form>
        )}
      </Formik>
    </div>
  );
}

export default RegisterForm;
