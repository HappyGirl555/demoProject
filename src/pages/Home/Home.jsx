import React, { useState } from "react";
import company from "../../data/company/company";
import aboutPicture from "../../data/company/picture/aboutPicture"
import './Home.css'
import { useEffect } from "react";

const Home = () =>{

    useEffect(() => {
        function reveal() {
          const items = document.querySelectorAll(".home-box");
          items.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (itemTop < windowHeight) {
              item.classList.add("animate");
            } else {
              item.classList.remove("animate");
            }
          });
        }
        window.addEventListener("scroll", reveal);
        reveal(); // initial check
    
        return () => {
          window.removeEventListener("scroll", reveal); // cleanup when unmount
        };
      }, []);

    return (
        <>
            <div className="home-box">
                <h1>ยินดีต้อนรับเข้าสู่ร้านผัก-ผลไม้แฮปปี้ฟาร์ม</h1>
            </div>
        </>
    )
}

export default Home;