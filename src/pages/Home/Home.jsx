import React, { useState } from "react";
import homePicture from "../../data/company/picture/homePicture"
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
                <h1>🌿ยินดีต้อนรับเข้าสู่ แฮปปี้ฟาร์ม🌿</h1>
                <h2>แหล่งรวมผักและผลไม้สดจากใจเกษตรกรไทย</h2>
                <div className="slider-container">
                  <div className="slider-track">
                    {[...Array(2)].map((_, i) => (
                      <React.Fragment key={i}>
                        <img src={homePicture.home1} alt="home1" />
                        <img src={homePicture.home2} alt="home2" />
                        <img src={homePicture.home3} alt="home3" />
                        <img src={homePicture.home4} alt="home4" />
                        <img src={homePicture.home5} alt="home5" />
                        <img src={homePicture.home6} alt="home6" />
                      </React.Fragment>
                    ))}
                  </div>
              </div>
            </div>
        </>
    )
}

export default Home;