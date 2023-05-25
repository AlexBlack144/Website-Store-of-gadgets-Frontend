import React from "react";
import axios from "axios";
import { myPurchases } from '../components/myPurchases.ts';
import { Hosting } from '../components/Hosting.ts';
import { useState, useEffect } from "react";
import { colors } from "@mui/material";

const Purchases=({purchasesFormInline, setPurchasesFormInline, purchases, setPurchases})=>{
    const [host] = useState(new Hosting());
    var res = purchases.sort(function (a, b) {
        if (a.date > b.date) {
          return -1;
        }
        if (a.date < b.date) {
          return 1;
        }
        // a должно быть равным b
        return 0;
    });
    return(
        <div id="basket-form" style={{display: purchasesFormInline}}>
            <h2>Purchase History</h2>
            <button className ="Btn" id ="DellBtn" onClick={()=>{setPurchases([]);setPurchasesFormInline('none'); }} style={{marginLeft:'40%', marginTop: '-50px', position: 'absolute'}}>X</button>
            <table id="table-basket">
                <tbody>
                <tr> 
                    <th style={{color: 'black'}}>Image</th>
                    <th style={{color: 'black'}}>Brand</th>
                    <th style={{color: 'black'}}>Model</th>
                    <th style={{color: 'black'}}>Count</th>
                    <th style={{color: 'black'}}>Total Price</th>
                    <th style={{color: 'black'}}>Date</th>        
                </tr>
                {     
                    res.map((item, index)=>(
                        <tr key={index} className = "row-basket" id={item.id}>
                                <td><img className = "img-gadget-table"  src={item.fkGadgets.image}></img></td>
                                <td className="basket-gadget-table">{item.fkGadgets.name}</td>
                                <td className="basket-gadget-table">{item.fkGadgets.model}</td>
                                <td className="basket-gadget-table">{item.count}</td>
                                <td className="cbasket-gadget-table">{item.totalPrice} ₴</td>
                                <td className="cbasket-gadget-table">{item.date}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    )
}
export default Purchases;