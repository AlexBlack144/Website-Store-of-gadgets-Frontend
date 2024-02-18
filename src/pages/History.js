import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { Hosting } from '../components/Hosting.ts';
import '../cssFiles/style_for_manager.css';
import '../cssFiles/style_logo_text.css';
import Paginationee from "../components/Paginationee.js";
import Slider from "@mui/material/Slider";
import axios from "axios";
import React from "react";

function History(){

    const [host] = useState(new Hosting());

    const [purchases,setPurchases] = useState([]);
    const [categories, setCategories] = useState([]);
    const [flag, setFlag] = useState(0);

    const [currentPage, setCurrentPage] = useState(1);
    const [cardsPerPage, setcardsPerPage] = useState(5);

    const paginate = pageNumber => setCurrentPage(pageNumber)
    const lastCardIndex = currentPage * cardsPerPage;
    const firstCardIndex = lastCardIndex - cardsPerPage;

    var resPurchases = purchases.sort(function (a, b) {
        if (a.date > b.date) {
          return -1;
        }
        if (a.date < b.date) {
          return 1;
        }
        // a должно быть равным b
        return 0;
    });

    const currentCard = resPurchases.slice(firstCardIndex, lastCardIndex);
    
    var uniqueNames = [];
    var uniqueNames2 = [];
    const [models, setModels] = useState([]);
    const [users, setUsers] = useState([]);
    const [range, setRange] = React.useState([50, 100000]);
    const [search, setSearch] = useState("");

    function getCategorys()
    {
        
        if(flag == 0)
        {
            axios({
                method:'get',
                url: `https://${host.getHost()}/Category/GetCategorys`,
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json'
                }
            })
            .then(data=>
            {
                setCategories(data.data);
            })
            setFlag(1);
        }
    }
    function getGadgetsById(id)
    {
        
       
        axios({
            method:'get',
            url: `https://${host.getHost()}/Purchase/GetPurchaseByIdCategory?id=${id}`,
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            }
        })
        .then(data=>
        {
            setPurchases(data.data);
            console.log(purchases);    
        });
    }
    function getOut(){
        if(window.sessionStorage.getItem('token')==null|| window.sessionStorage.getItem('token')=='null')
        {
            alert('You don`t login!');
        }
        else{
            
            console.log(window.sessionStorage.getItem('token'));
            window.sessionStorage.setItem('token', null)
            window.location.href = '/login';
        }
       
    }
    function handleChanges(event, newValue) {
        setRange(newValue);
    }
    function brandlFilter(){
        uniqueNames = Array.from(new Set(purchases.map((item, index)=>(item.fkGadgets.name))));
    }
    function userFilter(){
        uniqueNames2 = Array.from(new Set(purchases.map((item, index)=>(item.fkAspNetUsers.userName))));
    }
    function getGadgetFilter()
    {
        let filter_gadget = 
        {
            nameUsers: users,
            nameModels: models,
            min: range[0],
            max: range[1],
        };
        console.log(filter_gadget)
        axios({
            method:'post',
            url: `https://${host.getHost()}/Purchase/GetPurchaseFilter`,
            data: JSON.stringify(filter_gadget),
            dataType: "dataType",
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            }
        })
        .then(data=>
        {
            setPurchases(data.data);    
        });
        
    }
    function filterBtn(){
        let modelNames = document.getElementsByClassName("checkboxesBrand");
        let userNames = document.getElementsByClassName("checkboxesUser");
        setModels([]);
        setUsers([]);
        for (const item of modelNames)
        {
            if(item.checked)
            {
                models.push(item.id);
            }
        };
        for (const item of userNames)
        {
            if(item.checked)
            {
                users.push(item.id);
            }
        };
        getGadgetFilter();
    }
    function getGadgetsByName(name)
    {
        axios({
            method:'get',
            url: `https://${host.getHost()}/Purchase/GetPurchaseByBrandModelUser?name=${name}`,
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            }
        })
        .then(data=>
        {
            setPurchases(data.data); 
        });
        
    }
    function clearSearch(){
        setSearch("");
    }
    function getPurchase(){
      
        axios({
            method:'get',
            url: `https://${host.getHost()}/Purchase/GetPurchases`,
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + window.sessionStorage.getItem('token'),
            }
        })
        .then(data=>
        {
            setPurchases(data.data);
        });
    }

    useEffect(() => {
        getPurchase();
    }, []);
    return(
        <div className="App-header1">
         <div className="App-header1">
            <div id="DivRegisAndLoginLinks">
                <div>
                    <Link className="link" to="/registManager">
                        Regist Manager 
                        <img src="https://web-design-kursak.s3.eu-west-2.amazonaws.com/create_black_24dp+(1).svg" style={{width:'18px', height: '18px'}} alt="React Logo"></img>
                    </Link>
                    
                    <b className="RegisAndLoginLinks" > or </b>
                    <Link className="link" to="/login">
                        Login   
                        <img src="https://web-design-kursak.s3.eu-west-2.amazonaws.com/person_outline_black_24dp+(1).svg" style={{width:'18px', height: '18px'}} alt="React Logo"></img>
                    </Link>
                    
                </div>
                <div id="form-search" action="">
                    <input id="input-form-search" type="search" required value={search} onChange={(e)=>{setSearch(e.target.value)}}
                    onKeyDown={(event) =>
                        {
                            if (event.key === 'Enter') {
                                getGadgetsByName(search)
                            }
                        }}
                    ></input>
                    <i id="fa-search" onClick={()=>getGadgetsByName(search)}>
                        <img id="logo-search" src="https://web-design-kursak.s3.eu-west-2.amazonaws.com/search.svg"></img>
                    </i>
                    <a id="clear-btn" onClick={()=>clearSearch()}>X</a>
                </div>
                <div onClick={()=>getOut()} style={{ cursor: 'pointer'}}>
                    <b className="link" id="out" >Out   </b>
                    <img src="https://web-design-kursak.s3.eu-west-2.amazonaws.com/logout_black_24dp+(1).svg" style={{width:'18px', height: '18px'}} alt="React Logo"></img>
                </div>  
            </div>
            <br></br>
            <div style={{textAlign: 'center'}}>
            <div className="main-container3"onClick={()=>(window.location.href='/')}>
                    <div class="first-container share">
                        <h1><span id="one">I</span><span>S</span><span>T</span><span>O</span> <span>R</span><span>E</span></h1>
                    </div>
                </div> 
            </div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div className="container-menu" id="container"  style={{cursor: 'pointer'}}>
                <div className = "name_category" style={{ borderBlockColor: 'yellow'}} onClick={() => window.location.href='/Manager'} >Back to creating products</div>
                <div className = "name_category" style={{ borderBlockColor: 'yellow'}} onClick={() => window.location.reload()} >Show All</div>
                
            </div>
            <br></br>
            <div className="container-menu" id="container"  style={{cursor: 'pointer'}}>
                {getCategorys()}
                {
                    categories.map((item, index)=>(
                        <div key={index}  className = "name_category" id={item.id} onClick={() => getGadgetsById(item.id)}>
                        {item.name}
                        </div>
                    ))
                } 
            </div>
            <br></br>
            <br></br>
            <div className="columns-menu">
                <div className="col-left-siderbar">
                    <div className="range-class">
                        <b>Total Price</b>
                        <Slider id="slider" max="100000" style={{marginTop:"20px"}} value={range} onChange={handleChanges} ></Slider>
                        <br></br>
                        <label>min {range[0]} ₴ - max {range[1]} ₴</label>
                        <div id="none"></div>
                    </div>
                    <br></br>
                    <b>Brand</b>
                    <br></br>
                    <br></br>
                    {brandlFilter()}
                    {
                        uniqueNames.map((item, index)=>(
                            <div key={index} style={{marginBottom: '10px'}}>
                               <input type="checkbox" className="checkboxesBrand" id={item}></input>
                                {item}
                            </div>))
                    }
                    <br></br>
                    <b>User</b>
                    <br></br>
                    <br></br>
                    {userFilter()}
                    {
                        uniqueNames2.map((item, index)=>(
                            <div key={index} style={{marginBottom: '10px'}}>
                               <input type="checkbox" className="checkboxesUser" id={item}></input>
                                {item}
                            </div>))
                    }
                    <br></br>
                    <button className="BtnFilter" onClick={()=>filterBtn()}>Find</button>
                </div>
                <div id="container-table">
                <table id="table_gadgets">
                    <tbody>
                        <tr>
                            <th>Image</th>
                            <th>User</th>
                            <th>Brand</th>
                            <th>Model</th>
                            <th>Count</th>
                            <th>Total Price ₴</th>
                            <th>Date</th>
                        </tr>
                        
                        {
                        currentCard.map((item, index)=>(
                            <tr key={index} className = "row" id={item.id}>
                                <td><img className = "img_gadget-table"  src={item.fkGadgets.image}></img></td>
                                <td className="cart_gadget-table">{item.fkAspNetUsers.userName}</td>
                                <td className="cart_gadget-table">{item.fkGadgets.name}</td>
                                <td className="cart_gadget-table">{item.fkGadgets.model}</td>
                                <td className="cart_gadget-table">{item.count}</td>
                                <td className="cart_gadget-table">{item.totalPrice} ₴</td>
                                <td className="cart_gadget-table">{item.date}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
                </div>
            </div>
            <br></br>
            <div className="pagination">
                <Paginationee 
                    cardsPerPage={cardsPerPage}
                    totalCards={purchases.length}
                    paginate={paginate}
                ></Paginationee>
            </div>
            <br></br>
        </div>  
        </div>
    );

}
export default History;