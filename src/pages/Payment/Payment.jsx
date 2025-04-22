import React, { useEffect, useState } from "react";
import "./Payment.css";
import raw_address from "../../data/raw_address"
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const Payment = () =>{
    const [typePayment, setTypePayment] = useState("");
    const [errors,setErrors] = useState([])
    const location = useLocation();
    
    const navigate = useNavigate();
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [phone, setPhone] = useState("");
    const [addNumber, setAddNumber] = useState("");
    const [moo, setMoo] = useState("");
    const [provinces, setProvinces] = useState([]);
    const [amphoes, setAmphoes] = useState([]);
    const [tumbols, setTumbols] = useState([]);
    const [selectedzipcode, setSelectedZipcode] = useState("");
    const [selectedProvince, setSelectedProvince] = useState("");
    const [selectedAmphoe, setSelectedAmphoe] = useState("");
    const [selectedTumbol, setSelectedTumbol] = useState("");

    const selectedProducts = location.state?.selectedProducts;
    console.log(selectedProducts)


    useEffect(()=>{
        window.scrollTo(0, 0);
        const provinces = [...new Set(raw_address.map(item => item.province))].sort();
        setProvinces(provinces)
    },[])


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
    
    const handleFirstname = (e) =>{
        const selectedFirstname = e.target.value;
        setFirstname(selectedFirstname)
    }

    const handleLastname = (e) =>{
        const selectedLastname = e.target.value;
        setLastname(selectedLastname)
    }

    const handlePhone = (e) =>{
        const selectedPhone = e.target.value;
        setPhone(selectedPhone)
    }

    const handleAddNumber = (e) =>{
        const selectedAddNumber = e.target.value;
        setAddNumber(selectedAddNumber)
    }

    const handleMoo = (e) =>{
        const selectedMoo = e.target.value;
        setMoo(selectedMoo)
    }

    const handleProvinceChange = (e) => {
        const value = e.target.value;
        setSelectedProvince(value);
        
        const amphoes = [...new Set(
          raw_address
            .filter(item => item.province === value)
            .map(item => item.amphoe)
        )].sort();
      
        setAmphoes(amphoes);
        setTumbols([]);
        setSelectedAmphoe("");
        setSelectedTumbol("");
        setSelectedZipcode("");
      };

  const handleAmphoeChange = (e) => {
    const value = e.target.value;
    setSelectedAmphoe(value);
  
    const tumbols = [...new Set(
      raw_address
        .filter(item => item.province === selectedProvince && item.amphoe === value)
        .map(item => item.district)
    )].sort();
  
    setTumbols(tumbols);
    setSelectedTumbol("");
    setSelectedZipcode("");
  };

  const handleTumbolChange = (e) => {
    const value = e.target.value;
    setSelectedTumbol(value);
  
    const address = raw_address.find(item =>
      item.province === selectedProvince &&
      item.amphoe === selectedAmphoe &&
      item.district === value
    );
    setSelectedZipcode(address?.zipcode || null);
  };

  const clearError = (fieldName) => {
    setErrors(prevErrors => prevErrors.filter(error => error.name !== fieldName));
    };

  const paySuccess = () => {
    let errors = [];

    const checkEmpty = (fieldName, value) => {
        if (value === "") {
            errors.push({ name: fieldName, message: "กรุณากรอกข้อมูล" });
        }
    };

    const checkNumber = (fieldName, value, requiredLength) => {
        const stringValue = value.toString().trim();

        if (stringValue === "") {
            errors.push({ name: fieldName, message: "กรุณากรอกข้อมูล" });
        } else if (isNaN(stringValue)) {
            errors.push({ name: fieldName, message: "กรุณากรอกตัวเลข" });
        } else if (stringValue.length !== requiredLength) {
            errors.push({ name: fieldName, message: `กรุณากรอกตัวเลขให้ครบ ${requiredLength} จำนวน` });
        }
    };

    const checkTypePayment = (fieldName, value) => {
        if (value === "") {
            errors.push({ name: fieldName, message: "กรุณาเลือกการชำระเงิน" });
        }
    };

    checkEmpty("firstname", firstname);
    checkEmpty("lastname", lastname);
    checkNumber("phone", phone, 10);
    checkEmpty("addNumber", addNumber);
    checkEmpty("moo", moo);
    checkEmpty("selectedProvince", selectedProvince);
    checkEmpty("selectedAmphoe", selectedAmphoe);
    checkEmpty("selectedTumbol", selectedTumbol);
    checkNumber("selectedzipcode", selectedzipcode, 5);
    checkTypePayment("typePayment", typePayment);

    setErrors(errors); // แสดงผล error ใหม่ทั้งหมด

    if (errors.length > 0) {
        Swal.fire({
            title: "ชำระเงินไม่สำเร็จ",
            icon: "error",
            timer: 2000,
            showConfirmButton: false,
        });
    } else {
        Swal.fire({
            title: "ชำระเงินสำเร็จ",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
        });

        navigate("/history", {
            state: {
                paidProducts: selectedProducts,
                totalPrice: `${payAll()}`,
                payType: typePayment,
                date: new Date().toLocaleString("th-TH", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                }),
                time: new Date().toTimeString().slice(0, 5),
                user:{
                    firstname: firstname,
                    lastname: lastname,
                    phone: phone,
                    addNumber: addNumber,
                    moo: moo,
                    district: selectedTumbol,
                    amphoe:selectedAmphoe,
                    province: selectedProvince,
                    zipcode: selectedzipcode,
                    status: false
                }
            },
        });
    }
};

    
    return (
    
        <>
            
            <div className="payment-form">
                <div className="descip-all-pd">
                    <div>
                        <h2 style={{textAlign:"left"}}>รายละเอียดการชำระเงิน</h2>
                    </div>
                        <div className="header-payment">
                            <h3>รายการสินค้า</h3>
                            <h3>จำนวน</h3>
                            <h3>ราคา</h3>
                        </div>
                        <div className="describe-payment">
                        {
                            selectedProducts.map((pd,index) =>(
                                (
                                    <div className="describ-pd" key={index}>
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
                </div>
                <div className="descrip-info">
                    <div className="payment-state">
                        <div className="info-user">
                            <div>
                                <h2 style={{textAlign:"left"}}>ที่อยู่การจัดส่ง</h2>
                            </div>
                            <div className="personal-user">
                                <div className="per-input-user">
                                    <label htmlFor="firstname">ชื่อจริง</label>
                                    <div>
                                        <input onChange={ (e) => {handleFirstname(e);
                                            clearError("firstname");}} value={firstname}></input> 
                                        {errors.find((er) => er.name === "firstname") && (
                                            <p className="error-message" style={{color:"red", margin:0}}>{errors.find((er) => er.name === "firstname").message}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="per-input-user">                       
                                    <label htmlFor="lastname">นามสกุล</label> 
                                   <div>
                                        <input onChange={ (e) => {handleLastname(e);
                                            clearError("lastname");}} value={lastname}></input>
                                        {errors.find((er) => er.name === "lastname") && (
                                            <p className="error-message" style={{color:"red", margin:0}}>{errors.find((er) => er.name === "lastname").message}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="per-input-user">
                                    <label htmlFor="lastname">เบอร์โทรศัพท์</label>
                                    <div>
                                        <input onChange={ (e) => {handlePhone(e);
                                            clearError("phone");}} value={phone}></input>
                                        {errors.find((er) => er.name === "phone") && (
                                            <p className="error-message" style={{color:"red", margin:0}}>{errors.find((er) => er.name === "phone").message}</p>
                                        )}
                                    </div>
                                </div>
                                
                            </div>
                            <div className="address-user">
                                <div className="per-input-user">
                                    <label htmlFor="addNumber">บ้านเลขที่</label>
                                    <div>
                                        <input onChange={ (e) => {handleAddNumber(e);
                                            clearError("addNumber");}} value={addNumber}></input>
                                        {errors.find((er) => er.name === "addNumber") && (
                                            <p className="error-message" style={{color:"red", margin:0}}>{errors.find((er) => er.name === "addNumber").message}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="per-input-user">
                                    <label htmlFor="moo">หมู่</label>
                                    <div>
                                        <input onChange={ (e) => {handleMoo(e);
                                            clearError("moo");}} value={moo}></input>
                                        {errors.find((er) => er.name === "moo") && (
                                            <p className="error-message" style={{color:"red", margin:0}}>{errors.find((er) => er.name === "moo").message}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="per-input-user">
                                    <label htmlFor="province">จังหวัด</label>
                                    <div>
                                        <select value={selectedProvince} onChange={ (e) => {handleProvinceChange(e);
                                            clearError("selectedProvince");}} id="province">
                                            <option value=""  disabled>กรุณาเลือกจังหวัด</option>
                                            {
                                                provinces?.map((pr,index)=>(
                                                    <option key={index} value={pr}>{pr}</option>
                                                ))
                                            }
                                        </select>
                                        {errors.find((er) => er.name === "selectedProvince") && (
                                            <p className="error-message" style={{color:"red", margin:0}}>{errors.find((er) => er.name === "selectedProvince").message}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="per-input-user">
                                    <label htmlFor="amphoe" id="amphoe">อำเภอ</label>
                                    <div>
                                        <select value={selectedAmphoe} onChange={ (e) => {handleAmphoeChange(e);
                                            clearError("selectedAmphoe");}}>
                                            <option value=""  disabled>กรุณาเลือกอำเภอ</option>
                                            {
                                                amphoes?.map((ap,index)=>(
                                                    <option key={index} value={ap}>{ap}</option>
                                                ))
                                            }
                                        </select>
                                        {errors.find((er) => er.name === "selectedAmphoe") && (
                                            <p className="error-message" style={{color:"red", margin:0}}>{errors.find((er) => er.name === "selectedAmphoe").message}</p>
                                        )}
                                    </div>    
                                </div>
                                <div className="per-input-user">
                                    <label htmlFor="tumbol"  id="tumbol">ตำบล</label>
                                    <div>
                                        <select value={selectedTumbol} onChange={ (e) => {handleTumbolChange(e);
                                            clearError("selectedTumbol");}}>
                                            <option value=""  disabled>กรุณาเลือกตำบล</option>
                                            {
                                                tumbols?.map((tb,index)=>(
                                                    <option key={index} value={tb}>{tb}</option>
                                                ))
                                            }
                                        </select>
                                        {errors.find((er) => er.name === "selectedTumbol") && (
                                            <p className="error-message" style={{color:"red", margin:0}}>{errors.find((er) => er.name === "selectedTumbol").message}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="per-input-user">
                                   <label htmlFor="zipcode">รหัสไปรษณีย์</label>
                                   <div>
                                        <input  value={selectedzipcode || ''} onChange={(e) => {setSelectedZipcode(e.target.value);clearError("selectedzipcode");}}></input>
                                        {errors.find((er) => er.name === "selectedzipcode") && (
                                            <p className="error-message" style={{color:"red", margin:0}}>{errors.find((er) => er.name === "selectedzipcode").message}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="pay-part">
                            <h2 style={{textAlign:"left"}}>ช่องทางการชำระเงิน</h2>
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
                            {errors.find((er) => er.name === "typePayment") && (
                                            <p className="error-message" style={{color:"red", margin:0}}>{errors.find((er) => er.name === "typePayment").message}</p>
                            )}
                            <div className="final-total">
                                <h2 style={{textAlign:"left", marginBottom:0}}>ราคาสุทธิ</h2>
                                <div className="final-total-price"><h1 style={{marginTop:"2px"}}>{payAll()} บาท</h1></div>
                            </div>
                            <div className="pay-success">
                                <div className="pay-success-butt" onClick={()=>paySuccess()}>
                                    <p>ชำระเงิน</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    




    )

}

export default Payment;