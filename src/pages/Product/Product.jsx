import React, { useEffect } from "react";
import dataProduct from "../../data/dataProduct";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Product.css"
import Swal from 'sweetalert2'


const Product = () =>{
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState([]);
    const [selectedType, setSelectedType] = useState("ทั้งหมด");

    const navigate = useNavigate();

    useEffect(()=>{
        setProducts(dataProduct)
    },[])

    const addNumProductSelec = (product) =>{

        const index = selectedProduct.findIndex((pd) => pd.product.id === product.id);
        //const realStock_index = dataProduct.findIndex((pd) => pd.id === product.id);

        if (index!==-1) {
            const updatedProducts = [...selectedProduct];
            updatedProducts[index].quantity += 1;
            setSelectedProduct(updatedProducts);

        } else {
            setSelectedProduct([...selectedProduct, {product:product, quantity: 1 }]);
        }

        const product_index = products.findIndex((pd) => pd.id === product.id);
        const updatedProductsStock = [...products];
        updatedProductsStock[product_index].stock -= 1;
        setProducts(updatedProductsStock);
    }

    const dropNumProductSelec = (product) =>{
        
        const index = selectedProduct.findIndex((pd) => pd.product.id === product.id);
        const product_index = products.findIndex((pd) => pd.id === product.id);
        const updatedProducts = [...selectedProduct];

        if (index !== -1) {
            if (updatedProducts[index].quantity !== 1) {
                updatedProducts[index].quantity -= 1;
            } else {
                updatedProducts.splice(index, 1);
            }
    
            setSelectedProduct(updatedProducts);
    
            const updatedProductsStock = [...products];
            updatedProductsStock[product_index].stock += 1;
            setProducts(updatedProductsStock);
        }
        
    }

    const selectType = (type) =>{
        setSelectedType(type)
    }

    const paySelectedProduct = (e) =>{
        if (selectedProduct.length !== 0){
            navigate("/payment", { state: { selectedProduct } });
        }else{
            e.preventDefault();
            Swal.fire({
                title: "กรุณาเลือกซื้อสินค้า",
                icon: "error",
                timer: 3500,
                showConfirmButton: false
            });
        }
        
    }

    const payAll = () => {
        const cost_product = selectedProduct.map((pd) => ({
          quantity: pd.quantity,
          cost_per_unit: pd.product.price_per_unit
        }));
      
        return cost_product.reduce((sum, item) => {
          return sum + item.quantity * item.cost_per_unit;
        }, 0)
    };


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
            { products ? (
                products.filter(product => ( product.type === selectedType || selectedType === "ทั้งหมด" ))
                .map((product) =>(
                (
                    <div key={product.id} 
                        className={`pd-box ${selectedProduct.find((pd) => pd.product.id === product.id)? "selected":""}`}
                        //onClick={() => selectProduct(product)}
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
                                    <p style={{margin:0}}>{product.description}</p>
                                </div>
                            </div>
                            <div className="selected-pd">
                                <div className="price">
                                    <h4 style={{margin:"0px"}}>ราคา&nbsp;{product.price_per_unit}&nbsp;บาท/{product.unit}</h4>
                                </div>
                                <div className="butt-product-select">
                                    <div className={`drop-butt ${selectedProduct.find((pd) => pd.product.id === product.id)?.quantity >= 1 ? "" : "no"}` } 
                                    onClick={ () =>{
                                        if (selectedProduct.find((pd) => pd.product.id === product.id)?.quantity > 0) {
                                        dropNumProductSelec(product);
                                        }}}>
                                        <p style={{margin:"0px", fontWeight:"bold", fontSize:"18px"}}>-</p>
                                    </div>
                                    <div className="num">
                                        <p style={{margin:"0px", fontWeight:"bold", fontSize:"18px"}}>
                                            {selectedProduct.find((pd) => pd.product.id === product.id)?.quantity || 0}</p>
                                    </div>
                                     <div className={`add-butt ${products.find((pd) => pd.id === product.id)?.stock === 0 ?"no" : ""}`} 
                                    onClick={() =>{
                                        if (product.stock > 0) {
                                            addNumProductSelec(product)
                                        }}}
                                    >
                                        <p style={{margin:"0px", fontWeight:"bold", fontSize:"18px"}}>+</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="stock-pd">
                                <p style={{margin:0, color:"rgb(195, 109, 44)"}}>จำนวนสินค้า {product.stock}&nbsp;{product.unit}</p>
                            </div>
                        </div>
                    </div>
                )
                )))

            : (<h2>ไม่มีสินค้าในรายการ</h2>)
            }
        </div>
        <div className="payment">
            <div className="payAll">
                <h1>ราคาทั้งหมด&nbsp;{selectedProduct? payAll(): 0}&nbsp;บาท</h1>
            </div>
            <div className="payment-butt" onClick={(e) =>paySelectedProduct(e)}>
                <h3>ชำระเงิน</h3>
            </div>   
        </div>
    </>
    )

}

export default Product;