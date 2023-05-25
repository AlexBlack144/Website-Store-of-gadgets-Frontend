import React from "react";
import { useState } from "react";

const Cards=({gadgets, changeBasketCount, basket, baskeGadgets})=>{
  
    
    function buyBtn(id, image, name, model, price, quantity, sold, status, idCategory)
    {
        if(window.sessionStorage.getItem('token')==null || window.sessionStorage.getItem('token')=='null')
        {   
            alert("You need to Login!")
        }
        else
        {
           
            if(baskeGadgets.map((item, index)=>(item.id)).indexOf(id)==-1)
            {
                changeBasketCount(1);
                basket(id, image, name, model, price, quantity, sold, status, idCategory);
            }
            
        }
    }
    return(
        gadgets.map((item, index)=>(
            <div key={index} className="cart" id={item.id}>
                <img className="img_gadget" src={item.image}></img>
                <div className="cart_gadget"><b>{item.name}</b></div>
                <div className="cart_gadget">{item.model}</div>
                <div className="cart_gadget"><b>{item.price} ₴</b></div>
                <button className="BuyBtn" onClick={()=>buyBtn(
                        item.id,
                        item.image,
                        item.name,
                        item.model,
                        item.price,
                        item.quantity,
                        item.sold,
                        item.status,
                        item.idCategory
                    )}>Buy</button>
            </div>
        ))  
    )
}
export default Cards