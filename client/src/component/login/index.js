import React, { useState } from 'react'
import { Formik} from "formik";
import * as yup from "yup";
import  "./styles.css"

const registerSchema = yup.object().shape(
  {
    firstName:yup.string().required("*Required"),
    lastName:yup.string().required("*Required"),
    email:yup.string().email("*invalid email").required("*Required"),
    password:yup.string().required("*Required"),
    address:yup.string().required("*Required"),

  }
)

const loginSchema = yup.object().shape(
  {
    
    email:yup.string().email("*invalid email").required("*Required"),
    password:yup.string().required("*Required"),
 

  }
)

const initialRegisterValues = {
  firstName:"",
  lastName:"",
  email:"",
  password:"",
  address:""
}

const intialLoginValues = {
  email:"",
  password:""
}

const Login=()=> {
  const[pagetype,setPagetype] = useState("login")
  const islogin = pagetype ==="login"

  const handleFormSubmit = async (values,onSubmitProps)=>{
          if(islogin){
            login(values,onSubmitProps)
          }else{
            register(values,onSubmitProps)
          }
  }

  const login = async(values,onSubmitProps)=>{
          const loginResponse  =  await fetch("http://localhost:3001/auth/login",{
            method:"POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(values)
          })

          const loginedIn = await loginResponse.json();
          onSubmitProps.resetForm()
  }

  const register = async(values,onSubmitProps)=>{
            const registerResponse = await fetch("http://localhost:3001/auth/register",{
              method:"POST",
              headers:{"Content-Type":"application/json"},
              body:JSON.stringify(values)
            })

            const registered = await registerResponse.json();
            onSubmitProps.resetForm()
  }
  
  
  return (
   <Formik
    onSubmit={handleFormSubmit}
   initialValues = {islogin?intialLoginValues:initialRegisterValues}
   validationSchema = {islogin?loginSchema:registerSchema}
   >
    {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        resetForm,
      }) => 
        <form typeof="submit" onSubmit={handleSubmit}    className="form-container" >
              <div className='logo'>
            <img src='https://static.xx.fbcdn.net/rsrc.php/y1/r/4lCu2zih0ca.svg'/>
            <p>Connect with friends and the world around you on Facebook.</p>
           </div>
 
          <div className="form" >
          
          
              {!islogin && (
             <>
              <input  type="text"
              name="firstName"
              value={values.firstName}
              onBlur={handleBlur}
              onChange={handleChange}
             placeholder='firstname'
              />
              
              <p className='error'>{ touched.firstName && errors.firstName}</p>
              <input  type="text"
              name="lastName"
              value={values.lastName}
              onBlur={handleBlur}
              onChange={handleChange}
             placeholder='lastname'
              />
              
              <p className='error'>{ touched.lastName && errors.lastName}</p>
              <input  type="text"
              name="address"
              value={values.address}
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder='address'
              />
             
              <p className='error'>{ touched.address && errors.address}</p>
              </>
              )
              
              }

              <input  type="email"
              name="email"
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder='Email'
              />
              <p className='error'>{ touched.email&&errors.email}</p>
              <input  type="password"
              name="password"
              value={values.password}
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder='Password'
              />
             
              <p className='error'>{ touched.password && errors.password}</p>
             <button className='login' type='submit'>{!islogin?"Register":"Log In"}</button>
              <p className='forget'>Forgot password?</p>

              {(!islogin)? <button  className="register" onClick={()=>{setPagetype("login");resetForm()}}>Log In</button>
              :<button className="register"  onClick={()=>{setPagetype("Register");resetForm()} } >Create new account</button>}
          
          
                
              
              </div>

          </form>
    
    }
   </Formik>
  )
}

export default Login