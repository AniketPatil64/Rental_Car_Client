import React, { useState } from "react";
import "./Adminregister.css";
import Back from '../Image/Back.png'
import axios from 'axios'
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


function Adminregister() {
  const navigate = useNavigate();
  const [formdata, setformdata] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
    cpassword: ""
  });

  const HandleChange = (e) => {
    const { name, value } = e.target
    setformdata({
      ...formdata,
      [name]: value
    })
    console.log(formdata)

  }

  const Submitdata = () => {
    axios.post("https://rental-car-backend-ylnc.onrender.com/api/v1/user/adminregister", formdata)
      .then((resp) => {
        //console.log(resp)
        alert('successfully created admin account')
        navigate('/adminlogin')

      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <div>
      <div className='image'>
        <img src={Back} alt="Background Image" />
        <div className='line'>
          <h1>All you needed was a wheel in Your hand and four on the road.</h1>
        </div>

        <div className="registerform-1">
          <div className="registration-form">
            <h5 className="text-1">Register in your Admin Account</h5>
            <div id="input">
            <input
              type="text"
              name="name"
              value={formdata.name}
              //value={name}
              //onChange={(e) => { setName(e.target.value) }}
              onChange={HandleChange}
              placeholder='Name'
            />
            <br />
            <div></div>
            <input
              type="email"
              name="email"
              value={formdata.email}
              //value={email}
              onChange={HandleChange}
              //onChange={(e) => { setEmail(e.target.value) }}
              placeholder='email'
            />
            <br />
            <input
              type="text"
              name="contact"
              value={formdata.contact}
              //value={contact}
              onChange={HandleChange}
              //onChange={(e) => { setcontact(e.target.value) }}
              placeholder='contact'
            />
            <br />
            <input
              type="password"
              name="password"
              value={formdata.password}
              //value={password}
              onChange={HandleChange}
              //onChange={(e) => { setPassword(e.target.value) }}
              placeholder='password'
            />
            <br />
            <input
              type="password"
              name="cpassword"
              onChange={HandleChange}
              value={formdata.cpassword}
              //onChange={(e) => { setcPassword(e.target.value) }}
              //value={cpassword}
              placeholder='confirm password'
            />
            </div>
            <br />
            <div>
              <Button onClick={() => Submitdata()} type="submit" variant="primary" className="btn-adm">Submit</Button>
            </div>
           <h6><a href="/">SignIn</a></h6>
           
          </div>
        </div>
      </div>
    </div>
  )
}

export default Adminregister;
