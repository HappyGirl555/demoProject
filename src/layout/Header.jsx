import React from "react";
import {NavLink} from "react-router-dom"
import "./Header.css"

const Header = () =>{
    return (
    <header>        
            <div className="contain-header">
                <NavLink to='/' className="butt-bar">
                        <p>หน้าหลัก</p>
                </NavLink>
                <NavLink to='about' className="butt-bar">
                        <p>เกี่ยวกับเรา</p>
                </NavLink>
                <NavLink to='product' className="butt-bar">
                        <p>ผลิตภัณฑ์</p>
                </NavLink>
                <NavLink to='history' className="butt-bar">
                        <p>ประวัติการสั่งซื้อ</p>
                </NavLink>
            </div>
    
    </header>


)

}

export default Header;