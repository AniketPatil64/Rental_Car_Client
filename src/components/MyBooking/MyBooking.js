import React, { useEffect, useState } from 'react'
import "./MyBooking.css";
import {Button} from 'react-bootstrap'
import EditBookingDetails from '../EditBookingDetails/EditBookDetail';
import axios from 'axios';

const MyBooking = (BookedCar) => {
  const [editpage,seteditpage] = useState(false)
    console.log(BookedCar)
    const currentDate = new Date().toLocaleDateString(); // get current date in format MM/DD/YYYY
    const currentTime = new Date().toLocaleTimeString();
    const [destination,setdestination] = useState([])
    useEffect(() => {
      axios.get("https://rental-car-backend-ylnc.onrender.com/api/v1/user/getbookingdetails")
      .then((resp) => {
        setdestination(resp.data.users[resp.data.users.length-1])
      })
      .catch((error) => {
        console.log("showing error",error);
      });
  }, [destination.length]);
  console.log(destination)
  return (
    <>
      {
        !editpage &&
        <div className='my-box'>

<div className='div-1'>

  <div className='one-div'>
    <img src={BookedCar.BookedCar.singlecar.image} alt='photu' />
  </div>

  <div className='two-div'>
    <h2>{BookedCar.BookedCar.singlecar.carname}</h2>
    <h5> MH 03 ZQ 1234</h5>

  </div>

  <div className='three-div'>

    <div className='mini-3rd-div'>

      <div>
        <p>Origin :</p>
        <p>Destination :</p>
        <p>Start Date :</p>
        <p>End Date :</p>
      </div>

      <div>
        <p>{destination.origin}</p>
        <p>{destination.destination}</p>
        <p>{destination.startdate}</p>
        <p>{destination.enddate}</p>
      </div>

      <div className='mini-3rd-div-img'>
        {/* <img src="hello" alt='hello'/> */}
      </div>

    </div>

  </div>

  <div className='four-div'>
    <div className='mini-four-div'>

      <div>
        <p>BId:{BookedCar.BookedCar.singlecar.id}</p>
        <p>currentDate:{currentDate}</p>
        <p>currentTime:{currentTime}</p>

      </div>
      

    </div>
  </div>

  <div className='five-div'>
  <Button  variant='primary' className='edit-btn' onClick={()=>{seteditpage(true)}}>Edit</Button>
    <Button variant='secondary' className='canceled-btn' onClick={()=>{window.location.reload()}}>Cancel</Button>
  </div>
 </div>
</div>
      }

      {
        editpage && 
        <EditBookingDetails editBookedcar={BookedCar}/>
      }
    </>
  )
}

export default MyBooking