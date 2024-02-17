import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Hosting } from '../components/Hosting.ts';
import { useClipboard } from 'use-clipboard-copy';
import { myBasketGadjets } from '../components/myBasketGadjets.ts';
import {DislikeOutlined, LikeOutlined} from "@ant-design/icons";

import axios from "axios";
import '../cssFiles/style_characteristic.css';
import '../cssFiles/style_logo_text.css';
import Purchases from '../components/Purchases.js';
import BasketGadjeds  from '../components/BasketGadjeds.js';
import Comments from "../components/Comments.js";

export default function Сharacteristic(){
    const {idGadget} = useParams();
    const [gadget, setGadget] = useState([]);
    const [gadgetCommentsLikeDislike, setGadgetCommentsLikeDislike] = useState([]);
    const [host] = useState(new Hosting());
    const [purchasesFormInline, setPurchasesFormInline] = useState('none');
    const [purchases,setPurchases] = useState([]);
    const [basketCount, setBasketCount] = useState(0);
    const [basketFormInline, setBasketFormInline] = useState('none');
    const [baskeGadgets, setBaskeGadgets] = useState([]);
    const clipboard = useClipboard();
    const [itemsFromLocalStorage, setItemsFromLocalStorage] = useState([]);
    const [countLikes, setCountLikes] = useState([]);
    const [countDis, setCountDis] = useState([]);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [userIdLikeOrDis, setUserIdLikeOrDis] = useState("");
    const [btnLike, setBtnLike] = useState("")
    const [btnDis, setBtnDis] = useState("")
    const [btnLike2, setBtnLike2] = useState("")
    const [btnDis2, setBtnDis2] = useState("")
    const [userId, setUserId] = useState("");

    function getUserId(){
        axios({
            method:'get',
            url: `https://${host.getHost()}/User/GetUserId`,
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + window.sessionStorage.getItem('token'),
            }
        })
        .then(data=>
        {
            setUserId(data.data);    
        })    
    }
    function getGadgetById(Id){ 
        axios({
            method:'get',
            url: `https://${host.getHost()}/Gadget/GetGadgetbyId?id=${Id}`,
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            }
        })
        .then(data=>
        {
            setGadget(data.data);    
        })
        
    }
    function getCommentsLikesDisByIdGadget(Id){
        axios({
            method:'get',
            url: `https://${host.getHost()}/GadgetCommentsLikeDislike/GetCommentsLikesDisByIdGadget?id=${Id}`,
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            }
        })
        .then(data=>
        {
            setGadgetCommentsLikeDislike(data.data);    
        })    
    }
    function copyNumber(copy) {
        clipboard.copy(copy);
        alert('Сopied: '+copy);
    }
    function getMyPurchase(){
      
        axios({
            method:'get',
            url: `https://${host.getHost()}/Purchase/GetPurchaseByUserId`,
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
    function getOut(){
        if(window.sessionStorage.getItem('token')==null|| window.sessionStorage.getItem('token')=='null')
        {
            alert('You are not logged in!');
        }
        else{
            
            
            window.sessionStorage.setItem('token', null)
            window.location.href = '/login';
        }
       
    }
    function basket(id, img, name, description, model, price, quantity, sold, status, idCategory){  
        baskeGadgets.push(new myBasketGadjets(id, img, name, description, model, price, quantity, sold, status, idCategory, 1))
    }
    function refreshBasket(){
        baskeGadgets.push(new myBasketGadjets(999999, "image", "name", "description","model", 0, 0, 0, "status", 1))
        setBaskeGadgets(baskeGadgets.filter(item => item.id != 999999));
        setToLocalStorageGadgets(baskeGadgets.filter(item => item.id != 999999));
    }
    function changeBasketCount(Count){
        setBasketCount(basketCount+Count);
    }
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
    function btnBasketDell(id){
        setBaskeGadgets(baskeGadgets.filter(item => item.id != id));
        if(basketCount==1)
        {
            setBasketCount(basketCount-1);
            setBasketFormInline('none');
            localStorage.setItem('basketGadgets', JSON.stringify([]));
        }
        else{
            setBasketCount(basketCount-1);
            setToLocalStorageGadgets(baskeGadgets.filter(item => item.id != id));
        }
    }
    function btnDellComment(id){
       
        let set_id = {
            id: id
        }
        axios({
            method:'post',
            url: `https://${host.getHost()}/GadgetCommentsLikeDislike/DeleteComment`,
            data: JSON.stringify(set_id),
            dataType: "dataType",
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + window.sessionStorage.getItem('token')
            }
        })
        .then(data=>{
            getCommentsLikesDisByIdGadget(idGadget);
            getComments();
        })   
    }
    function setToLocalStorageGadgets(baskeGadgets){
        localStorage.setItem('basketGadgets', JSON.stringify(baskeGadgets));
        
    }
    function setLikeOrDis(like,dis){
        let set_like = {
            gadgetId: gadget['id'],
            like:like,
            dis:dis,
        }
        axios({
            method:'post',
            url: `https://${host.getHost()}/GadgetCommentsLikeDislike/AddLikeOrDis`,
            data: JSON.stringify(set_like),
            dataType: "dataType",
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + window.sessionStorage.getItem('token')
            }
        })
        .then(data=>{
            getCommentsLikesDisByIdGadget(idGadget);
            getLikes();
            getDis();
        })
    }
    function setComment(comment){

        if(comment!="")
        {
            let set_comment = {
                id: 0,
                gadgetId: gadget['id'],
                comment:comment,
            }
            axios({
                method:'post',
                url: `https://${host.getHost()}/GadgetCommentsLikeDislike/AddComment`,
                data: JSON.stringify(set_comment),
                dataType: "dataType",
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + window.sessionStorage.getItem('token')
                }
            })
            .then(data=>{
                getCommentsLikesDisByIdGadget(idGadget);
                getComments();
            })   
        }
        setNewComment("");
        
    }
    function getLikes(){
        setCountLikes(gadgetCommentsLikeDislike.filter(item=>item.isLiked == true));
    }
    function getDis(){
        setCountDis(gadgetCommentsLikeDislike.filter(item=>item.isDisliked == true));
        
    }
    function getComments(){
        setComments(gadgetCommentsLikeDislike.filter(item=>item.comment != "").sort((a, b) => b.id - a.id)); 
    }
    function getUserIdLikeOrDis(){
        console.log(idGadget);
        
        axios({
            method:'post',
            url: `https://${host.getHost()}/User/GetUserIdLikeOrDis`,
            data: JSON.stringify(idGadget),
            dataType: "dataType",
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + window.sessionStorage.getItem('token')
            }
        })
        .then(data=>
        {
            setUserIdLikeOrDis(data.data); 
            
        })        
    }
    function checkLikeOrDis(){
        getUserIdLikeOrDis();
        if(userIdLikeOrDis=="Like")
        {
            setBtnLike("#000000");
            setBtnLike2("white");
            setBtnDis("");
            setBtnDis2("");
        }
        else if(userIdLikeOrDis=="Dislike")
        {
            setBtnDis("#000000");
            setBtnDis2("white");
            setBtnLike("");
            setBtnLike2("");
        }
        else{
            setBtnLike(""); 
            setBtnLike2("");
            setBtnDis("");
            setBtnDis2("");
        }
        console.log(userIdLikeOrDis);
    }
    
    useEffect(() => {
        checkLikeOrDis();
    });
    useEffect(() => {
        if(JSON.parse(localStorage.getItem('basketGadgets'))){
            const items = JSON.parse(localStorage.getItem('basketGadgets'));
            setItemsFromLocalStorage(items);
            changeBasketCount(items.map((item, index)=>(item.id)).length);
            items.map((item, index)=>(
                baskeGadgets.push(new myBasketGadjets(item.id, item.image, item.name, item.description, item.model, item.price, item.quantity, item.sold, item.status, item.idCategory, item.count))
        ));
        
        }  
    }, []);
    useEffect(() => {
        getGadgetById(idGadget);
    }, []);
    useEffect(() => {
        getCommentsLikesDisByIdGadget(idGadget);
        getUserId();
    }, []);
    useEffect(() => {  
        getLikes();
        getDis();
        getComments();
    },[gadgetCommentsLikeDislike]);
