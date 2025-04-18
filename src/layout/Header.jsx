import React from "react";
import {NavLink} from "react-router-dom"
import "./Header.css"

const Header = () =>{
    return (
    <header>

            <div className="contain-header">
                <div className="butt-bar">
                <NavLink to='/'><p>Home</p></NavLink>
                </div>
                <div className="butt-bar">
                <NavLink to='product'><p>Product</p></NavLink>
                </div>
                <div className="butt-bar">
                <NavLink to='about'><p>About</p></NavLink>
                </div>
                <div className="butt-bar">
                <NavLink to='history'><p>History</p></NavLink>
                </div>
            </div>
    
    </header>


)

}

export default Header;