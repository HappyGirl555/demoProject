import React from "react";
import {NavLink} from "react-router-dom"
import "./Header.css"

const Header = () =>{
    return (
    <header>

            <div className="contain-header">
                <div className="butt-bar">
                <NavLink to='/'><p>หน้าหลัก</p></NavLink>
                </div>
                <div className="butt-bar">
                <NavLink to='about'><p>เกี่ยวกับเรา</p></NavLink>
                </div>
                <div className="butt-bar">
                <NavLink to='product'><p>ผลิตภัณฑ์</p></NavLink>
                </div>
                <div className="butt-bar">
                <NavLink to='history'><p>ประวัติการสั่งซื้อ</p></NavLink>
                </div>
            </div>
    
    </header>


)

}

export default Header;