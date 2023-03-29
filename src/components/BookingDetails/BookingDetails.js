import React, { useEffect, useState } from "react";
import "./BookingDetails.css";
import { Button } from "react-bootstrap";
// import Geolocation from 'react-native-geolocation-service';
// import MapView, { Polyline } from 'react-native-maps';
import MyBooking from '../MyBooking/MyBooking'
import axios from "axios";

const BookingDetails = (singlecar) => {
    const [mybook,setmybook] = useState(false)
  //const navigate = useNavigate();
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
  const puneCoords = {
    latitude: 18.5204,
    longitude: 73.8567,
  };
  
  const mumbaiCoords = {
    latitude: 19.0760,
    longitude: 72.8777,
  };
  
  // Calculate the route between Pune and Mumbai
  const routeCoords = [
    puneCoords,
    mumbaiCoords,
  ];
  return (
    <>
       {!mybook &&
        <div className="EditBox flex">
        <div className="left-box Left-Edit-Section">
          <div>
            <h3 className="title1">Booking Details</h3>
          </div>

          <div>
            <div className="mid-div">
              <div>
                <p>Car Name</p>
                <p>Car Number</p>
              </div>

              <div>
                <h3>{singlecar.singlecar.carname}</h3>
                <p>MH 03 ZQ 1234</p>
              </div>

              <div className="mini-3rd-div-img">
                <img
                  src={singlecar.singlecar.image}
                  alt="photo"
                />
              </div>
            </div>
          </div>

          <hr />

          <div>
            <div className="mid-div">
              <div>
                <p>Origin</p>
                <p>Destination</p>
                <p>Start Date</p>
                <p>End Date</p>
              </div>

              <div>
                <p>{destination.origin}</p>
                <p>{destination.destination}</p>
                <p>{destination.startdate}</p>
                <p>{destination.enddate}</p>
              </div>

              <div className="mini-3rd-div-img">
              {/* <MapView >
  <Polyline
    coordinates={routeCoords}
    strokeColor="#000"
    strokeWidth={3}
  />
</MapView> */}
              </div>
            </div>
          </div>
          <hr />

          <div className="bottom-div">
            <div>
              <p>Booking ID </p>
              <p>Booking Date</p>
              <p>Booking Time</p>
            </div>
            <div>
              <p>{singlecar.singlecar.id} </p>
              <p>{currentDate}</p>
              <p>{currentTime}</p>
              <div> <Button className="cancel-btn" variant="primary" onClick={()=>{window.location.reload()}}> Cancel </Button></div>
            </div>
          </div>

          <hr />

        </div>
       

        <div className="right-box Right-Edit-Section">
          <div>
            <h3 className="title2">Payment Details</h3>
          </div>

          <div>
            <div className="price">
              <p>Price per km</p>
              <p>Rs {singlecar.singlecar.perkm}</p>
            </div>

            <div className="pricing">
              <p>Pricing</p>
              <p>Rs {singlecar.singlecar.perkm * 150}</p>
            </div>

            <div className="tax">
              <p>Tax Charges</p>
              <p>Rs {((singlecar.singlecar.perkm * 150)*18/100)}</p>
            </div>

            <hr />

            <div className="tax">
              <p>Sub Total</p>
              <p>Rs {(singlecar.singlecar.perkm * 150) + ((singlecar.singlecar.perkm * 150)*18/100)}</p>
            </div>
              <Button variant="primary" className="proceed-btn" onClick={()=>{setmybook(true)}}>Proceed</Button>
          </div>
        </div>
      </div>}
      {
        mybook && 
        <MyBooking BookedCar={singlecar}/>
      }
 
    </>
  );
};

export default BookingDetails;