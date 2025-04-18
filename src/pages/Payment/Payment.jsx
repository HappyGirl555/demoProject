import React, { useState } from "react";
import "./Payment.css";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Payment = () =>{
    const [typePayment, setTypePayment] = useState(null);
    const location = useLocation();
    const selectedProducts = location.state?.selectedProducts;
    const navigate = useNavigate();
    console.log(selectedProducts)


    const payAll = () => {
        const cost_product = selectedProducts.map((pd) => ({
            payEachProduct: pd.payEachProduct,
    }));
        return cost_product.reduce((sum, item) => {
          return sum + item.payEachProduct ;
        }, 0)
    };

    const payType = (type) =>{
        setTypePayment(type);
    }

    const paySuccess = () => {
        if(typePayment===null){
            Swal.fire({
                title: "เลือกช่องทางการชำระเงิน",
                icon: "error",
                timer: 3500,
                showConfirmButton: false
            });
        }else{
            Swal.fire({
            title: "ชำระเงินสำเร็จ",
            icon: "success",
            timer: 3500,
            showConfirmButton: false
             });

            navigate("/history", { state: {
                paidProducts : selectedProducts, 
                totalPrice:`${payAll()}`,
                payType: typePayment,
                date: new Date().toLocaleString('th-TH', { year: 'numeric', month: 'long', day: 'numeric'}),
                time: new Date().toTimeString().slice(0,5)
            }})
        }
    }
    
    return (
    
        <>
            <div className="payment-topic">
                <h2 style={{textAlign:"left"}}>ชำระสินค้า</h2>
            </div>
            <div class="payment-form">
                    <div className="header-payment">
                        <h3>รายการสินค้า</h3>
                        <h3>จำนวน</h3>
                        <h3>ราคา</h3>
                    </div>
                    <div className="describe-payment">
                    {
                        selectedProducts.map((pd,index) =>(
                            (
                                <div class="describ-pd" key={index}>
                                    <p>{pd.pname}</p>
                                    <p>{pd.quantity} {pd.punit}</p>
                                    <p>{pd.payEachProduct}.-</p>
                                </div>
                            )
                        ))
                    }
                    <div className="pay-all">
                        <h3 style={{gridArea:"a"}}>ราคารวม</h3>
                        <h3 style={{gridArea:"b"}}>{payAll()} บาท </h3>
                    </div> 
                </div>
                <div className="payment-state">
                    <h3>ช่องทางการชำระเงิน</h3>
                    <div className="pay-selected">
                        <div className={`pay-selected-butt ${typePayment==="Credit Card"? "selected":""}`} onClick={()=>payType("Credit Card")}>
                            <p>Credit Card</p>
                        </div>
                        <div className={`pay-selected-butt ${typePayment==="True Money"? "selected":""}`} onClick={()=>payType("True Money")}>
                            <p>True Money</p>
                        </div>
                        <div className={`pay-selected-butt ${typePayment==="Promtpay"? "selected":""}`} onClick={()=>payType("Promtpay")}>
                            <p>Promtpay</p>
                        </div>
                    </div>
                    <div className="pay-success">
                        <div className="pay-success-butt" onClick={()=>paySuccess()}>
                            <p>ชำระเงิน</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    




    )

}

export default Payment;