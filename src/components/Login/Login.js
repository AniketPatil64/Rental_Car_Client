import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import {useDispatch} from 'react-redux'
import './Login.css'
//import Back from '../Image/Back.png'
import { Button } from "react-bootstrap";
import axios from 'axios'
import Header from '../Header/Header';

function Login() {
    const token = process.env.REACT_APP_MY_TOKEN;

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axios.post("https://rental-car-backend-ylnc.onrender.com/api/v1/user/login", formData);
            localStorage.setItem(`${token}`, data.token);
            alert("User logged in successfully!");
            navigate('/bookingcar')
        } catch (error) {
            console.error(error);
            alert("Failed to log in user.");
        }
    };

    const HandleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    }
    return (
        <>
         <Header/>
           <div className='login flex flex-col'>
            <div className='left '>
                <div className='image'>

                    <div className='line'>
                        <h1>All you needed was a wheel in Your hand and four on the road.</h1>
                    </div>

                    <div className='routers'>
                        <span className='register' onClick={() => navigate('/register')}>
                            Register
                        </span>
                        <span className='adminlogin' onClick={() => navigate('/adminlogin')}>
                            AdminLogin
                        </span>
                    </div>
                </div>
                <div className='right'>
                    <div className='loginform'>
                        <form onSubmit={handleSubmit} className="login-form">
                            <h5 className='h5-edited'>Sign in your Account</h5>
                            <div className='login-input'>
                            <input
                                type="text"
                                id='email'
                                name='email'
                                onChange={HandleChange}
                                placeholder='Phone Number or Email'
                            />
                            <br />
                            <input
                                type="password"
                                id='password'
                                name='password'
                                onChange={HandleChange}
                                placeholder='Password'
                            />
                            </div>
                            <br />
                            <a href="/" className="forgot-password-link">
                                Forgot Password?
                            </a>
                            <Button type="submit" varient='primary'>Log In</Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        </>
        
    )
}

export default Login

