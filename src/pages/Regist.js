import { Link } from "react-router-dom";
import { createElement, useState } from 'react';
import axios from "axios";
import { fontSize } from "@mui/system";
export default function Regist() {

const [login, setLogin] = useState("");
const [email, setEmail] = useState("");
const [pass, setPass] = useState("");
const [pass2, setPass2] = useState("");

  function Register()
  {
    if(login!="")
    {
      if(email.includes('@')&& email.includes('.'))
      {
        if(pass==pass2&&pass!="")
        {
          axios({
            method:'post',
            url: "https://webapplicationclient20230302194755.azurewebsites.net/api/Authentication/regUser",
            data: {
                "userName": login,
                "password": pass,
                "email": email
            },
            dataType: "dataType",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Accept': '*/*',
                'Content-Type': 'application/json'
            }
          })
        .then((data)=>{
          alert(data.data);
          if(data.data=="User added!")
          {
            window.location.href='/login';
          }
        }).catch(error => { alert("Errore")});
          
        }
        else{alert("Passwords not corect!")}
      }
      else{alert("Not corect Email!")}
    }
    else{alert("You need Login!")}
  }

    return (
    <div className="App">
      <header className="App-header">

        <Link className="link" id="Back_to_main_link" to='/'>Back to Store</Link>

        <h1>Registration</h1>

          <div id="container_for_login_form">
              <div id="form_login">

                <label>Login:</label>
                <input className="Input" onChange={(e)=>{setLogin(e.target.value)}} id="login"></input>
                <br></br>
                <label>Email:</label>
                <input className="Input" onChange={(e)=>{setEmail(e.target.value)}} id="email"></input>
                <br></br>
                <label>Password:</label>
                <div style={{color:'gray', fontSize: '11px', display: "flex"}}>
                  <p>Capital letters</p>
                  <p>Latin letters</p>
                  <p>Use Numbers</p>
                  <p>Use !_#</p>
                  <p>Min 6 characters</p>
                </div>
                <input className="Input" onChange={(e)=>{setPass(e.target.value)}} id="pass" type='password'></input>
                <br></br>
                <label>Password again:</label>
                <input className="Input" onChange={(e)=>{setPass2(e.target.value)}} id="pass2" type='password'></input>
                <br></br>
                <button id='Btn' className="btn_login_regist" onClick={Register}> Register </button>
                <br></br>
                <Link className="link" to='/login'>Login</Link>
              </div>
          </div>

      </header>
    </div>
    
    );
}