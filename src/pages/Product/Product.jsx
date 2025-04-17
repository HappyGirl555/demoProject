import React from "react";
import dataProduct from "../../data/dataProduct";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Product.css"



const Product = () =>{
    const [selectedProduct, setSelectedProduct] = useState([]);
    const [selectedType, setSelectedType] = useState("ทั้งหมด");
    const navigate = useNavigate();

    const selectProduct = (product) => {
        if (selectedProduct.includes(product)) {
            setSelectedProduct(selectedProduct.filter((pd) => pd !== product));
        } else {
            setSelectedProduct([...selectedProduct, product]);
        }
    };

    const selectType = (type) =>{
        setSelectedType(type)
    }

    const paySelectedProduct = () =>{
        navigate("/payment", { state: { selectedProduct } });
    }


    return (
    <>
        <div className="topic-page">
            <h1>รายการสินค้า</h1>
        </div>
        <div className="bar-type">
            <div onClick={() => selectType("ทั้งหมด")} 
            style={{backgroundColor : selectedType==="ทั้งหมด" ?  "rgb(84, 171, 113)":""
                ,color: selectedType==="ทั้งหมด" ? "white" : ""
            }}>ทั้งหมด</div>
            <div onClick={() => selectType("ผัก")}
            style={{backgroundColor : selectedType==="ผัก" ?  "rgb(84, 171, 113)":""
                ,color: selectedType==="ผัก" ? "white" : ""
            }}>ผัก</div>
            <div  onClick={() => selectType("ผลไม้")}
            style={{backgroundColor : selectedType==="ผลไม้" ?  "rgb(84, 171, 113)":"" 
                ,color: selectedType==="ผลไม้" ? "white" : ""
            }}>ผลไม้</div>
        </div>
        <div className="products">
            { dataProduct ? (
                dataProduct.filter(product => ( product.type === selectedType || selectedType === "ทั้งหมด" ))
                .map((product) =>(
                (
                    <div key={product.id} 
                        className={`pd-box ${selectedProduct.includes(product) ? "selected" : ""}`}
                        onClick={() => selectProduct(product)}
                        >
                        <div className="content-pd">
                            <div className="pd-pic">
                                <img src={product.image} alt={product.name} ></img>
                            </div>
                            <div className="detail-pd">
                                <div className="topic-pd">
                                   <h3 style={{margin:0}}>{product.name}</h3>
                                {product.organic && (
                                    <p style={{ color: "green", margin:0 }}>
                                        สินค้าออร์แกนิก
                                    </p>
                                    )} 
                                </div>
                                <div className="des-pd">
                                   <p style={{margin:0}}>จำนวนสินค้า {product.stock}&nbsp;{product.unit}</p>
                                    <p style={{margin:0}}>{product.description}</p>
                                </div>
                            </div>
                            <div className="price">
                                <h4>ราคา&nbsp;{product.price_per_unit}&nbsp;บาท/{product.unit}</h4>
                            </div>
                        </div>
                    </div>
                )
                )))

            : (<h2>ไม่มีสินค้าในรายการ</h2>)
            }
        </div>
        <div className="payment">
            <div className="payment-butt" onClick={paySelectedProduct}>
                <h3>ชำระเงิน</h3>
            </div>   
        </div>
    </>
    )

}

export default Product;