import React, { useEffect, useState } from "react";
import "./EditBookDetail.css";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EditBookingDetails = (editBookedcar) => {
  const navigate = useNavigate();
  console.log(editBookedcar)
  const currentDate = new Date().toLocaleDateString(); // get current date in format MM/DD/YYYY
  const currentTime = new Date().toLocaleTimeString();
  const [mybook,setmybook] = useState(false);
  const [destination,setdestination] = useState([]);
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
        <div className="EditBox flex">
        <div className="left-box Left-Edit-Section">
          <div>
            <h3 className="edit-title1">Edit Booking Details</h3>
          </div>

          <div>
            <div className="mid-div">
              <div>
                <p>Car Name</p>
                <p>Car Number</p>
              </div>

              <div>
                <h3>{editBookedcar.editBookedcar.BookedCar.singlecar.carname}</h3>
                <p>MH 03 ZQ 1234</p>
              </div>

              <div className="mini-3rd-div-img">
                <img
                  src={editBookedcar.editBookedcar.BookedCar.singlecar.image}
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
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28788.78777019961!2d85.16637504100797!3d25.58502223107953!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed5f5876b1ada3%3A0xc899c99a139e72e8!2sMahindra%20Kiran%20Automobiles!5e0!3m2!1sen!2sin!4v1679926472552!5m2!1sen!2sin"
                  allowfullscreen=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
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
              <p>{editBookedcar.editBookedcar.BookedCar.singlecar.id} </p>
              <p>{currentDate}</p>
              <p>{currentTime}</p>
              <div> <Button className="cancel-btn" variant="primary" onClick={()=>{window.location.reload()}}> Cancel </Button></div>
            </div>
          </div>

          <hr />

        </div>
       

        <div className="right-box Right-Edit-Section">
          <div>
            <h3 className="edit2-title2">Payment Details</h3>
          </div>

          <div>
            <div className="price">
              <p>Price per km</p>
              <p>Rs {editBookedcar.editBookedcar.BookedCar.singlecar.perkm}</p>
            </div>

            <div className="pricing">
              <p>Pricing</p>
              <p>Rs {editBookedcar.editBookedcar.BookedCar.singlecar.perkm * 150}</p>
            </div>

            <div className="tax">
              <p>Tax Charges</p>
              <p>Rs {((editBookedcar.editBookedcar.BookedCar.singlecar.perkm * 150)*18/100)}</p>
            </div>

            <hr />

            <div className="tax">
              <p>Sub Total</p>
              <p>Rs {(editBookedcar.editBookedcar.BookedCar.singlecar.perkm * 150) + ((editBookedcar.editBookedcar.BookedCar.singlecar.perkm * 150)*18/100)}</p>
            </div>
              <Button variant="primary" className="proceed-btn" onClick={()=>{setmybook(true)}}>Proceed</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditBookingDetails;