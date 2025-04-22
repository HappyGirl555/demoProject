import React from "react"
import "./History.css"
import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"

const History = () =>{

    const location = useLocation();
    const [openHistory, setOpenHistory] = useState([])


    const [historyPayment, setHistoryPayment] = useState(() => {
        const stored = localStorage.getItem('historyPayment');
        return stored ? JSON.parse(stored) : [];
    });
    
    console.log(historyPayment)

    useEffect(() => {

        window.scrollTo(0, 0);

        if (location.state) {
            const { paidProducts, totalPrice, payType, date, time, user } = location.state;
    
            const isDuplicate = historyPayment.some(
                (entry) => JSON.stringify(entry.paidProducts) === JSON.stringify(paidProducts)
            );
    
            if (!isDuplicate) {
                const newRecord = { paidProducts, totalPrice, payType, date, time, user };
                const updatedHistory = [...historyPayment, newRecord];
                setHistoryPayment(updatedHistory);
                localStorage.setItem('historyPayment', JSON.stringify(updatedHistory));
            }
        }
    }, [location.state, historyPayment]);

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
                <h1>ประวัติการสั่งซื้อ</h1>
                {historyPayment.slice().reverse().map((hp,id)=>(
                    <div key={id} className="hist-box">
                        <div className="header-box" onClick={() => openDeatail(hp)}>
                            <div>
                                <h3 style={{textAlign:"left"}}>รายการสั่งซื้อวันที่ {hp.date} เวลา {hp.time} น. </h3>
                            </div>
                            <div >
                                <i className={`fa fa-caret-down ${openHistory.includes(hp)? "visible":""}`} style={{fontSize:"40px"}}></i>
                            </div>
                        </div >
                        <div className={`details-box ${openHistory.includes(hp)? "visible":""}`}>
                            <div className="header-address-detail">
                                <h3>ที่อยู่จัดส่ง</h3>
                                {
                                    hp.user.status? (
                                        <h3 style={{color:"rgb(36, 103, 51)"}}>จัดส่งสำเร็จ</h3>
                                    ):(
                                    <h3 style={{color:"rgb(195, 104, 24)"}}>รอดำเนินการ</h3>)
                                }
                            </div>
                            <div className="payment-descripe-user">
                                <div className="address">
                                    <h4>ชื่อจริง <span>{hp.user.firstname}</span></h4>
                                    <h4>นามสกุล <span> {hp.user.lastname}</span></h4>
                                    <h4>เบอร์โทรศัพท์ <span>{hp.user.phone}</span></h4>
                                    <h4>บ้านเลขที่ <span>{hp.user.addNumber}</span></h4>
                                    <h4>หมู่ <span>{hp.user.moo}</span></h4>
                                    <h4>ตำบล <span>{hp.user.district}</span></h4>
                                    <h4>อำเภอ <span>{hp.user.amphoe}</span></h4>
                                    <h4>จังหวัด <span>{hp.user.province}</span></h4>
                                    <h4>รหัสไปรษณีย์ <span>{hp.user.zipcode}</span></h4>
                                </div>
                            </div>
                            
                            <div className="payment-type">
                                <h3>ชำระโดย {hp.payType}</h3>
                                <h3>ราคาสุทธิ {hp.totalPrice} บาท</h3>
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
                                        <p>{pd.price_per_unit} บาทต่อ{pd.punit}</p>
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
                <div style={{color:"rgb(174, 174, 174)"}}>
                    <h1 >ไม่มีประวัติการทำรายการ</h1>
                </div>
            </>
        )
    )
}

export default History;