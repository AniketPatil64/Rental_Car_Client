import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
// import Header from '../Header/Header'
import {Button} from 'react-bootstrap'
import "./CarBooking.css"
import axios from 'axios'

function CarBooking() {
    const navigate = useNavigate();
    const [formdata, setformdata] = useState({
        startdate:"",enddate:"",origin:"",destination:""
      });

    // //const [url,seturl] = useState('');

      const HandleChange = (e) => {
        const { name, value } = e.target;
        setformdata({
          ...formdata,
          [name]: value,
        });
    }
        const Submitdata = () => {
            axios.post("https://rental-car-backend-ylnc.onrender.com/api/v1/user/bookingdetails", (formdata))
              .then((res) => {
                 console.log("res");
                
              })
              .catch((err) => {
                console.log(err);
              });
            // console.log(formdata);
            alert("data go to next page")
            navigate('/bookingpage')
           
       
     };

   return (
    
        <div>
            {/* <Header/> */}
            <div className='header'>
            <div className='logo'>LOGO</div>
            {/* <div className='bookings' onClick={()=>{navigate('/')}}>My Booking</div> */}
            <div className='logout' onClick={()=>{navigate('/')}}>Logout</div>
        </div>
            <div className='total'>
               
                    <div className='home'>
                        <div className='text-quote'>Main quote for the Website will be Placed here to make understand</div>

                           
                            <div className='input-all'>
                            <input  className='startdate' onChange={HandleChange} placeholder="startdate" name='startdate'  type='date' />

                            <input  className='enddate' onChange={HandleChange} placeholder="enddate" name='enddate' type='date' />

                            <input  className='origin' onChange={HandleChange} placeholder="origin" name='origin' type='text' />

                            <input  className='destination' onChange={HandleChange} placeholder="destination" name='destination' type='text' />
                            </div>
                           
                          
                        <Button onClick={Submitdata} className='button2' variant='primary'>Check</Button>


                    </div>
                </div>
         </div>  

        
         )
   }

export default CarBooking;