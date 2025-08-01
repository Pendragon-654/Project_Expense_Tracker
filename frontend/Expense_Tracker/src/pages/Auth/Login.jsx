import React, { useState, useContext } from 'react';
import Authlayout from '../../components/layouts/Authlayout'
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../utils/helper';
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosInstance';
import { UserContext } from '../../context/userContext';

const Login = () => {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");

  const {updateUser} = useContext(UserContext);

  const Navigate= useNavigate();

// Handle login form submission
  const handleLogin = async(e) => {
    e.preventDefault();

    if(!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    

    // Validate email and password
    if (!password) {
      setError("Please enter your password");
      return;
    }

    setError("");

    // login API call
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN,{
        email,
        password,
      });
      const {token , user} = response.data;
       if(token){
        localStorage.setItem("token", token);
        updateUser(user);
        Navigate("/dashboard");
       }
    } catch (error){
      if(error.response && error.response.data.message) {
        setError(error.response && error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
      
    
  }

  return (
    <Authlayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <div className="text-xl font-semibold">Welcome Back</div>
        <p className="text-xs text-slate-700 mt-5px mb-6">
          Please enter your details to log in.
        </p>

        <form onSubmit={handleLogin}>
          <Input
            value={email}
            onChange={({target}) => setEmail(target.value)}
            label="Email Address"
            placeholder="abhishekburnwal654@gmail.com"
            type="text"
          />

          <Input
            value={password}
            onChange={({target}) => setPassword(target.value)}
            label="Password"
            placeholder="Min 8 characters"
            type="password"
          />

          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

          <button type='submit' className='btn-primary'>
            Login
          </button>

          <p className="text-[13px] text-slate-800 mt-3">
            Don't have an account?{" "}
            <Link className='font-medium text-primary underline' to='/signup'>
              Sign Up
            </Link>
            
          </p>
        </form>
      </div>
    </Authlayout>
  )
}

export default Login
