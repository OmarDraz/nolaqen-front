import React, { useState, useEffect } from "react";
import {
  BrowserRouter as
  NavLink,
  Link,
} from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Cookies from 'js-cookie'
import jwt_decode from "jwt-decode";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import FacebookIcon from "@material-ui/icons/Facebook";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import HomeIcon from "@material-ui/icons/Home";
import EmailIcon from "@material-ui/icons/Email";
import InfoIcon from "@material-ui/icons/Info";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import MenuOpenIcon from "@material-ui/icons/MenuOpen";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Logo from '../svg/nolaqen.svg'

import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  Typography,
  Divider,
} from "@material-ui/core";
import "./header.css";
import axiosInstance from "../axios";

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    width: "inherit",
    backgroundColor: "#fff",
    flexShrink: 0,
    boxShadow: "5px 0px 5px 0px rgba(0,0,0,0.6)",
  },
  link: {
    textDecoration: "none",
    color: theme.palette.text.primary,
    margin: 0,
  },
  formControl: {
    margin: theme.spacing(1),
    "& .MuiSelect-icon": {
      color: 'white'
    },
    "& .MuiPaper-root":{
      background: 'red',
      width: '440px'
    },
  },
  quantityRoot: {
    color: "#FFFFFF",
    backgroundColor: "#3f51b5",
    borderRadius: "5px",
    "&:focus-within": {
      backgroundColor: "#3f51b5",
      borderRadius: "5px",
      opacity: 1
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none"
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      border: "none"
    },
    "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "& .Mui-disabled": {
      color: "#FFFFFF",
      opacity: 0.6
    },
    "& .Mui-disabled .MuiOutlinedInput-notchedOutline": {
      border: "none"
    }
  },
  selectRoot: {
    color: "#FFFFFF"
  },
  icon: {
    color: "#FFFFFF"
  },
  selectPaper: {
    backgroundColor: "#3f51b5",
    border: "1px solid #484850",
    borderRadius: "5px",
    color: "#FFFFFF",
    "& li:hover": {
      backgroundColor: "#263589"
    }
  }
}));

