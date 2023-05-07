import { Link } from "react-router-dom";
import '../cssFiles/style_for_login_regist.css';
import { createElement, useEffect, useState } from 'react';
import axios from "axios";

export default function Login() {
let UserOrManager = document.getElementById('UserOrManager');
const [login, setLogin] = useState("");
const [pass, setPass] = useState("");

function Log()
{
    axios({
        method:'post',
        url: "https://webapplicationclient20230302194755.azurewebsites.net/api/Authentication/login",
        data: {
            "userName": login,
            "password": pass
        },
        dataType: "dataType",
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Accept': '*/*',
            'Content-Type': 'application/json'
        }
    })
    .then(data=>{
        window.sessionStorage.setItem('token', data['data']['token']);
        if(window.sessionStorage.getItem('token')!=null)
        { 
            if(UserOrManager.value == "User")
            {
                window.location.href='/';
            }
            else{window.location.href='/Manager';}
        }
    }).catch(error => { alert("Errore")});
    console.log(window.sessionStorage.getItem('token'));
    
    
}

return (
    <div className="App">
      <header className="App-header">

      <Link className="link" id="Back_to_main_link" to='/'>
        Back to Store
      </Link>
      <h1>Login</h1>
        <div id="container_for_login_form">
            <div id="form_login">

                <label>Login:</label>
                <input className="login_pass" onChange={(e)=>{setLogin(e.target.value)}} id="login"></input>

                <br></br>

                <label>Password:</label>
                <input className="login_pass" onChange={(e)=>{setPass(e.target.value)}} id="pass" type='password'></input>

                <br></br>

                <select id="UserOrManager">
                    <option defaultValue="User">User</option>
                    <option value="Manager">Manager</option>
                </select>

                <br></br>
                
                <button id='Btn' className="btn_login_regist" onClick={Log}> Login </button>

                <br></br>
                <Link className="link" to='/regist'>Registration</Link>
            </div>
        </div>
      </header>
    </div>
    
    );
}