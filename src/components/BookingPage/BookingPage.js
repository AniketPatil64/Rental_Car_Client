import React, { useEffect, useState } from "react";
import { Data } from "../data/Data";
import "./BookingPage.css";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BookingDetails from "../BookingDetails/BookingDetails";
import Header from "../Header/Header";

const BookinPage = () => {
  const navigate = useNavigate();
  const [destination, setdestination] = useState([]);
  const [data, setdata] = useState([]);
  const [cardetails, setcardetails] = useState(false);
  const [singlecar, setsingkecar] = useState({
    carname: "",
    image: "",
    perkm: "",
    id: "",
  });
 const [carType,setCarType] = useState(data)
//   const MV = data.filter((item) => item.type == "MV");
//   console.log(MV);
//   const XUV = data.filter((item) => item.type == "XUV");
//   console.log(XUV);
  const BookingDetail = (Item) => {
    // console.log(Item._id);
    const { carname, image, perkm, _id } = Item;
    setsingkecar({
      carname: carname,
      image: image,
      perkm: perkm,
      id: _id,
    });

    setcardetails(true);
  };
  console.log(singlecar);
  useEffect(() => {
    Promise.all([
      axios.get("https://rental-car-backend-ylnc.onrender.com/api/v1/user/adminpage"),
      axios.get("https://rental-car-backend-ylnc.onrender.com/api/v1/user/getbookingdetails"),
    ])
      .then(([adminData, bookingData]) => {
        setdata(adminData.data);
        setdestination(bookingData.data.users[bookingData.data.users.length-1]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(destination);
  const handleCarTypeChange = (event) => {
    console.log(event.target.target)
    setCarType(event.target.value); // Update state with selected carType value
  };
  useEffect(() => {
    if (carType === "All") {
      setdata(data);
    } else {
      const filteredCars = data.filter((car) => car.type === carType);
      setdata(filteredCars);
    }
  }, [carType]);

  return (
    <>
      <div className="header">
        <div className="logo">LOGO</div>
        <div
          className="bookings"
          onClick={() => {
            navigate("/bookingcar");
          }}
        >
          My Booking
        </div>
        <div
          className="logout"
          onClick={() => {
            navigate("/");
          }}
        >
          Logout
        </div>
      </div>
      {!cardetails && (
        <div>
          <div className="below-header">
            {destination.origin} ---&gt;{destination.destination} --&gt; {destination.startdate} - {destination.enddate}
            <Button
              variant="primary"
              className="modify-btn1"
              onClick={() => {
                navigate("/bookingcar");
              }}
            >
              Modify
            </Button>
          </div>
          <section className="thirdNavbar">
            <section className="thirdNavbar">
              <select
                className="dropdown"
                value={carType}
                onChange={handleCarTypeChange}
              >
                <option value="">Car Type</option>
                <option value="XUV">XUV</option>
                <option value="MV">MV</option>
                <option value="All">All</option>
              </select>
            </section>
            <button className="setting" onClick={()=>{window.location.reload()}}>Setting</button>
            <button className="setting">Milage</button>
            <button className="setting">Other</button>
          </section>
          {/* <div className="card-container">
            {Data.map((item, index) => (
              <div key={index} className="card">
                <img
                  src={item.img}
                  alt={item.name}
                  onClick={() => {
                    console.log("heelo");
                  }}
                />
                <p className="seat">{item.seater} Persons</p>
                <div className="card-details">
                  <h3>{item.name}</h3>
                  <p className="RSKM">Rs {item.rateperkm}</p>
                </div>
                <div className="other flex flex-dir-r j-content">
                  <div className="fair-details">Fair details</div>
                  <Button
                    variant="primary"
                    className="book-now"
                    onClick={() => {
                      setcardetails(true);
                    }}
                  >
                    Book Now
                  </Button>
                </div>
              </div>
            ))}
          </div> */}

          <div className="card-container">
              {data.map((item, index) => (
                <div key={index} className="card">
                  <img
                    src={item.image}
                    alt={item.name}
                    onClick={() => {
                      console.log("hello");
                    }}
                  />
                  <p className="seat">5 Persons</p>
                  <div className="card-details">
                    <h3>{item.carname}</h3>
                    <p className="RSKM">{item.perkm} Rs/Km</p>
                  </div>
                  <div className="other flex flex-dir-r j-content">
                    <div className="fair-details">Details:{item.details}</div>
                    <Button
                      variant="primary"
                      className="book-now"
                      onClick={() => {
                        BookingDetail(item);
                      }}
                    >
                      Book Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>


        </div>
      )}
      {cardetails && <BookingDetails singlecar={singlecar} />}
    </>
  );
};
export default BookinPage;