import React from "react"
import "./History.css"
import { useState, useEffect } from "react"
import { useNavigate,useLocation, NavLink} from "react-router-dom"

const History = () =>{

    const location = useLocation();
    const paidProduct = location.state?.selectedProduct;
    const navigate = useNavigate();

    const [historyPayment, setHistoryPayment] = useState(() => {
        const stored = localStorage.getItem('historyPayment');
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        if (paidProduct) {
            const updatedHistory = [...historyPayment, paidProduct];
            setHistoryPayment(updatedHistory);
            localStorage.setItem('historyPayment', JSON.stringify(updatedHistory));
        }
    }, [paidProduct]);
    
    return(
         historyPayment.length > 0 ?(
            <>
                {historyPayment.map((hp)=>(
                    <div key={hp} className="hist-box">
                        <div className="appear-box">
                            <h3>{hp.id}</h3>
                            <h3 className="details">รายละเอียด</h3>
                        </div>
                        <div className="disappear-box">
                            <h4>1</h4>
                            <h4>2</h4>
                            <h4>3</h4>
                            <h4>4</h4>
                            <h4>5</h4>
                            <h4>6</h4>
                        </div>
                    </div>
                ))}
            </>
        ) : (
            <>
                <h1>ไม่มีประวัติการทำรายการ</h1>
            </>
        )
    )
}

export default History;