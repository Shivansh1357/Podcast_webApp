import React from 'react'
import "./styles.css"
import { NavLink } from 'react-router-dom'
const Header = () => {
  return (
    <div className='nav-bar'>
      <div className='gradient'></div>
      <div className='links'>
        <NavLink to="/">Signup</NavLink>
        <NavLink to="/podcasts">Podcasts</NavLink>
        <NavLink to="/create-a-podcast">Start A Podcast</NavLink>
        <NavLink to="/profile">Profile</NavLink>
      </div>
    </div>
 

  );
}

export default Header