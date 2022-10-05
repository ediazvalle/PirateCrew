import React from 'react'
import { Link } from 'react-router-dom'
import "./Navbar.css"

const Navbar = () => {
  return (
    <nav>
      <div className='title text-center'>
        <h4 className='text-white'>Pirates Crew</h4>
      </div>
      <div className='button'>
        <Link to="/pirate/new" className='btn'>Add Pirate</Link>
      </div>
    </nav>
  )
}

export default Navbar