export default function Header() {
  const classes = useStyles();
  //Drawer Functions
  const [drawerState, setDrawerState] = useState(false);

  function openDrawer(e) {
    setDrawerState(true);
  }

  function closeDrawer(e) {
    setDrawerState(false);
  }
  //Button Menu Functions
  const [isAuthenticated, checkAuth] = useState(false);
  const [firstName, setFirstname] = useState('');
  const [studentCourses, setStudentCourses] = useState([]);
  const [course, setCourse] = useState('')
  const [userRole, setRole] = useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (e) => {
    setCourse(e.target.value)
  }


useEffect(async () =>{
  if(Cookies.get("access_token")){
    var token = Cookies.get('access_token');
    var decoded = jwt_decode(token);
    setRole(decoded.role)
    setFirstname(decoded.first_name);
    console.log(decoded.role)
    console.log(firstName);
    checkAuth(true)
    axiosInstance.get('courses/student_course').then((res) => {
      setStudentCourses(res.data)
    })
  }
}, [])

if(isAuthenticated && userRole == 'student'){
    return (
      <div className="header">
      <nav style={{ overflow: 'hidden' }}>
        <img src={Logo} className="logo" style={{ width: '70px', margin: '5px 0' }} />
        <ul className="links">
          {/* courses dropdown */}
          
          <FormControl variant="outlined" style={{ width: '240px', height: '50px', border: 'none', outline: 'none'  ,overflow: 'hidden', borderRadius: '22px' }} classes={{
          root: classes.quantityRoot
        }} >
                        <Select
                        classes={{
                          root: classes.selectRoot,
                          icon: classes.icon
                        }}
                        MenuProps={{ classes: { paper: classes.selectPaper } }}
                        style={{ width: '250px', color: 'black', height: '50px'}}
                        value={course}
                        onChange={handleChange}
                        displayEmpty
                        >
                          <MenuItem  value="" style={{ color: 'white' }}>
                              <Link style={{ textDecoration: "none", color: "black", height: '30px', overflow: 'hidden', color: 'white'}} to="/student/courses"><span style={{ overflow: 'hidden'}}>دوراتك التدريبية</span></Link>
                          </MenuItem>
                          <div style={{ color: 'white' }}>
                          {studentCourses.length == 0 ? '' : studentCourses.map((course) => 
                          <MenuItem value={course.id} style={{ color: 'black' }}>
                              <Link style={{ textDecoration: "none", color: "black", height: '30px', overflow: 'hidden', color: 'white'}} to={`/student/course/${course.id}`}><span style={{ overflow: 'hidden'}}>{course.name}</span></Link>
                          </MenuItem>)}
                          </div>
                        </Select>
          </FormControl>

          {/* profile dropdown */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '250px'  }}>
          <Button aria-controls="simple-menu" aria-haspopup="true" variant="contained"
          style={{ margin: '22px', backgroundColor: '#FF5856', color: 'white' }} onClick={handleClick}>
            {userRole == 'student' ? `اهلا ${firstName}` : `اهلا أ/ ${firstName}`}
            <ArrowDropDownIcon />
          </Button>
          <Menu
            
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            

            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <Link to="/" style={{
                  textDecoration: "none",
                  color: "black",
                }}>
            <MenuItem  onClick={handleClose}>
            <Typography
                style={{
                  fontFamily: "Cairo",
                }}
              >
                
                دوراتي التدريبية
              </Typography>
            </MenuItem>
            </Link>

            <Link to="/" style={{
                  textDecoration: "none",
                  color: "black",
                }}>
            <MenuItem onClick={handleClose}>
            <Typography
                style={{
                  fontFamily: "Cairo",
                }}
              >
                
                حسابي
              </Typography>
            </MenuItem>
            </Link>

            <Link to="/logout" style={{
                  textDecoration: "none",
                  color: "black",
                }}>
            <MenuItem onClick={handleClose}>
            <Typography
                style={{
                  fontFamily: "Cairo",
                }}
              >
                
               تسجيل خروج
              </Typography>
            </MenuItem>
            </Link>
          </Menu>
          <FacebookIcon /><WhatsAppIcon />
          </div>
        </ul>
        <div className="menuIcon">
          <Button onClick={openDrawer}>
            <MenuOpenIcon style={{ fontSize: '36px' }} />
          </Button>
        </div>
      </nav>
      
      <Drawer
        style={{
          width: "240px",
        }}
        className="drawer"
        variant="persistent"
        anchor="left"
        open={drawerState}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <List>
            <ListItem button onClick={closeDrawer} style={{ marginTop: '6px' }}>
              <ListItemIcon>
                <ArrowLeftIcon />
              </ListItemIcon>
            </ListItem>
            <Divider style={{ margin: '5px' }} />
            <ListItem style={{ overflow: 'hidden', padding: '15px' }}>
            <Accordion style={{ overflow: 'hidden' ,color: 'white', width: '100%', background: '#3f15b5', borderRadius: '4px', padding: '5px' }}>
                  <AccordionSummary style={{ overflow: 'hidden' ,color: 'white', width: '100%', padding: '0' }} expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}>
                      <Typography variant="inherit" style={{ fontSize: '16px' }} noWrap>
                          <span>دوراتك التدريبية</span>
                      </Typography>
                  </AccordionSummary>
                  <AccordionDetails style={{marginTop: '-20px', overflow: 'hidden', color: 'white', display: 'flex', flexDirection: 'column' }}>
                      {studentCourses.length == 0 ? 
                      <MenuItem style={{ overflow: 'hidden'}}>
                          <Typography variant="inherit" style={{ fontSize: '16px' }} noWrap>
                            <span>لا يوجد</span>
                        </Typography>
                      </MenuItem> : studentCourses.map((course) =>
                      <MenuItem style={{ overflow: 'hidden'}}>
                          <Typography variant="inherit" style={{ fontSize: '16px' }} noWrap>
                            <NavLink activeClassName="active-link" style={{ color: 'white', textDecoration: 'none' }} to={`/student/course/${course.id}`}><span>{course.name}</span></NavLink>
                        </Typography>
                      </MenuItem>)}
                  </AccordionDetails>
              </Accordion>
            </ListItem>
          
          <ListItem button>
          <Button aria-controls="simple-menu" aria-haspopup="true" variant="contained"
          color="secondary" onClick={handleClick}>
             اهلا {firstName}  <ArrowDropDownIcon />
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <Link to="/" style={{
                  textDecoration: "none",
                  color: "black",
                }}>
            <MenuItem onClick={handleClose}>
            <Typography
                style={{
                  fontFamily: "Cairo",
                }}
              >
                
                دوراتي التدريبية
              </Typography>
            </MenuItem>
            </Link>

            <Link to="/" style={{
                  textDecoration: "none",
                  color: "black",
                }}>
            <MenuItem onClick={handleClose}>
            <Typography
                style={{
                  fontFamily: "Cairo",
                }}
              >
                
                حسابي
              </Typography>
            </MenuItem>
            </Link>

            <Link to="/logout" style={{
                  textDecoration: "none",
                  color: "black",
                }}>
            <MenuItem onClick={handleClose}>
            <Typography
                style={{
                  fontFamily: "Cairo",
                }}
              >
                
               تسجيل خروج
              </Typography>
            </MenuItem>
            </Link>
          </Menu>
          </ListItem>
          <ListItem button onClick={closeDrawer} style={{ marginTop: '6px' }}>
              <ListItemIcon>
                <WhatsAppIcon />
              </ListItemIcon>
              <ListItemIcon>
                <FacebookIcon />
              </ListItemIcon>
          </ListItem>
        </List>
      </Drawer>
    </div>
    );
  }
  return (
    <div className="header">
      <nav>
        <h3 className="title"> نلقن </h3>
        <ul className="links">
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "black",
            }}
          >
            <li> الرئيسية </li>
          </Link>
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "black",
            }}
          >
            <li> نبذة عنا </li>
          </Link>
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "black",
            }}
          >
            <li> الدورات التدريبية </li>
          </Link>
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "black",
            }}
          >
            <li> تواصل معنا </li>
          </Link>
          <Link
            style={{
              textDecoration: "none",
              color: "white",
            }}
            to="/register"
          >
            
            <Button variant="contained" color="primary">
              
              مستخدم جديد
            </Button>
          </Link>
          <Link
            style={{
              textDecoration: "none",
              color: "white",
            }}
            to="/login"
          >
            
            <Button variant="contained" style={{ margin: '22px', backgroundColor: '#FF5856', color: 'white' }}>
              
              تسجيل الدخول
            </Button>
          </Link>
          <FacebookIcon> </FacebookIcon> <WhatsAppIcon> </WhatsAppIcon>
        </ul>
      </nav>
      <div className="menuIcon">
        
        <Button onClick={openDrawer}>
          
          <MenuOpenIcon />
        </Button>
      </div>
      <Drawer
        style={{
          width: "220px",
        }}
        className="drawer"
        variant="persistent"
        anchor="left"
        open={drawerState}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <List>
          <ListItem button onClick={closeDrawer}>
            <ListItemIcon>
              <ArrowLeftIcon />
            </ListItemIcon>
          </ListItem>
          <Link to="/" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <Typography
                style={{
                  fontFamily: "Cairo",
                  fontWeight: "bold",
                }}
              >
                
                الرئيسية
              </Typography>
            </ListItem>
          </Link>
          <Link to="/" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <Typography
                style={{
                  fontFamily: "Cairo",
                  fontWeight: "bold",
                }}
              >
                
                نبذة عنـا
              </Typography>
            </ListItem>
          </Link>
          <Link to="/" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <ImportContactsIcon />
              </ListItemIcon>
              <Typography
                style={{
                  fontFamily: "Cairo",
                  fontWeight: "bold",
                }}
              >
                
                الدورات التدريبية
              </Typography>
            </ListItem>
          </Link>
          <Link to="/" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <EmailIcon />
              </ListItemIcon>
              <Typography
                style={{
                  fontFamily: "Cairo",
                  fontWeight: "bold",
                }}
              >
                
                تواصـل معـنا
              </Typography>
            </ListItem>
          </Link>
          <Link to="/" className={classes.link}>
            <ListItem button>
              <Link
                style={{
                  textDecoration: "none",
                  color: "white",
                }}
                to="/register"
              >
                
                <Button variant="contained" color="primary">
                  
                  مستخدم جديد
                </Button>
              </Link>
            </ListItem>
          </Link>
          <Link to="/" className={classes.link}>
            <ListItem button>
              <Link
                style={{
                  textDecoration: "none",
                  color: "white",
                }}
                to="/login"
              >
                
                <Button variant="contained" color="secondary">
                  
                  تسجيل الدخول
                </Button>
              </Link>
            </ListItem>
          </Link>
        </List>
      </Drawer>
    </div>
  );
}
