import React, { useState } from "react";
import axiosInstance from "../../axios";
import { useHistory, Link } from "react-router-dom";
import Cookies from 'js-cookie'
//MaterialUI
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import login from '../../svg/Login.svg';
import balls from '../../svg/Balls.svg';
import '../css/login.css';


const useStyles = makeStyles((theme) => ({
  root: {
      "& .MuiFormLabel-root": {
          color: "rgba(0, 0, 0, 0.54)", // or black
          fontFamily: "Cairo",
          left: 'auto',
          overflow: 'hidden',
          height: '20px',
          margin: '0px 12px'
        },
      "& .MuiSelect-select": {
          height: '27px'
      },
      "& .MuiInputBase-input": {
          fontFamily: 'Cairo'
      },
      "& .MuiFormControl-root": {
          flexDirection: 'row !important'
      },
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
  dialog: {
      "& .MuiDialog-paperWidthSm": {
          width: '700px'
      }
  },
}));


export default function SignIn() {
  const classes = useStyles()
  const history = useHistory();
  const initialFormData = Object.freeze({
    phone: "",
    password: "",
  });

  const [formData, updateFormData] = useState(initialFormData);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    axiosInstance
      .post(`users/login/`, {
        phone: formData.phone,
        password: formData.password,
      })
      .then((res) => {
        Cookies.set("access_token", res.data.access);
        Cookies.set("refresh_token", res.data.refresh);
        axiosInstance.defaults.headers["Authorization"] =
          "JWT " + Cookies.get("access_token");
        history.push("/redirect");
        //console.log(res);
        //console.log(res.data);
        console.log(Cookies.get("access_token"));
      })
  };
  return (
    <div>
      <Container  component="main" >
        <img src={balls} className="balls" />
        <div className="container">
          <div className="form">
            <span style={{ fontSize: '28px' }}>تسجيل الدخول</span>
            <TextField name="phone"  className={classes.root} onChange={handleChange} style={{ width: '300px' }} label="رقم الهاتف" />
            <TextField name="password" className={classes.root}  type="password" onChange={handleChange} style={{ width: '300px' }} label="كلمة السر" />
            <Button onClick={handleSubmit} style={{ margin: '22px', backgroundColor: '#FF5856', color: 'white' }} variant="contained">دخول</Button>
            <div>
                <span>ليس لدي حساب</span>
                <Button component={Link} to="/register" variant="text" color="primary">سجل الان</Button>
            </div>
          </div>
          <div className="loginSVG">
            <img src={login} />
          </div>
        </div>
      </Container>
    </div>
  );
}
