import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

const Comments=({gadgetComments, btnDell, userId})=>{

   
    function checkUserIdForComment(commentId,id){
        if(commentId == userId){
            return <button style={{display:"inline"}} className = "DellBtn" id={userId} onClick={()=>btnDell(id)}>X</button>;
        }
        else if(userId == "Manager"){   
            return <button style={{display:"inline"}} className = "DellBtn" id={userId} onClick={()=>btnDell(id)}>X</button>;
        }
        else{
            return <button style={{display:"none"}} className = "DellBtn" id={userId} onClick={()=>btnDell(id)}>X</button>;
        }
    }
    function checkUserIdForComment2(id,name){
        if(id == userId){
            return <div style={{color: "blueviolet"}}>{name}</div>;
        }
        else if(userId == "Manager"){   
            return <div style={{color: "blueviolet"}}>{name}</div>;
        }
        else{
            return <div style={{color: "black"}}>{name}</div>;
        }
    }
    function checkUserIdForComment3(id,date){
        if(id == userId){
            return <div style={{color: "blueviolet"}}>{date}</div>;
        }
        else if(userId == "Manager"){   
            return <div style={{color: "blueviolet"}}>{date}</div>;
        }
        else{
            return <div style={{color: "black"}}>{date}</div>;
        }
    }
    useEffect(() => {  
        
    },[gadgetComments]);
    return(
        gadgetComments.map((item, index)=>( 
            <div key={index}  className="comments" id={item.id}>
                
                <div className="commentNameDate">
                    {checkUserIdForComment(item.fkAspNetUsersId,item.id)}
                    <div>
                        {checkUserIdForComment2(item.fkAspNetUsersId,item.userName)}
                        {checkUserIdForComment2(item.fkAspNetUsersId,item.timeDate)}
                    </div>
                </div>  
                <div className="comment">{item.comment}</div>
            </div>
        ))  
    )
}
export default Comments