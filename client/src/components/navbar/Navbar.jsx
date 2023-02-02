import React from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import "./navbar.scss"


const Navbar = () => {

  const { user, dispatch } = useContext(AuthContext);

  const handleLogOut = (e) => {
    dispatch({type: "LOGIN_OUT"});
  }


  return (
      <div className="flex jc-center navbar">
          <div className="flex al-center navContainer">
            <Link to='/' className='link' >
              <span>Nicolas Booking</span>
            </Link>
              {!user && <div className="flex navItems">
                  <Link to="/register" className='link'>
                  <button>Register</button>
                  </Link>
                  <Link to="/login" className='link'>
                  <button>Login</button>
                  </Link>
              </div>}
              {user && <div className="flex navItems">
                <span>Hi, {user.username}</span>
                <button onClick={handleLogOut}>LogOut</button>
              </div>}
          </div>
    </div>
  )
}

export default Navbar