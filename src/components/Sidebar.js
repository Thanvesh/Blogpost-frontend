// src/components/Sidebar.js
import React, { useState, useEffect } from 'react';
import { GrHomeRounded } from 'react-icons/gr';
import { TbFolderSearch } from 'react-icons/tb';
import { IoCreateOutline } from 'react-icons/io5';
import { CgProfile } from 'react-icons/cg';
import { IoLogOutOutline } from 'react-icons/io5';
import { Link} from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ isLoggedIn, isSidebarOpen,handleLogout }) => {
  const [sidebarClass, setSidebarClass] = useState('closed');

  useEffect(() => {
    if (window.innerWidth > 768) {
      // Always show sidebar on medium to large screens
      setSidebarClass('');
    } else {
      // Apply open/close classes for small screens
      if (isSidebarOpen) {
        setSidebarClass('opening');
      } else {
        setSidebarClass('closing');
      }
    }
  }, [isSidebarOpen]);

  const handleTransitionEnd = () => {
    if (!isSidebarOpen && window.innerWidth <= 768) {
      setSidebarClass('closed');
    }
  };


  const onLogout = () => {
   handleLogout()
  };

  return (
    <aside 
      className={`sidebar ${sidebarClass}`}
      onTransitionEnd={handleTransitionEnd}
    >
      <div className="sidebar-content">
        <Link to="/"><GrHomeRounded className='i' /></Link>
        <Link to="/search"><TbFolderSearch className='i' /></Link>
        {isLoggedIn && <Link to="/create-post"><IoCreateOutline className='i' /></Link>}
        {isLoggedIn ? (
          <>
            <Link to="/profile"><CgProfile className='i' /></Link>
            <button ><IoLogOutOutline className='i' onClick={onLogout} /></button>
          </>
        ) : (
          <Link to="/login"><CgProfile className='i' /></Link>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
