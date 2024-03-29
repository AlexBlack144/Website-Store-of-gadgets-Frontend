import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { Hosting } from '../components/Hosting.ts';
import '../cssFiles/style_for_manager.css';
import '../cssFiles/style_logo_text.css';
import Paginationee from "../components/Paginationee.js";
import Slider from "@mui/material/Slider";
import axios from "axios";
import React from "react";

function Manager(){
   
    const [host] = useState(new Hosting());

    const [nameCategoryNew, setNameCategoryNew] = useState('');
    const [nameNew, setNameNew] = useState('');
    const [descriptionNew, setDescriptionNew] = useState('');
    const [modelNew, setModelNew] = useState('');
    const [priceNew, setPriceNew] = useState('');
    const [quantityNew, setQuantityNew] = useState('');
    const [statusNew, setStatusNew] = useState('true');
    const [selectCategoryNew, setSelectCategoryNew] = useState('1');
    const [selectGadgetNew, setSelectGadgetNew] = useState('1');

    const [idUpdate, setIdUpdate] = useState(0);
    const [imgUpdate, setImgUpdate] = useState('');
    const [nameUpdate, setNameUpdate] = useState('');
    const [descriptionUpdate, setDescriptionUpdate] = useState('');
    const [modelUpdate, setModelUpdate] = useState(''); 
    const [priceUpdate, setPriceUpdate] = useState('');
    const [quantityUpdate, setQuantityUpdate] = useState('');
    const [soldUpdate, setSoldUpdate] = useState('');
    const [statusUpdate, setStatusUpdate] = useState('true');
    const [selectCategoryUpdate, setSelectCategoryUpdate] = useState('1');
    const [selectGadgetUpdate, setSelectGadgetUpdate] = useState('1');

    const [form1Inline, setForm1Inline] = useState('none');
    const [form2Inline, setForm2Inline] = useState('none');
    const [form3Inline, setForm3Inline] = useState('none');
    const [formBannerAdd, setFormBannerAdd] = useState('none');
    const [formBannerUpdate, setFormBannerUpdate] = useState('none');

    const [categories, setCategories] = useState([]);
    const [gadgets, setGadgets] = useState([]);
    const [flag, setFlag] = useState(0);
    const [file, setFile] = useState();

    const [currentPage, setCurrentPage] = useState(1);
    const [cardsPerPage, setcardsPerPage] = useState(5);
    
    var resGadgets = gadgets.sort(function (a, b) {
        if (a.idCategoryNavigation.name < b.idCategoryNavigation.name) {
          return -1;
        }
        if (a.idCategoryNavigation.name > b.idCategoryNavigation.name) {
          return 1;
        }
        return 0;
    });
    
    const paginate = pageNumber => setCurrentPage(pageNumber)
    const lastCardIndex = currentPage * cardsPerPage;
    const firstCardIndex = lastCardIndex - cardsPerPage;
    const currentCard = gadgets.slice(firstCardIndex, lastCardIndex);

    var uniqueNames = [];
    const [models, setModels] = useState([]);
    const [range, setRange] = React.useState([50, 100000]);
    const [search, setSearch] = useState("");
    const [current, setCurrent] = useState(0);
    const [banners, setBanners] = useState([]);
    const [gadgetBanner, setGadgetBanner] = useState([]);
 
    const nextSlide = () => {setCurrent(current === length - 1 ? 0 : current + 1);};
    const prevSlide = () => {setCurrent(current === 0 ? length - 1 : current - 1);};
    
    useEffect(() => {
        getBanners();
    },[]);

    if (!Array.isArray(banners) || banners.length <= 0) {return null;}
    const length = banners.length;
  
    const saveFile = (e)=>{
        setFile(e.target.files[0]);
    }
    function getAllGadgets(){
        
        if(flag == 0)
        {
            axios({
                method:'get',
                url: `https://${host.getHost()}/Gadget/GetGadgets`,
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
                url: `https://${host.getHost()}/Category/GetCategorys`,
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json'
                }
            })
            .then(data=>
            {
                console.log(data.data);
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
            url: `https://${host.getHost()}/Gadget/GetGadgetbyId_Category?id=${id}`,
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
        window.scrollTo({
            top: 550,
            left: 0,
            behavior: 'smooth',
        });
        setForm1Inline('inline');
    }
    function btnFormUpdate(id, img, name, description, model, price, quantity, sold, status, idCategory){
        window.scrollTo({
            top: 650,
            left: 0,
            behavior: 'smooth',
        });
        setIdUpdate(id);
        setImgUpdate(img);
        setNameUpdate(name);
        setModelUpdate(model);
        setDescriptionUpdate(description);
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

        await axios.post(`https://${host.getHost()}/Gadget/UploadImg`, formData, 
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
            Description: descriptionNew,
            Model: modelNew,
            Price: parseFloat(priceNew),
            Quantity: parseInt(quantityNew),
            Status: (statusNew === "true"),
            IdCategory: parseInt(selectCategoryNew)
        };
        axios({
            method:'post',
            url: `https://${host.getHost()}/Gadget/AddGadget`,
            data: JSON.stringify(new_gadget),
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
    function btnDell(id){
        if (window.confirm('Are you sure you want to delete?')) {
            axios({
                method:'post',
                url: `https://${host.getHost()}/Gadget/RemoveGadgetbyId`,
                data: JSON.stringify(id),
                dataType: "dataType",
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + window.sessionStorage.getItem('token')
                }
            })
            .then(data=>{
               console.log(data.data); 
               if(data.data.statusCode!=200)
               {
                alert('Your gadget is linked to the banner!');
               }
               else{
                    window.location.reload();
               }
               
            })
     
        } 
    }
    const btnUpdateGadget = async (e)=>{
        if (window.confirm('Are you sure you want to update?'))
        {
            const formData = new FormData();
            formData.append("file", file);

            await axios.post(`https://${host.getHost()}/Gadget/UploadImg`, formData, 
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
  
            });  
        }
        
    }
    function updateGadget(img){

        let update_gadget = {
            Id: parseInt(idUpdate),
            Image: img,
            Name: nameUpdate,
            Description: descriptionUpdate,
            Model: modelUpdate,
            Price: parseFloat(priceUpdate),
            Quantity: parseInt(quantityUpdate),
            Sold: parseInt(soldUpdate),
            Status: (statusUpdate==='true'),
            IdCategory: parseInt(selectCategoryUpdate)
        };
        axios({
            method:'post',
            url: `https://${host.getHost()}/Gadget/UpdateGadgetbyId`,
            data: JSON.stringify(update_gadget),
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
    function getOut(){
        if(window.sessionStorage.getItem('token')==null|| window.sessionStorage.getItem('token')=='null')
        {
            alert('You don`t login!');
        }
        else{
            

            window.sessionStorage.setItem('token', null)
            window.location.href = '/login';
        }
       
    }
    function btnFormAddCategory(){
        window.scrollTo({
            top: 550,
            left: 0,
            behavior: 'smooth',
        });
        setForm3Inline('inline');
    }
    function addCategory(){
        let new_category = {
            name: nameCategoryNew
        }
        axios({
            method:'post',
            url: `https://${host.getHost()}/Category/AddCategorys`,
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
                url: `https://${host.getHost()}/Category/RemoveCategorybyId`,
                data: JSON.stringify(id),
                dataType: "dataType",
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + window.sessionStorage.getItem('token')
                }
            })
            .then(data=>{
                if(data.data.statusCode!=400)
                {
                    window.location.reload();
                }
                else{
                    alert("Gadgets are tied to this category!");
                }
                
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
  
        axios({
            method:'post',
            url: `https://${host.getHost()}/Gadget/GetGadgetFilter`,
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
            url: `https://${host.getHost()}/Gadget/GetGadgetbyName?name=${name}`,
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            }
        })
        .then(data=>
        {
            setGadgets(data.data);
            window.scrollTo({
                top: 600,
                left: 0,
                behavior: 'smooth',
            }); 
        });
        
    }
    function clearSearch(){
        setSearch("");
    }
    function getBanners(){
        axios({
            method:'get',
            url: `https://${host.getHost()}/Banner/GetBanners`,
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            }
        })
        .then(data=>
        {
            setBanners(data.data); 
          
        });    
    }
    function addBannerForm(){
        window.scrollTo({
            top: 550,
            left: 0,
            behavior: 'smooth',
        });
        setFormBannerAdd('inline');
    }
    const btnAddBanner = async (e)=>{
        if(selectGadgetNew!='1'){
        const formData = new FormData();
        formData.append("file", file);

        await axios.post(`https://${host.getHost()}/Banner/UploadImg`, formData, 
        { 
            headers: 
            { 
                'Content-Type': 'multipart/form-data',
                "Authorization": "Bearer " + window.sessionStorage.getItem('token')
            } 
        }) 
        .then(data => {
           
            addBanner(data.data)
        })
        .catch(error => { console.log(error.data)}); 
        }
        else{
            alert("You need select gadget!")
        }
        
    }
    function addBanner(img) {
        let new_banner = {
            id: 0,
            fkGadgetsId: selectGadgetNew,
            imgUrl: img
        };
        axios({
            method:'post',
            url: `https://${host.getHost()}/Banner/AddBanner`,
            data: JSON.stringify(new_banner),
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
    function updateBannerForm(id,imgUrl,idGadget,brand,model){
        window.scrollTo({
            top: 550,
            left: 0,
            behavior: 'smooth',
        });
        let gadget_banner = {
            id: id,
            imgUrl: imgUrl,
            idGadget: idGadget,
            brand: brand,
            model: model
        };
        setGadgetBanner(gadget_banner);
        setFormBannerUpdate('inline');
    }
    const btnUpdateBanner = async (e)=>{
        if (window.confirm('Are you sure you want to update?')){
            
            setFormBannerUpdate('none');
            const formData = new FormData();
        formData.append("file", file);

            await axios.post(`https://${host.getHost()}/Banner/UploadImg`, formData, 
            { 
            headers: 
            { 
                'Content-Type': 'multipart/form-data',
                "Authorization": "Bearer " + window.sessionStorage.getItem('token')
            } 
            }) 
            .then(data => { 
                updateBanner(data.data)
            })
            .catch(error => {
                updateBanner(gadgetBanner.imgUrl);
                
            });  
                    
                  
        }

    }
    function updateBanner(img){
        let GadgetId = selectGadgetUpdate;
        if(GadgetId=='1'){
            GadgetId = gadgetBanner.idGadget;
        }
        let update_banner = {
            id: gadgetBanner.id,
            fkGadgetsId: GadgetId,
            imgUrl: img
        };
        axios({
            method:'post',
            url: `https://${host.getHost()}/Banner/UpdateBannerbyId`,
            data: JSON.stringify(update_banner),
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
    function dellBanner(id){
        if(banners.length>1){
            if (window.confirm('Are you sure you want to delete?'))
            {
                
                axios({
                    method:'post',
                    url: `https://${host.getHost()}/Banner/RemoveBannerbyId`,
                    data: JSON.stringify(id),
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
        }
        else{
            alert("You can't delete the last banner!");
        }
        
    }
    function goCharPage(id){
        if(resGadgets.find(item => item.id === id && item.status === true))
        {
            window.location.href=`/characteristic/${id}`  
        }
        else{
            alert("Status Disable!");
        }
    }
    
    return(
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
            <br></br>
            <div id="baner">
                <section className='slider'>
                    <img className='left-arrow' src="https://web-design-kursak.s3.eu-west-2.amazonaws.com/arrow_forward_ios_black_24dp.svg"onClick={prevSlide}></img>
                    <img className='right-arrow'src="https://web-design-kursak.s3.eu-west-2.amazonaws.com/arrow_forward_ios_black_24dp.svg" onClick={nextSlide}></img>
                    {banners.map((slide, index) => {
                    return(
                        <div id="banner" className={index === current ? 'slide active' : 'slide'} key={index}>
                                <button className = "Btn" id = "DellBtn" onClick={()=>dellBanner(slide.id)}>X</button>
                                {index === current && (<img src={slide.imgUrl} onClick={()=>updateBannerForm(slide.id,slide.imgUrl,slide.fkGadgetsId,slide.fkGadgets.name,slide.fkGadgets.model)} alt='travel image' className='image' />)}
                                <span id="IdBanner">{current+1}</span>  
                            </div>
                    );})}
                </section>
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
                <div className = "name_category" style={{ borderBlockColor: 'yellow'}} onClick={() =>btnFormAddCategory()} >Add Category</div>
                <div className = "name_category" style={{ borderBlockColor: 'yellow'}} onClick={() =>btnFormAddGadget()} >Add Gadget</div>
                <div className = "name_category" style={{ borderBlockColor: 'yellow'}} onClick={() =>addBannerForm()} >Add Banner</div>
                <div className = "name_category" style={{ borderBlockColor: 'yellow'}} onClick={() => window.location.reload()} >Show All</div>
                <div className = "name_category" style={{ borderBlockColor: 'yellow'}} onClick={() => window.location.href='/History'} >Purchase history</div>
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
                    <label>Series:</label>
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
                    <label>Description:</label>
                    <textarea className="new_gadget" id="description_update_gadget" value={descriptionNew} onChange={(e)=>{setDescriptionNew(e.target.value)}}></textarea>
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
                    <label>Series:</label>
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
                    <select id="status_update_gadget" defaultValue="none" onChange={(e)=>{setStatusUpdate(e.target.value)}}>
                        <option value="none"></option>
                        <option value="true">Enablet</option>
                        <option value="false">Disabled</option>
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
                    <label>Description:</label>
                    <textarea className="new_gadget" id="description_update_gadget" value={descriptionUpdate} onChange={(e)=>{setDescriptionUpdate(e.target.value)}}></textarea>
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

                <div id="form1" style={{display: formBannerAdd, width:'300px'}}>
                    <br></br>
                    <button className ="Btn" id ="DellBtn" onClick={()=>setFormBannerAdd('none')} style={{marginLeft:'110px', marginTop: '-15px', position: 'absolute'}} >X</button>
                    <br></br>
                    <input type="file" className="file" onChange={saveFile} accept="image/*"></input>
                    <br></br>
                    <br></br>
                    <label>Gadget: </label>
                    <select id="select_category" defaultValue="1" onChange={(e)=>{setSelectGadgetNew(e.target.value)}}>
                    {<option></option>}
                    {    
                        resGadgets.map((item, index)=>(
                            <option key={index} value={item.id}>
                                {item.idCategoryNavigation.name+': '+item.name+': '+item.model}
                            </option>
                        ))
                    }
                    </select>
                    <br></br>
                    <br></br>
                    <button className="btn_gadget" id="create_gadget" value="upload" onClick={() =>btnAddBanner()}>Add</button>
                    <br></br>
                    <br></br>
                </div>
                <div id="form2" style={{display: formBannerUpdate, width:'300px'}}>
                <br></br>
                    <button className ="Btn" id ="DellBtn" onClick={()=>setFormBannerUpdate('none')} style={{marginLeft:'110px', marginTop: '-15px', position: 'absolute'}}>X</button>
                    <br></br>
                    <input type="file" className="file" onChange={saveFile} accept="image/*"></input>
                    <br></br>
                    <br></br>
                    <label>Old Gadget: </label>
                    <br></br>
                    <b className="oldGadgetName" onClick={()=>goCharPage(gadgetBanner.idGadget)}>{gadgetBanner.brand}: {gadgetBanner.model} </b>
                    <br></br>
                    <br></br>
                    <label>New Gadget: </label>
                    <select id="select_gadget" onChange={(e)=>{setSelectGadgetUpdate(e.target.value)}}>
                    {
                        <option></option>
                    }
                    {    
                        resGadgets.map((item, index)=>(
                            <option key={index} value={item.id}>
                                {item.idCategoryNavigation.name+': '+item.name+': '+item.model}
                            </option>
                        ))
                    }
                    </select>
                    <br></br>
                    <br></br>
                    <button className="btn_gadget" id="create_gadget" value="upload" onClick={() =>btnUpdateBanner()}>Update</button>
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
                    <b>Series</b>
                    <br></br>
                    <br></br>
                    <div style={{overflowY:'scroll', maxHeight:'200px'}}>
                        {brandlFilter()}
                        {
                            uniqueNames.map((item, index)=>(
                                <div key={index} style={{marginBottom: '10px'}}>
                                <input type="checkbox" className="checkboxes" id={item}></input>
                                    {item}
                                </div>))
                        }
                    </div>
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
                            <tr key={index} className = "row" id={item.id} style={{cursor:'pointer'}}>
                                <td><img className = "img_gadget-table" onClick={()=>goCharPage(item.id)} src={item.image}></img></td>
                                <td className="cart_gadget-table" onClick={()=>goCharPage(item.id)}>{item.name}</td>
                                <td className="cart_gadget-table" onClick={()=>goCharPage(item.id)}>{item.model}</td>
                                <td className="cart_gadget-table" onClick={()=>goCharPage(item.id)}>{item.price}₴</td>
                                <td className="cart_gadget-table" onClick={()=>goCharPage(item.id)}>{item.quantity}</td>
                                <td className="cart_gadget-table" onClick={()=>goCharPage(item.id)}>{item.sold}</td>
                                <td className="cart_gadget-table" onClick={()=>goCharPage(item.id)}>{`${item.status}`}</td>
                                <td className="form_for_btns-table">
                                    <button className = "Btn" id = "UpdateBtn" onClick={()=>btnFormUpdate(
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