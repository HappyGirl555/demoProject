import React from "react";
import company from "../../data/company/company";
import aboutPicture from "../../data/company/picture/aboutPicture"
import "./About.css"
import { useEffect } from "react";

const About = () =>{

    useEffect(() => {
        function reveal() {
          const items = document.querySelectorAll(".about-box,.descrip-cpn,.mission-cpn,.vision-cpn,.whatWeDo-cpn,.descrip-cpn,.commitment-cpn.whatWeDo-cpn-each");
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
            <div className="about-box">
                <div className="header-about">
                    <h1>{company.companyName}</h1>
                </div>
                <div className="descrip-cpn">
                    <p dangerouslySetInnerHTML={{ __html: company.description}}>
                    </p>
                    <div className="pic">
                    <img src={aboutPicture.about1} className="descrip-pic"></img>
                    <img src={aboutPicture.about2} className="descrip-pic"></img> 
                    </div>
                </div>
                <div className="mission-cpn">
                    <h2>พันธกิจ</h2>
                    {
                        company.mission.map((ms)=>(
                            <p>"{ms}"</p>
                        ))
                    }
                </div>
                <div className="vision-cpn">
                    <h2>วิสัยทัศน์</h2>
                    <p dangerouslySetInnerHTML={{ __html: company.vision }}></p>
                </div>
                <div className="whatWeDo-cpn">
                    <h2>สิ่งที่เราทำ</h2>
                    <div className="whatWeDo-cpn-each">
                        <div className="detail">
                            <h3>คัดสรรคุณภาพจากต้นทาง</h3>
                            <p>{company.whatWeDo.qualitySelection}</p>   
                        </div>
                        <img src={aboutPicture.about3} className="whatWeDo-pic"></img>
                    </div>
                    <div className="whatWeDo-cpn-each">
                        <img src={aboutPicture.about4} className="whatWeDo-pic"></img>
                        <div className="detail">
                            <h3>ขนส่งอย่างใส่ใจ</h3>
                            <p>{company.whatWeDo.carefulDelivery}</p>
                        </div>
                    </div>
                    <div className="whatWeDo-cpn-each">
                        <div className="detail">
                            <h3>เชื่อมโยงผู้ผลิตกับผู้บริโภค</h3>
                            <p>{company.whatWeDo.directConnection}</p>   
                        </div>
                        <img src={aboutPicture.about5} className="whatWeDo-pic"></img>
                    </div>
                    
                </div>
                <div className="commitment-cpn">
                    <h2>คำมั่นของเรา</h2>
                    <p dangerouslySetInnerHTML={{ __html: company.commitment}}></p>
                </div>
            </div>
        </>
    )

}

export default About;