return(
    <div className="App1">
        <div className="App-header1">
            <br></br>
            
            <div id="DivRegisAndLoginLinks">
                    <div>
                        <Link className="link" to="/regist">
                            Regist  
                            <img src="https://web-design-kursak.s3.eu-west-2.amazonaws.com/create_black_24dp+(1).svg" style={{width:'18px', height: '18px'}}></img>
                        </Link>
                        
                        <b className="RegisAndLoginLinks" > or </b>
                        <Link className="link" to="/login">
                            Login   
                            <img src="https://web-design-kursak.s3.eu-west-2.amazonaws.com/person_outline_black_24dp+(1).svg" style={{width:'18px', height: '18px'}}></img>
                        </Link>
                        
                    </div>

                    <div id="purchases" onClick={()=>{
                    if(window.sessionStorage.getItem('token')==null || window.sessionStorage.getItem('token')=='null')
                    {   
                        alert("You need to Login!")
                    }
                    else{
                            getMyPurchase(); 
                            setPurchasesFormInline('inline');
                            // getG(); 

                        }}} style={{ cursor: 'pointer', position: 'absolute', right: '130px'}}>
                        <b className="link" id="purchases">History</b>
                        <img src="https://web-design-kursak.s3.eu-west-2.amazonaws.com/shopping_bag_black_24dp.svg" style={{width:'18px', height: '18px'}}></img>
                    </div>

                    <div id="basket" onClick={()=>{if(basketCount!=0){setBasketFormInline('inline')}}} style={{ cursor: 'pointer', position: 'absolute', right: '70px'}}>
                        <b className="link" id="basket">{basketCount}</b>
                        <img src="https://web-design-kursak.s3.eu-west-2.amazonaws.com/basket+(1).svg" style={{width:'18px', height: '18px'}}></img>
                    </div>

                    <div id="out" onClick={()=>getOut()} style={{ cursor: 'pointer'}}>
                        <b className="link" id="out" >Out   </b>
                        <img src="https://web-design-kursak.s3.eu-west-2.amazonaws.com/logout_black_24dp+(1).svg" style={{width:'18px', height: '18px'}}></img>
                    </div>
                    
            </div>
            <div id="BasketAndPurchases">
                <BasketGadjeds
                    baskeGadgets={baskeGadgets}
                    btnBasketDell={btnBasketDell}
                    basketFormInline={basketFormInline}
                    setBasketFormInline={setBasketFormInline}
                    refreshBasket={refreshBasket}
                    setToLocalStorageGadgets={setToLocalStorageGadgets}
                ></BasketGadjeds>
                <Purchases
                    purchasesFormInline={purchasesFormInline}
                    setPurchasesFormInline={setPurchasesFormInline}
                    purchases={purchases}
                    setPurchases={setPurchases}              
                ></Purchases>
            </div>
            <div className="columns-menu">
                <div className="cart" id={gadget['id']} style={{width:'45%', height: '200%'}}>
                    <div className="gadget_characteristic"><b>{gadget['name']}</b></div>
                    <div className="gadget_characteristic">{gadget['model']}</div>
                    <br></br>
                    <img className="img_characteristic"src={gadget['image']}></img>
                </div>
                <div className="gadget_description">
                    <div className="gadget_characteristic"><b>Description</b></div>
                    <br></br>
                    <div className="gadget_characteristic">{gadget['description']}</div>
                    <br></br>
                    <br></br>
                    <div className="columns-menu" style={{justifyContent:'center'}}>
                        <div className="gadget_characteristic"><b>{gadget['price']} ₴</b></div>
                        <div style={{marginLeft: '100px'}}>
                            <button id="Like" style={{backgroundColor: btnLike, color:btnLike2}} onClick={()=>setLikeOrDis(true,false)}><LikeOutlined/>{countLikes.length}</button>                            
                            <button id="Dislike" style={{backgroundColor: btnDis,color:btnDis2}} onClick={()=>setLikeOrDis(false,true)}><DislikeOutlined/>{countDis.length}</button>
                            
                        </div>
                        <button className="BuyBtn" style={{width:'100px', height: '50px'}} onClick={()=>buyBtn(
                            gadget['id'],
                            gadget['image'],
                            gadget['name'],
                            gadget['description'],
                            gadget['model'],
                            gadget['price'],
                            gadget['quantity'],
                            gadget['sold'],
                            gadget['status'],
                            gadget['idCategory'])}>Buy</button>
                        
                    </div>
                </div>
            </div>
            <div id="commentForm">
                <div className="commentBox">
                    <h3>Comment</h3>
                    <textarea value={newComment} onChange={(e)=>{setNewComment(e.target.value)}}/>
                    <br></br>
                    <button className="SubmitBtn" onClick={()=>setComment(newComment)}>Submit</button>
                </div>
                <br></br>
                <Comments
                    gadgetComments = {comments}
                    btnDell = {btnDellComment}
                    userId = {userId}
                ></Comments>
                
            </div>
            <br></br>
            <div className="end-page">
                    <div className="numbers-and-socials-links">
                        <br></br>
                        {/*<span className="top" onClick={()=>window.location.href='/'}>STORE OF GADGETS</span>*/}
                        <div className="main-container2"onClick={()=>(window.location.href='/')}>
                            <div class="first-container share">
                                <h1 style={{fontSize:'2vw'}}><span id="one">I</span><span>S</span><span>T</span><span>O</span> <span>R</span><span>E</span></h1>
                            </div>
                        </div> 
                        <br></br>
                        <h3>Contacts:</h3>
                        <p onClick={()=>copyNumber("0800210186")}>0 800 210 186</p>
                        <p onClick={()=>copyNumber("0443336352")}>044 333-63-52</p>
                        <p onClick={()=>copyNumber("0671530508")}>(067) 153-05-08</p>
                        <p onClick={()=>copyNumber("0632334950")}>(063) 233 49 50</p>
                        <br></br>
                        <Link to="https://www.facebook.com/alex.black.one/">
                            <img className="social-logo" style={{width: '10px', height:'20px'}} src="https://web-design-kursak.s3.eu-west-2.amazonaws.com/facebook.png" alt="normal"/>
                        </Link>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Link to="https://www.instagram.com/alexeycherniy/">
                            <img className="social-logo" style={{width: '20px', height:'20px'}} src="https://web-design-kursak.s3.eu-west-2.amazonaws.com/instagram.png" alt="normal"/>
                        </Link>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Link to="https://www.tiktok.com/@alexeycherniy1">
                            <img className="social-logo" style={{width: '15px', height:'20px'}} src="https://web-design-kursak.s3.eu-west-2.amazonaws.com/tiktok.png"/>
                        </Link>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Link to="https://www.youtube.com/@AlexBlackOne1">
                            <img className="social-logo" style={{width: '25px', height:'20px'}} src="https://web-design-kursak.s3.eu-west-2.amazonaws.com/youtube.png" alt="normal" />
                        </Link>
                        <br></br>
                        <br></br>
                    </div>
                    <div className="about-us" style={{marginTop: "70px", color: 'white'}}>
                        <h3>About us:</h3>
                        <p>We are a new super cool company!!!</p>
                        <p>We are the best super cool company!!!</p>
                        <p>We have the cheapest and original gadgets!!!</p>
                        <p>Don't pass by!!!</p>
                    </div>
                    <div className="addresses" style={{marginTop: "70px", color: 'white'}}>
                        <h3>Addresses:</h3>
                        <Link style={{color: 'white'}} className="link" to="https://www.google.com/maps/place/Днепр,+Днепропетровская+область,+49000/@48.4622131,34.8599289,11z/data=!3m1!4b1!4m6!3m5!1s0x40dbe303fd08468f:0xa1cf3d5f2c11aba!8m2!3d48.464717!4d35.046183!16zL20vMDN4NDVw">
                            <p >Ukraine, Dnipro, 49000</p>
                        </Link>
                        <p onClick={()=>copyNumber("alexblack144@gmail.com")}>alexblack144@gmail.com</p>
                    </div>
                    <div className="end-text" style={{position: 'absolute', marginTop: '280px', color: 'white'}}>
                        © Store of gadgets 2023 - Online store of equipment Dnipro, Ukraine.
                    </div>
                
            </div>
        </div>
    </div>
)

}