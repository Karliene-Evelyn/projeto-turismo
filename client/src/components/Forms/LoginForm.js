import '../../App.js';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import Axios from 'axios';
import { FaUser, FaLock } from "react-icons/fa";
import { Link } from 'react-router-dom';
import '../Forms/CSS/style.css';

const LoginForm = () => {

  const handleClickLogin = (values) => { 
    Axios.post("http://localhost:3001/login", { 
      email: values.email,
      password: values.password,
    }).then((response) => {
      console.log(response);
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

      <h1>Login</h1>
      <Formik
         initialValues={{
          email: '',
          password: ''
        }}
        onSubmit={handleClickLogin}
        validationSchema={validationLogin}
      >
        <Form className='login-form'>
          <div className='login-form-group'>
            <Field name="email" className="form-field" placeholder="E-mail" />
            <FaUser className='icon' />
            <ErrorMessage
              component="span"
              name="email"
              className='form-error' />
          </div>

          <div className='login-form-group'>
            <Field type="password" name="password" className="form-field" placeholder="Senha" />
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
        </Form>
      </Formik>

      </div>
  );
}

export default LoginForm;
