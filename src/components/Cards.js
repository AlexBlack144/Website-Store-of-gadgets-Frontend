import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { myBasketGadjets } from '../components/myBasketGadjets.ts';

const Cards=({gadgets, changeBasketCount, basket, baskeGadgets, setToLocalStorageGadgets})=>{
  
    const [itemsFromLocalStorage, setItemsFromLocalStorage] = useState([]);

    function buyBtn(id, image, name, description, model, price, quantity, sold, status, idCategory)
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
                basket(id, image, name, description, model, price, quantity, sold, status, idCategory);
            }
        }
        setToLocalStorageGadgets(baskeGadgets);
    }
    useEffect(() => {

        if(JSON.parse(localStorage.getItem('basketGadgets'))){
            const items = JSON.parse(localStorage.getItem('basketGadgets'));
            setItemsFromLocalStorage(items);
            changeBasketCount(items.map((item, index)=>(item.id)).length);
            items.map((item, index)=>(
                baskeGadgets.push(new myBasketGadjets(item.id, item.image, item.name, item.description, item.model, item.price, item.quantity, item.sold, item.status, item.idCategory, item.count))
        ))
        }  
    }, []);
    return(
        gadgets.map((item, index)=>(
              
                <div key={index} className="cart" id={item.id} onClick={setToLocalStorageGadgets(baskeGadgets)}>
                    <Link to={`/characteristic/${item.id}`} style={{textDecoration:"none"}}>
                        <img className="img_gadget" src={item.image}></img>
                        <div className="cart_gadget"><b>{item.name}</b></div>
                        <div className="cart_gadget">{item.model}</div>
                        <div className="cart_gadget"><b>{item.price} ₴</b></div>
                    </Link>   
                    <button className="BuyBtn" onClick={()=>buyBtn(
                            item.id,
                            item.image,
                            item.name,
                            item.description,
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