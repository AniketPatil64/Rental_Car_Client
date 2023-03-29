//import Admin from './Admin';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import AdminLogin from './components/AdminLogin/AdminLogin';
import Adminregister from './components/AdminLogin/Adminregister'
import AddCar from './components/AddCar/AddCar';
import EditCar from './components/EditCar/EditCar';
import CarBooking from './components/Carbookings/CarBooking';
import AdminPage from './components/Adminpage/AdminPage';
import BookinPage from './components/BookingPage/BookingPage';
import MyBooking from './components/MyBooking/MyBooking';

function App() {
  return (
    // <Admin/>
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/adminlogin' element={<AdminLogin />}/>
        <Route path='/' element={<Login/>} />
        <Route path='/adminPage' element={<AdminPage/>}/>
        <Route path='/adminregister' element={<Adminregister/>}/>
        <Route path='/addcar' element={<AddCar/>}/>
        <Route path='/editcar/:id' element={<EditCar/>}/>
        <Route path='/bookingcar' element={<CarBooking/>}/>
        <Route path='/bookingpage' element={<BookinPage/>}/>
        <Route path='/mybooking' element={<MyBooking/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
