import React,{useState} from "react";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import './EditCar.css'
import axios from "axios";
import "../AddCar/AddCar.css";
function EditCar(singlecar) {

  console.log(singlecar.singlecar._id)
  const [image, setimage] = useState();
  const [url,seturl] = useState("");
  const navigate = useNavigate();
  
  const [formdata, setformdata] = useState({
    carname: "",
    type: "",
    model: "",
    milage: "",
    perkm: "",
    image:"http://res.cloudinary.com/dplbl7yg9/image/upload/v1679830500/otcbazbryvhj30yg1igy.jpg",
    availablefrom: "",
    availabletill: "",
    description: "",
    cardetails: "",
    details: "",
  });

  const HandleChange = (e) => {
    const { name, value } = e.target;
    setformdata({
      ...formdata,
      [name]: value,
    });

  };
  const HandleImage = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "Car-Images");
    data.append("cloud_name", "dplbl7yg9");
    fetch("https://api.cloudinary.com/v1_1/dplbl7yg9/image/upload", {
      method: "post",
      body: data
    })
      .then(resp=> resp.json())
      .then((data)=> { 
        setformdata({
        ...formdata,
        image: data.url
      });
    })
      .catch((err) => {console.log(err)});
    
  };
  const Submitdata = () => {
    axios.put(`https://rental-car-backend-ylnc.onrender.com/api/v1/user/editcar/${singlecar.singlecar._id}`, (formdata))
      .then((resp) => {
        resp.json();
        
      })
      .then((data)=>{
        seturl(data.url);
        setformdata({
          ...formdata,
          image: data.url
        });
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(formdata);
    console.log(url)
    window.location.reload();
  };

  const Deletedata = () => {
    axios.delete(`https://rental-car-backend-ylnc.onrender.com/api/v1/user/delete/${singlecar.singlecar._id}`, (formdata))
      .then((resp) => {
        resp.json();
        
      })
      .then((data)=>{
        seturl(data.url);
        setformdata({
          ...formdata,
          image: data.url
        });
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(formdata);
    console.log(url)
    window.location.reload();
  };
  
  return (
    <form className="container">
    <h1>Edit CarDetails</h1>
      <div className="boxes">
        <div className="Left-Box">
          <div className="carName flex flex-dir-c m-t m-b">
            <label>CarName: </label>
            <input
              type="text"
              name="carname"
              className="inp-carname"
              onChange={HandleChange}
              placeholder={singlecar.singlecar.carname}
            />
          </div>
          <div className="type&model flex j-content m-t m-b">
            <div className="type flex flex-dir-c">
              <label>Type:</label>
              <input
                type="text"
                name="type"
                className="inp-type"
                onChange={HandleChange}
                placeholder={singlecar.singlecar.type}
              />
            </div>
            <div className="model flex flex-dir-c">
              <label>Model:</label>
              <input
                type="text"
                name="model"
                className="inp-model"
                onChange={HandleChange}
                placeholder={singlecar.singlecar.model}
              />
            </div>
          </div>

          <div className="milage&perkm flex j-content m-t m-b">
            <div className="milage flex flex-dir-c m-t m-b">
              <label>Milage:</label>
              <input
                type="number"
                name="milage"
                className="inp-milage"
                onChange={HandleChange}
                placeholder={singlecar.singlecar.milage}
              />
            </div>
            <div className="perkm flex flex-dir-c m-t m-b">
              <label>Per KM:</label>
              <input
                type="number"
                name="perkm"
                c
                lassName="inp-perkm"
                onChange={HandleChange}
                placeholder={singlecar.singlecar.perkm}
              />
            </div>
          </div>

          <div className="availablefrom flex j-content m-t m-b">
            <div className="milage flex flex-dir-c">
              <Form>
                <Form.Group controlId="availablefrom">
                  <Form.Label>Available From:</Form.Label>
                  <Form.Control
                    type="date"
                    name="availablefrom"
                    className="inp-availabletill"
                    onChange={HandleChange}
                  />
                </Form.Group>
              </Form>
            </div>
            <div className="availabletill flex flex-dir-c">
              <Form>
                <Form.Group controlId="availabletill">
                  <Form.Label>Available Till:</Form.Label>
                  <Form.Control
                    type="date"
                    name="availabletill"
                    className="inp-availabletill"
                    onChange={HandleChange}
                  />
                </Form.Group>
              </Form>
            </div>
          </div>

          <div className="description flex flex-dir-c m-t m-b">
            <label>Description : </label>
            <input type="text" name="description" onChange={HandleChange}   placeholder={singlecar.singlecar.description}/>
          </div>
        </div>

        <div className="Right-Box">
          <div className="image">
            <label onClick={HandleImage}>Image :</label>
            <input
              type="file"
              name="image"
              className="inp-img"
              onChange={(e) => {
                setimage(e.target.files[0]);
              }}
            />

           {/* <div> <Button
              variant="primary"
              className="btn-add m-l  btn-add2"
              onClick={HandleImage}
            >

              Add
            </Button></div> */}
            {/* <label className="image-added" onClick={HandleImage}>Image</label> */}
            <img src={formdata.image} alt="carimg" className="select-img1"/>
          </div>

          <div className="cardetails flex flex-dir-c">
            <label>Car Details :</label>
            <input type="text" name="cardetails" onChange={HandleChange} placeholder={singlecar.singlecar.cardetails}/>
          </div>

          <div className="details flex flex-dir-c">
            <label>Details :</label>
            <input type="text" name="details" onChange={HandleChange} placeholder={singlecar.singlecar.details}/>
          </div>
        </div>
      </div>
      <div className="btns flex j-content ">
        <div className="btn-cancel ">
          <Button variant="secondary btn-cancel m-r"
         onClick={()=>{window.location.reload()}}>Cancel</Button>
        </div>
        {/* <Button
            variant="danger"
            className="btn-add m-l"
            onClick={()=>{window.location.reload()}}
          >
            delete
          </Button> */}
        <div className="bnt-add">

        <Button
            variant="danger"
            className="btn-add m-l"
            onClick={Deletedata}
          >Delete
          </Button>
        
          <Button
            variant="primary"
            className="btn-add m-l"
            onClick={Submitdata}
          >save
          </Button>
        </div>
      </div>
    </form>
  );
}

export default EditCar;