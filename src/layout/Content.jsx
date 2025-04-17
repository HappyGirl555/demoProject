import React from "react";
import { Outlet } from "react-router-dom";
import './Content.css'
import '../App.css'

const Container = () =>{

    return (
        <div className="contain-content">
            <div className="content">
                <Outlet />
            </div>
        </div>
    )

}

export default Container;