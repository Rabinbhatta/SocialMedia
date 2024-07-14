import React, { useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import {useDispatch} from "react-redux"
import { setLogin } from '../../state';


const registerSchema = yup.object().shape({
  firstName: yup.string().required('*Required'),
  lastName: yup.string().required('*Required'),
  email: yup.string().email('*Invalid email').required('*Required'),
  password: yup.string().required('*Required').min(8, '*Password is too short').max(20, '*Password is too long'),
  address: yup.string().required('*Required'),
});

const loginSchema = yup.object().shape({
  email: yup.string().email('*Invalid email').required('*Required'),
  password: yup.string().required('*Required'),
});

const initialRegisterValues = {
  firstName: '',
  lastName: ' ',
  email: ' ',
  password: ' ',
  address: ' ',
};

const initialLoginValues = {
  email: '',
  password: '',
};

const Login = () => {
  const [pageType, setPageType] = useState('login');
  const isLogin = pageType === 'login';
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFormSubmit = async (values, onSubmitProps) => {
    console.log(1)
    if (isLogin) {
      await login(values, onSubmitProps);
    } else {
      await register(values, onSubmitProps);
    }
  };

  
  
  const login = async (values, onSubmitProps) => {
    try {
      const loginResponse = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(values),
      });
  
      
  
      const loginedIn = await loginResponse.json();
      console.log(loginedIn);

      if (loginResponse.ok) {
          dispatch(setLogin({
          user: loginedIn.user,
    
         }));
        navigate("/home")
       
      }
      onSubmitProps.resetForm();
  
      // Ensure the token is set in cookies
      
      
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
  

  const register = async (values, onSubmitProps) => {
    try {
      const registerResponse = await fetch('http://localhost:3001/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        
        body: JSON.stringify(values),
      });

      const registered = await registerResponse.json();

      console.log(registered)

      if(registered.msg === "Sucess"){
               setPageType("login");
      }

      onSubmitProps.resetForm();
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialLoginValues : initialRegisterValues}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit} className="form-container">
          <div className="logo">
            <img src="https://static.xx.fbcdn.net/rsrc.php/y1/r/4lCu2zih0ca.svg" alt="Logo" />
            <p>Connect with friends and the world around you on Facebook.</p>
          </div>
          <div className="form">
            <input
              type="email"
              name="email"
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="Email"
            />
            <p className="error">{touched.email && errors.email}</p>
            <input
              type="password"
              name="password"
              value={values.password}
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="Password"
            />
            <p className="error">{touched.password && errors.password}</p>
            {!isLogin && (
              <>
                <input
                  type="text"
                  name="firstName"
                  value={values?.firstName || ""}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="First Name"
                />
                <p className="error">{touched.firstname && errors.firstName}</p>
                <input
                  type="text"
                  name="lastName"
                  value={values.lastName || ""}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Last Name"
                />
                <p className="error">{touched.lastName && errors.lastName}</p>
                <input
                  type="text"
                  name="address"
                  value={values.address || ""}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Address"
                />
                <p className="error">{touched.address && errors.address}</p>
              </>
            )}
            <button className="login" type="submit">
              {isLogin ? 'Log In' : 'Register'}
            </button>
            <p className="forget">Forgot password?</p>
            {!isLogin ? (
              <button
                type="button"
                className="register"
                onClick={() => { setPageType('login'); resetForm(); }}
              >
                Log In
              </button>
            ) : (
              <button
                type="button"
                className="register"
                onClick={() => { setPageType('register'); resetForm(); }}
              >
                Create new account
              </button>
            )}
          </div>
        </form>
      )}
    </Formik>
  );
};

export default Login;