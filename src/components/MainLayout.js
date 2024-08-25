import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from "./Footer"
import "./MainLayout.css";

const MainLayout = ({ isLoggedIn, user, children, handleLogout }) => {
    const [isSidebarOpen,setSideBar]=useState(false)

    const toggleSidebar = () => {
        setSideBar(!isSidebarOpen)
    }

    return (
        <div className="main-layout">
            <Header isLoggedIn={isLoggedIn} user={user} toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}  />

            <div className="content-area">
                <Sidebar isLoggedIn={isLoggedIn} isSidebarOpen={isSidebarOpen} handleLogout={handleLogout} />

                <div className="main-content">
                    {children}
                </div>
            </div>

            <footer className="footer">
                <Footer/>
            </footer>
        </div>
    );
};

export default MainLayout;
