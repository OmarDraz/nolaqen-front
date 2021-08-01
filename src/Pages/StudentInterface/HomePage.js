import React from 'react';
import RegisterPage from './RegisterPage';
import LoginPage from './LoginPage';
import Logout from '../../Components/logout';
import jwt_decode from 'jwt-decode';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import Header from '../../Components/Header';

const HomePage = ()=>{
    return(
      <div>
        <div>Home</div>
      </div>
    )
}

export default HomePage;