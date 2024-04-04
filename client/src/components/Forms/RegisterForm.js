import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import Axios from 'axios';
import { FaUser, FaLock } from "react-icons/fa";
import { Link } from 'react-router-dom';

const RegisterForm = () => {
  const [isRegistered, setIsRegistered] = useState(false);

  const handleClickCadastro = (values) => {
    Axios.post("http://localhost:3001/cadastro", {   
      email: values.email,
      password: values.password,
    }).then((response) => {
      console.log(response);
      setIsRegistered(true); // Define isRegistered como true após o cadastro bem-sucedido
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
      <h1>Cadastro</h1>
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
          <Form className='login-form'>
            <div className='login-form-group'>
              <FaUser className='icon' />
              <Field name="email" type="email" className="form-field" placeholder="E-mail" onChange={handleChange} />
              <ErrorMessage
                component="span"
                name="email"
                className='form-error'
              />
            </div>

            <div className='login-form-group'>
              <FaLock className='icon' />
              <Field name="password" type="password" className="form-field" placeholder="Senha" onChange={handleChange} />
              <ErrorMessage
                component="span"
                name="password"
                className='form-error'
              />
            </div>

            <div className='login-form-group'>
              <FaLock className='icon' />
              <Field name="confirmPassword" type="password" className="form-field" placeholder="Confirmar senha" onChange={handleChange} />
              <ErrorMessage
                component="span"
                name="confirmPassword"
                className='form-error'
              />
            </div>

            {isRegistered && <p className='cd-sucesso'>Usuário cadastrado com sucesso!</p>}
            <Link to="/login">
            <button className='button' type='submit'>Cadastrar</button>
            </Link>
            
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default RegisterForm;
