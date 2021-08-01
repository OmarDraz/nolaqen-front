import React from 'react'
import Cookies from 'js-cookie'
import jwt_decode from "jwt-decode";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
  } from "react-router-dom";

export default function Redir(){
  if(Cookies.get("access_token")){
    var token = Cookies.get('access_token');
    var decoded = jwt_decode(token);
    if(decoded.role == 'student'){
      return <Redirect to="student/courses" />
    } else {
      return <Redirect to="teacher/logs" />
    }
  }
}