import React from "react";
import "./style.css"

export default function index() {
  return (
    <div className="body">

      <div className="container">
      <img src="./1.jpg" className="image"/>
      <div className="section1">
        <a href="/register" >
          <button className="register"> Register</button>
        </a>
        <a href="/login">
          <button className="login"> Login</button>
        </a>
      </div>
      </div>
      
    </div>
  )
}
