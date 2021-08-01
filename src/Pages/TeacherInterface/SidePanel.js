import React, {useState, useEffect} from 'react';
import {
    BrowserRouter as
    Link,
    NavLink,
  } from "react-router-dom";
  import Cookies from 'js-cookie';
import { makeStyles } from '@material-ui/core/styles';
import axiosInstance from "../../axios";
import jwt_decode from "jwt-decode";
import AssignmentIcon from '@material-ui/icons/Assignment';
import Typography from '@material-ui/core/Typography';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import DescriptionIcon from '@material-ui/icons/Description';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import HelpIcon from '@material-ui/icons/Help';
import '../css/teacher.css';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import SidePanelDec from '../../svg/SidePanelDec.svg'
import ColoredLogo from '../../svg/ColoredLogo.svg'
import { Button } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
      margin: '10px 0',
    },
    icon: {
        minWidth: '34px'
    }
  });


  const SidePanel = () => {

    const [isAuthenticated, checkAuth] = useState(false);
    const [firstName, setFirstname] = useState('');
    const [userRole, setRole] = useState('');
    const [courses, setCourses] = useState([]);
    useEffect(async () =>{
        if(Cookies.get("access_token")){
          var token = Cookies.get('access_token');
          var decoded = jwt_decode(token);
          setRole(decoded.role)
          setFirstname(decoded.first_name);
          checkAuth(true)
        }
        axiosInstance
        .get('courses/teacher-courses').then(res => {
            console.log(res.data);
            setCourses(res.data);
            console.log(courses);
            courses.map(course => console.log(course.id));
        })
      }, [])

      
    const classes = useStyles();
    return(
            <div className="panel">
                <img src={SidePanelDec} style={{ position: 'fixed', bottom: '10px', width: '300px', height: 'auto' }} />
                <img src={ColoredLogo} style={{ width: '175px', height: 'auto', margin: '-25px auto -30px auto', display: 'block' }}/>
                <h3 style={{ textAlign: 'center', margin:'23px 0' }}>{`أ / ${firstName}`}</h3>
                <MenuList>
                    {/* <MenuItem className={classes.root}>
                        <ListItemIcon className={classes.icon}>
                            <NotificationsActiveIcon fontSize="medium" style={{ color: 'white' }} />
                        </ListItemIcon>
                        <Typography variant="inherit" style={{ fontSize: '18px' }} noWrap>
                            <span>الاشعارات</span>
                        </Typography>
                    </MenuItem>
                    <MenuItem className={classes.root}>
                        <ListItemIcon className={classes.icon}>
                            <EmailIcon fontSize="medium" style={{ color: 'white' }} />
                        </ListItemIcon>
                        <Typography variant="inherit" style={{ fontSize: '18px' }} noWrap>
                            <span>الرسائل</span>
                        </Typography>
                    </MenuItem> */}
                    <MenuItem className={classes.root}>
                        <Accordion style={{ overflow: 'hidden' ,color: 'white', width: '100%', zIndex: '5' }}>
                            <AccordionSummary style={{ overflow: 'hidden' ,color: 'white', width: '100%', padding: '0' }} expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}>
                                <ListItemIcon className={classes.icon}>
                                    <PeopleAltIcon fontSize="medium" style={{ color: 'white' }} />
                                </ListItemIcon>
                                    <Typography variant="inherit" style={{ fontSize: '18px' }} noWrap>
                                    <span>طلابك</span>
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails style={{marginTop: '-20px', overflow: 'hidden', color: 'white', display: 'flex', flexDirection: 'column' }}>
                                {courses.map(course => <MenuItem style={{ overflow: 'hidden'}}>
                                 {/* looped  */}
                                 <Accordion style={{ overflow: 'hidden' ,color: 'white', width: '100%' }}>
                                    <AccordionSummary style={{ overflow: 'hidden' ,color: 'white', width: '100%', padding: '0' }} expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}>
                                        <Typography variant="inherit" style={{ fontSize: '16px' }} noWrap>
                                        <span>- {course.name}</span>
                                        </Typography>
                                    </AccordionSummary>
                                        <AccordionDetails style={{marginTop: '-20px', overflow: 'hidden', color: 'white', display: 'flex', flexDirection: 'column' }}>
                                            <MenuItem style={{ overflow: 'hidden'}}>
                                                <Typography variant="inherit" style={{ fontSize: '16px' }} noWrap>
                                                    <NavLink activeClassName="active-link" style={{ color: 'white', textDecoration: 'none' }} to={`/teacher/course-students/${course.id}`}><span>- اسماء الطلاب</span></NavLink>
                                                </Typography>
                                            </MenuItem>
                                            <MenuItem style={{ overflow: 'hidden'}}>
                                                <Typography variant="inherit" style={{ fontSize: '16px' }} noWrap>
                                                    <NavLink activeClassName="active-link" style={{ color: 'white', textDecoration: 'none' }} to={`/teacher/requests/${course.id}`}><span>- طلبات الانضمام</span></NavLink>
                                                </Typography>
                                            </MenuItem>
                                            <MenuItem style={{ overflow: 'hidden'}}>
                                                <Typography variant="inherit" style={{ fontSize: '16px' }} noWrap>
                                                    <NavLink activeClassName="active-link" style={{ color: 'white', textDecoration: 'none' }} to={`/teacher/groups/${course.id}`}><span>- المجموعات</span></NavLink>
                                                </Typography>
                                            </MenuItem>
                                            <MenuItem style={{ overflow: 'hidden'}}>
                                                <Typography variant="inherit" style={{ fontSize: '16px' }} noWrap>
                                                    <NavLink activeClassName="active-link" style={{ color: 'white', textDecoration: 'none' }} to={`/teacher/lessons/${course.id}`}><span>- الحصص</span></NavLink>
                                                </Typography>
                                            </MenuItem>
                                            <MenuItem style={{ overflow: 'hidden'}}>
                                                <Typography variant="inherit" style={{ fontSize: '16px' }} noWrap>
                                                    <NavLink activeClassName="active-link" style={{ color: 'white', textDecoration: 'none' }} to={`/teacher/exams/${course.id}`}><span>- الاختبارات</span></NavLink>
                                                </Typography>
                                            </MenuItem>
                                        </AccordionDetails>
                                </Accordion>
                                </MenuItem>)}
                                
                            </AccordionDetails>
                        </Accordion>
                    </MenuItem>
                    <MenuItem className={classes.root}>
                        <ListItemIcon className={classes.icon}>
                            <AssignmentIcon fontSize="medium" style={{ color: 'white' }} />
                        </ListItemIcon>
                        <Typography variant="inherit" style={{ fontSize: '18px' }} noWrap>
                            <NavLink activeClassName="active-link" style={{ color: 'white', textDecoration: 'none' }} to={`/teacher/add-exam`}><span>أضف امتحان</span></NavLink>
                        </Typography>
                    </MenuItem>
                    <MenuItem className={classes.root}>
                        <ListItemIcon className={classes.icon}>
                            <AllInboxIcon fontSize="medium" style={{ color: 'white' }} />
                        </ListItemIcon>
                        <Typography variant="inherit" style={{ fontSize: '18px' }} noWrap>
                            <NavLink activeClassName="active-link" style={{ color: 'white', textDecoration: 'none' }} to={`/teacher/all-posts`}><span>المنشورات</span></NavLink>
                        </Typography>
                    </MenuItem>
                    <MenuItem className={classes.root}>
                        <ListItemIcon className={classes.icon}>
                            <HelpIcon fontSize="medium" style={{ color: 'white' }} />
                        </ListItemIcon>
                        <Typography variant="inherit" style={{ fontSize: '18px' }} noWrap>
                            <NavLink activeClassName="active-link" style={{ color: 'white', textDecoration: 'none' }} to={`/teacher/all-questions`}><span>الاسئلة</span></NavLink>
                        </Typography>
                    </MenuItem>
                    <MenuItem className={classes.root}>
                        <ListItemIcon className={classes.icon}>
                            <DescriptionIcon fontSize="medium" style={{ color: 'white' }} />
                        </ListItemIcon>
                        <Typography variant="inherit" style={{ fontSize: '18px' }} noWrap>
                        <NavLink activeClassName="active-link" style={{ color: 'white', textDecoration: 'none' }} to={`/teacher/logs`}><span>السجلات</span></NavLink>
                        </Typography>
                    </MenuItem>
                    {/* <MenuItem className={classes.root} >
                        <ListItemIcon className={classes.icon}>
                            <WifiOffIcon fontSize="medium" style={{ color: 'white' }} />
                        </ListItemIcon>
                        <Typography variant="inherit" style={{ fontSize: '18px' }} noWrap>
                            <span>طلاب اوفلاين</span>
                        </Typography>
                    </MenuItem> */}
                </MenuList>
                <Button variant="text" component={Link} to="/logout" style={{ color: 'white', position: 'absolute', bottom: '10px', right: '10px', fontSize: '16px' }}><MeetingRoomIcon /> تسجيل خروج </Button>
            </div>
    )
}

export default SidePanel;