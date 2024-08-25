// src/components/Header.js
import React from 'react';
import { RiMenuFold4Line, RiMenuUnfold4Line2 } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import './Header.css';  // Adjust path to your CSS
import logo from './assets/iocnprofile.png';

const Header = ({ isLoggedIn, user, toggleSidebar, isSidebarOpen, onLogout }) => {


    const imageUrl = user && user.profilePic ? user.profilePic : logo;

    return (
        <header>
            <nav className='navbar'>
                <div className="nav-left">
                    {isSidebarOpen ? (
                        <RiMenuUnfold4Line2 className='ri' onClick={toggleSidebar} />
                    ) : (
                        <RiMenuFold4Line  className="ri" onClick={toggleSidebar} />
                    )}
                    <Link to="/">ZuAI</Link>
                </div>
                <div className="nav-right">
                    {isLoggedIn ? (
                        <Link to="/profile">
                            <div className='profile-name-pic'>
                            <p>{user.name}</p>
                            <img src={imageUrl} alt="Profile" className="profile-img " />
                            </div>
                           
                        </Link>
                    ) : (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Signup</Link>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;
