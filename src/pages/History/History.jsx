import React from "react"
import "./History.css"
import { useState, useEffect } from "react"
import { useNavigate,useLocation, NavLink} from "react-router-dom"

const History = () =>{

    const location = useLocation();
    const navigate = useNavigate();
    const [openHistory, setOpenHistory] = useState([])


    const [historyPayment, setHistoryPayment] = useState(() => {
        const stored = localStorage.getItem('historyPayment');
        return stored ? JSON.parse(stored) : [];
    });
    
    console.log(historyPayment)

    useEffect(() => {
        if (location.state) {
            const { paidProducts, totalPrice, payType, date, time } = location.state;
    
            const isDuplicate = historyPayment.some(
                (entry) => JSON.stringify(entry.paidProducts) === JSON.stringify(paidProducts)
            );
    
            if (!isDuplicate) {
                const newRecord = { paidProducts, totalPrice, payType, date, time };
                const updatedHistory = [...historyPayment, newRecord];
                setHistoryPayment(updatedHistory);
                localStorage.setItem('historyPayment', JSON.stringify(updatedHistory));
            }
        }
    }, [location.state]);

    const openDeatail = (history) => {
        const isOpen = openHistory.includes(history);
    
        if (isOpen) {
            const updated = openHistory.filter(h => h !== history);
            setOpenHistory(updated);
        } else {
            setOpenHistory([...openHistory, history]);
        }
    };
    
    return(
         historyPayment.length > 0 ?(
            <>
                <h1>ประวัติรายการสั่งซื้อ</h1>
                {historyPayment.map((hp,id)=>(
                    <div key={id} className="hist-box">
                        <div className="header-box">
                            <div>
                                <h3 style={{textAlign:"left"}}>รายการสั่งซื้อวันที่ {hp.date} เวลา {hp.time} น. </h3>
                            </div>
                            <div onClick={() => openDeatail(hp)}>
                                <i className={`fa fa-caret-down ${openHistory.includes(hp)? "visible":"hidden"}`} style={{fontSize:"40px"}}></i>
                            </div>
                        </div >
                        <div className={`details-box ${openHistory.includes(hp)? "visible":"hidden"}`}>
                            <div className="payment-type">
                                <h4>ชำระโดย {hp.payType}</h4>
                                <h4>ราคาสุทธิ {hp.totalPrice} บาท</h4>
                            </div>
                            <div className="describe-history">
                                <div className="head-describe-pd-history">
                                    <h4>ชื่อสินค้า</h4>
                                    <h4>ราคาต่อหน่วย</h4>
                                    <h4>จำนวน</h4>
                                    <h4>ราคา</h4>
                                </div>
                                {
                                    hp.paidProducts.map((pd,index)=>(
                                    <div key={index} className="describe-pd-history">
                                        <p>{pd.pname}</p>
                                        <p>{pd.price_per_unit} ต่อ {pd.punit}</p>
                                        <p>{pd.quantity} {pd.punit}</p>
                                        <p>{pd.payEachProduct}.-</p>
                                    </div>
                                    ))
                                }
                            </div>
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