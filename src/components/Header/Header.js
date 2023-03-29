import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./Header.css"

function Header() {
  const navigate = useNavigate()
  return (
    <div className='header'>
      <div className='logo'>LOGO</div>
      <div className='logout' onClick={()=>{navigate('/')}}>Logout</div>
    </div>
  )
}

export default Header
