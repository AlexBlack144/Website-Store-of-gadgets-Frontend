import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";


const BasketGadjeds=({baskeGadgets, btnBasketDell, basketFormInline, setBasketFormInline, refreshBasket})=>{

    function totalPrice(){
        let totPrice = 0;
        for (const item of baskeGadgets)
        {
            totPrice+=item.price*item.count;
        }
        return totPrice;
    }
    function buyAllBasket(){
        alert('Congratulations on your purchase!');

        axios({
            method:'post',
            url: "https://webapplicationclient20230302194755.azurewebsites.net/Gadget/BuyGadgets",
            data: JSON.stringify(baskeGadgets),
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + window.sessionStorage.getItem('token')
            }
        })
        .then(data=>{
            console.log(data);
            window.location.reload();
        })
    }
    return(
        <div id="basket-form" style={{display: basketFormInline}}>
                <h2>Basket</h2>
                <button className ="Btn" id ="DellBtn" onClick={()=>setBasketFormInline('none')} style={{marginLeft:'40%', marginTop: '-50px', position: 'absolute'}}>X</button>
                <table id="table-basket">
                    <tbody>
                    {
                        baskeGadgets.map((item, index)=>(
                            <tr key={index} className = "row-basket" id={item.id}>
                                <td><img className = "img-gadget-table"  src={item.image}></img></td>
                                <td className="basket-gadget-table">{item.name}</td>
                                <td className="basket-gadget-table">{item.model}</td>
                                <td className="cbasket-gadget-table">{item.price} ₴</td>
                                <td className="form_for_count">
                                <td style={{display: 'flex', alignItems: 'center', flexFlow: 'row wrap'}}>
                                    <button className = "BtnFilter" style={{width: '30px'}} onClick={()=>
                                    {if(item.count>=2){ item.count-=1};refreshBasket();}}>-</button>
                                    &nbsp; 
                                    <p>
                                    {item.count}
                                    </p>
                                    &nbsp; 
                                    <button className = "BtnFilter" style={{width: '30px'}} onClick={()=>
                                    {if(item.count<item.quantity){item.count+=1};refreshBasket();}}>+</button>
                                </td>
                                </td>
                                <td className="form_for_btns-table">
                                    <button className = "Btn" id = "DellBtn" onClick={()=>btnBasketDell(item.id)} style={{width: '25px', height: '25px', fontSize: '11px'}}>X</button>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>   
                <div className="total-price" style={{display: "flex",  alignItems: "center", justifyContent: 'center'}}>
                    <h3>Total price: {totalPrice()} ₴ </h3>
                    <button className="BuyBtn" onClick={()=>buyAllBasket()}>Buy</button>
                </div> 
           </div>
    )

}
export default BasketGadjeds;
