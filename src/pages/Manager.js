import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import '../cssFiles/style_for_manager.css';
import Paginationee from "../components/Paginationee.js";
import Slider from "@mui/material/Slider";
import axios from "axios";
import React from "react";

function Manager(){

    const [nameCategoryNew, setNameCategoryNew] = useState('');
    const [nameNew, setNameNew] = useState('');
    const [modelNew, setModelNew] = useState('');
    const [priceNew, setPriceNew] = useState('');
    const [quantityNew, setQuantityNew] = useState('');
    const [statusNew, setStatusNew] = useState('true');
    const [selectCategoryNew, setSelectCategoryNew] = useState('1');

    const [idUpdate, setIdUpdate] = useState(0);
    const [imgUpdate, setImgUpdate] = useState('');
    const [nameUpdate, setNameUpdate] = useState('');
    const [modelUpdate, setModelUpdate] = useState('');
    const [priceUpdate, setPriceUpdate] = useState('');
    const [quantityUpdate, setQuantityUpdate] = useState('');
    const [soldUpdate, setSoldUpdate] = useState('');
    const [statusUpdate, setStatusUpdate] = useState('true');
    const [selectCategoryUpdate, setSelectCategoryUpdate] = useState('1');

    const [form1Inline, setForm1Inline] = useState('none');
    const [form2Inline, setForm2Inline] = useState('none');
    const [form3Inline, setForm3Inline] = useState('none');

    const [categories, setCategories] = useState([]);
    const [gadgets, setGadgets] = useState([]);
    const [flag, setFlag] = useState(0);
    const [file, setFile] = useState();

    const [currentPage, setCurrentPage] = useState(1);
    const [cardsPerPage, setcardsPerPage] = useState(5);

    const paginate = pageNumber => setCurrentPage(pageNumber)
    const lastCardIndex = currentPage * cardsPerPage;
    const firstCardIndex = lastCardIndex - cardsPerPage;
    const currentCard = gadgets.slice(firstCardIndex, lastCardIndex);
   
    var uniqueNames = [];
    const [models, setModels] = useState([]);
    const [range, setRange] = React.useState([50, 100000]);
    const [search, setSearch] = useState("");

  
    const saveFile = (e)=>{
        setFile(e.target.files[0]);
    }
    function getAllGadgets(){
        
        if(flag == 0)
        {
            axios({
                method:'get',
                url: "https://webapplicationclient20230302194755.azurewebsites.net/Gadget/GetGadgets",
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json'
                }
            })
            .then(data=>
            {
                setGadgets(data.data);    
            })
            setFlag(1);
            
        }
    }
    function getCategorys()
    {
        
        if(flag == 0)
        {
            axios({
                method:'get',
                url: "https://webapplicationclient20230302194755.azurewebsites.net/Category/GetCategorys",
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
        setForm1Inline('none');
        setForm2Inline('none');
        axios({
            method:'get',
            url: `https://webapplicationclient20230302194755.azurewebsites.net/Gadget/GetGadgetbyId_Category?id=${id}`,
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            }
        })
        .then(data=>
        {
            setGadgets(data.data);    
        });
        
    }
    function btnFormAddGadget(){
        setForm1Inline('inline');
    }
    function btnFormUpdate(id, img, name, model, price, quantity, sold, status, idCategory){
        window.scrollTo(0, 0);
        setIdUpdate(id);
        setImgUpdate(img);
        setNameUpdate(name);
        setModelUpdate(model);
        setPriceUpdate(price);
        setQuantityUpdate(quantity);
        setSoldUpdate(sold);
        setStatusUpdate(status);
        setSelectCategoryUpdate(idCategory);
        setForm2Inline('inline');
    }
    const btnAddGadget= async (e)=>{
        const formData = new FormData();
        formData.append("file", file);

        await axios.post('https://webapplicationclient20230302194755.azurewebsites.net/Gadget/UploadImg', formData, 
        { 
            headers: 
            { 
                'Content-Type': 'multipart/form-data',
                "Authorization": "Bearer " + window.sessionStorage.getItem('token')
            } 
        }) 
        .then(data => { 
            addGadget(data.data)
        })
        .catch(error => { console.log(error.data)});
    }
    function addGadget(img){
        setForm1Inline('none');
        let new_gadget = {
            Image: img,
            Name: nameNew,
            Model: modelNew,
            Price: parseFloat(priceNew),
            Quantity: parseInt(quantityNew),
            Status: (statusNew === "true"),
            IdCategory: parseInt(selectCategoryNew)
        };
        axios({
            method:'post',
            url: "https://webapplicationclient20230302194755.azurewebsites.net/Gadget/AddGadget",
            //url: "https://localhost:7020/Gadget/AddGadget",
            data: JSON.stringify(new_gadget),
            dataType: "dataType",
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
    function btnDell(id){
        if (window.confirm('Are you sure you want to delete?')) {
            axios({
                method:'post',
                url: "https://webapplicationclient20230302194755.azurewebsites.net/Gadget/RemoveGadgetbyId",
                data: JSON.stringify(id),
                dataType: "dataType",
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
    }
    const btnUpdateGadget = async (e)=>{
        if (window.confirm('Are you sure you want to update?'))
        {
            setForm2Inline('none');
            const formData = new FormData();
            formData.append("file", file);

            await axios.post('https://webapplicationclient20230302194755.azurewebsites.net/Gadget/UploadImg', formData, 
            { 
                headers: 
                { 
                    'Content-Type': 'multipart/form-data',
                    "Authorization": "Bearer " + window.sessionStorage.getItem('token')
                } 
            }) 
            .then(data => { 
                updateGadget(data.data)
            })
            .catch(error => { 
                updateGadget(imgUpdate);
                console.log(error.data);
            });  
        }
        
    }
    function updateGadget(img){
        console.log(statusUpdate==='true');
        let update_gadget = {
            Id: parseInt(idUpdate),
            Image: img,
            Name: nameUpdate,
            Model: modelUpdate,
            Price: parseFloat(priceUpdate),
            Quantity: parseInt(quantityUpdate),
            Sold: parseInt(soldUpdate),
            Status: (statusUpdate==='true'),
            IdCategory: parseInt(selectCategoryUpdate)
        };
        axios({
            method:'post',
            url: "https://webapplicationclient20230302194755.azurewebsites.net/Gadget/UpdateGadgetbyId",
            data: JSON.stringify(update_gadget),
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
    function btnFormAddCategory(){

        setForm3Inline('inline');
    }
    function addCategory(){
        let new_category = {
            name: nameCategoryNew
        }
        axios({
            method:'post',
            url: "https://webapplicationclient20230302194755.azurewebsites.net/Category/AddCategorys",
            data: JSON.stringify(new_category),
            dataType: "dataType",
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + window.sessionStorage.getItem('token')
            }
        })
        .then(data=>{
           window.location.reload();
        })
    }
    function dellCategory(id){
        if (window.confirm('Are you sure you want to delete?'))
        {
            axios({
                method:'post',
                url: "https://webapplicationclient20230302194755.azurewebsites.net/Category/RemoveCategorybyId",
                data: JSON.stringify(id),
                dataType: "dataType",
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
        
    }
    function handleChanges(event, newValue) {
        setRange(newValue);
    }
    function brandlFilter(){
        uniqueNames = Array.from(new Set(gadgets.map((item, index)=>(item.name))));
    }
    function getGadgetFilter()
    {
        let filter_gadget = 
        {
            nameModels: models,
            min: range[0],
            max: range[1],
        };
        console.log(filter_gadget)
        axios({
            method:'post',
            url: "https://webapplicationclient20230302194755.azurewebsites.net/Gadget/GetGadgetFilter",
            data: JSON.stringify(filter_gadget),
            dataType: "dataType",
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            }
        })
        .then(data=>
        {
            setGadgets(data.data);    
        });
        
    }
    function filterBtn(){
        let modelNames = document.getElementsByClassName("checkboxes");
        setModels([]);

        for (const item of modelNames)
        {
            if(item.checked)
            {
                models.push(item.id);
            }
        };
        getGadgetFilter();
    }
    function getGadgetsByName(name)
    {
        axios({
            method:'get',
            url: `https://webapplicationclient20230302194755.azurewebsites.net/Gadget/GetGadgetbyName?name=${name}`,
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            }
        })
        .then(data=>
        {
            setGadgets(data.data); 
        });
        
    }
    function clearSearch(){
        setSearch("");
    }
    return(
        <div className="App-header1">
            <div id="DivRegisAndLoginLinks">
                <div>
                    <Link className="link" to="/registManager">
                        Regist Manager 
                        <img src="https://alexstsorageblops.blob.core.windows.net/magic/create_black_24dp.svg" style={{width:'18px', height: '18px'}} alt="React Logo"></img>
                    </Link>
                    
                    <b className="RegisAndLoginLinks" > or </b>
                    <Link className="link" to="/login">
                        Login   
                        <img src="https://alexstsorageblops.blob.core.windows.net/magic/person_outline_black_24dp.svg" style={{width:'18px', height: '18px'}} alt="React Logo"></img>
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
                        <img id="logo-search" src="https://alexstsorageblops.blob.core.windows.net/magic/search.svg"></img>
                    </i>
                    <a id="clear-btn" onClick={()=>clearSearch()}>X</a>
                </div>
                <div onClick={()=>getOut()} style={{ cursor: 'pointer'}}>
                    <b className="link" id="out" >Out   </b>
                    <img src="https://alexstsorageblops.blob.core.windows.net/magic/logout_black_24dp.svg" style={{width:'18px', height: '18px'}} alt="React Logo"></img>
                </div>  
            </div>
            <br></br>
            <div style={{textAlign: 'center'}}>
                <span className="top" onClick={()=>window.location.href='/'}>STORE OF GADGETS</span>
            </div>
            <br></br>
            <div className="container-menu" id="container"  style={{cursor: 'pointer'}}>
                <div className = "name_category" style={{ borderBlockColor: 'yellow'}} onClick={() =>btnFormAddCategory()} >Add Category</div>
                <div className = "name_category" style={{ borderBlockColor: 'yellow'}} onClick={() =>btnFormAddGadget()} >Add Gadget</div>
                <div className = "name_category" style={{ borderBlockColor: 'yellow'}} onClick={() => window.location.reload()} >Show All</div>
            </div>
            <br></br>
            <div className="container-menu" id="container"  style={{cursor: 'pointer'}}>
                {getCategorys()}
                {
                    categories.map((item, index)=>(
                        <div key={index}  className = "name_category" id={item.id} onClick={() => getGadgetsById(item.id)}>
                        {item.name}
                        <button className ="Btn" id ="DellBtn" onClick={()=>dellCategory(item.id)} style={{marginLeft:'20px', marginTop: '-15px', position: 'absolute'}} >X</button>
                        </div>
                    ))
                } 
            </div>
            <br></br>
            <div id="container_for_form">
                <div id="form1" style={{display: form1Inline}}>
                    <br></br>
                    <button className ="Btn" id ="DellBtn" onClick={()=>setForm1Inline('none')} style={{marginLeft:'90px', marginTop: '-15px', position: 'absolute'}} >X</button>
                    <label>Image:</label>
                    <input type="file" className="file" onChange={saveFile} accept="image/*"></input>
                    <label>Brand:</label>
                    <input className="new_gadget" id="name_new_gadget" onChange={(e)=>{setNameNew(e.target.value)}}></input>
                    <label>Model:</label>
                    <input className="new_gadget" id="model_new_gadget" onChange={(e)=>{setModelNew(e.target.value)}}></input>
                    <label>Price:</label>
                    <input type='number' className="new_gadget" id="price_new_gadget" onChange={(e)=>{setPriceNew(e.target.value)}}></input>
                    <label>Quantity:</label>
                    <input type='number' className="new_gadget" id="quantity_new_gadget" onChange={(e)=>{setQuantityNew(e.target.value)}}></input>
                    <label>Status:</label>
                    <select id="status_new_gadget" defaultValue='true' onChange={(e)=>{setStatusNew(e.target.value)}}>
                        <option value="true">Enablet</option>
                        <option value="false">Disabled</option>
                    </select>
                    <label>Category:</label>
                    <select id="select_category" defaultValue="1" onChange={(e)=>{setSelectCategoryNew(e.target.value)}}>
                    {
                        categories.map((item, index)=>(
                            <option key={index} value={item.id}>
                            {item.name}
                            </option>
                    ))
                    }
                    </select>
                    <br></br>
                    <br></br>
                    <button className="btn_gadget" id="create_gadget" value="upload" onClick={() =>btnAddGadget()}>Add</button>
                    <br></br>
                    <br></br>
                </div>
                <div id="form2" style={{display: form2Inline}}>
                    <br></br>
                    <button className = "Btn" id = "DellBtn" onClick={()=>setForm2Inline('none')} style={{marginLeft:'90px', marginTop: '-15px', position: 'absolute'}}>X</button>
                    <label>Image:</label>
                    <input type="file" className="file" onChange={saveFile} accept="image/*"></input>
                    <label>Brand:</label>
                    <input className="new_gadget" id="name_update_gadget" value={nameUpdate} onChange={(e)=>{setNameUpdate(e.target.value)}}></input>
                    <label>Model:</label>
                    <input className="new_gadget" id="model_update_gadget" value={modelUpdate} onChange={(e)=>{setModelUpdate(e.target.value)}}></input>
                    <label>Price:</label>
                    <input type='number' className="new_gadget" id="price_update_gadget" value={priceUpdate} onChange={(e)=>{setPriceUpdate(e.target.value)}}></input>
                    <label>Quantity:</label>
                    <input type='number' className="new_gadget" id="quantity_update_gadget" value={quantityUpdate} onChange={(e)=>{setQuantityUpdate(e.target.value)}}></input>
                    <label>Sold:</label>
                    <input type='number' className="new_gadget" id="sold_update_gadget" value={soldUpdate} onChange={(e)=>{setSoldUpdate(e.target.value)}}></input>
                    <label>Status:</label>
                    <select id="status_update_gadget"  onChange={(e)=>{setStatusUpdate(e.target.value)}}>
                        <option value={'true'}>Enablet</option>
                        <option value={'false'}>Disabled</option>
                    </select>
                    <label>Category:</label>
                    <select id="select_update_category" defaultValue={selectCategoryUpdate} onChange={(e)=>{setSelectCategoryUpdate(e.target.value)}}>
                        {
                            categories.map((item, index)=>(
                                <option key={index} value={item.id}>
                                {item.name}
                                </option>
                            ))
                        }
                    </select>
                    <br></br>
                    <br></br>
                    <button className="btn_gadget" id="update_gadget" onClick={() =>btnUpdateGadget()}>Update</button>
                    <br></br>
                    <br></br>
                </div>
                <div id="form2" style={{display: form3Inline}}>
                    <br></br>
                    <button className = "Btn" id = "DellBtn" onClick={()=>setForm3Inline('none')} style={{marginLeft:'90px', marginTop: '-15px', position: 'absolute'}}>X</button>
                    <label>Category:</label>
                    <br></br>
                    <br></br>
                    <input className="new_gadget" id="name_new_gadget" onChange={(e)=>{setNameCategoryNew(e.target.value)}}></input>
                    <br></br>
                    <br></br>
                    <button className="btn_gadget" id="create_gadget" value="upload" onClick={() =>addCategory()}>Add</button>
                    <br></br>
                    <br></br>
                </div>
            </div>
            <br></br>
            <div className="columns-menu">
                <div className="col-left-siderbar">
                    <div className="range-class">
                        <b>Price</b>
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
                               <input type="checkbox" className="checkboxes" id={item}></input>
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
                            <th>Name</th>
                            <th>Model</th>
                            <th>Price ₴</th>
                            <th>Quantity</th>
                            <th>Sold</th>
                            <th>Enabled</th>
                            <th>Edit</th>
                        </tr>
                        {getAllGadgets()}
                        {
                        currentCard.map((item, index)=>(
                            <tr key={index} className = "row" id={item.id}>
                                <td><img className = "img_gadget-table"  src={item.image}></img></td>
                                <td className="cart_gadget-table">{item.name}</td>
                                <td className="cart_gadget-table">{item.model}</td>
                                <td className="cart_gadget-table">{item.price}₴</td>
                                <td className="cart_gadget-table">{item.quantity}</td>
                                <td className="cart_gadget-table">{item.sold}</td>
                                <td className="cart_gadget-table">{`${item.status}`}</td>
                                <td className="form_for_btns-table">
                                    <button className = "Btn" id = "UpdateBtn" onClick={()=>btnFormUpdate(
                                            item.id, 
                                            item.image, 
                                            item.name, 
                                            item.model, 
                                            item.price, 
                                            item.quantity, 
                                            item.sold, 
                                            item.status, 
                                            item.idCategory
                                        )}>Update</button>
                                    <button className = "Btn" id = "DellBtn" onClick={()=>btnDell(item.id)}>X</button>
                                </td>
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
                    totalCards={gadgets.length}
                    paginate={paginate}
                ></Paginationee>
            </div>
            <br></br>
        </div>
        
    );
}
export default Manager;