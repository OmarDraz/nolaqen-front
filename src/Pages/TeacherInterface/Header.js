import React, {useState, useEffect} from 'react';
import Cookies from 'js-cookie'
import axiosInstance from "../../axios";
import jwt_decode from "jwt-decode";
import teacherIcon from '../../svg/TeacherIcon.svg';
import Typography from '@material-ui/core/Typography';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import EmailIcon from '@material-ui/icons/Email';
import '../css/teacher.css';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import TeacherIcon from '../../svg/TeacherIcon.svg'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import AdminPageDecorators from '../../svg/AdminPageDecorators.svg'
import {useHistory} from "react-router-dom";
import { Button } from '@material-ui/core';

const TeacherHeader = () => {
    const history = useHistory()
    return(
        <>
            <nav className="nav">
                <img src={TeacherIcon} style={{ height: '75px', marginLeft: '32%' }} />
                <Button variant="text" onClick={() => history.goBack() } style={{ marginLeft: '15px', display: 'flex', alignItems: 'center' }}><ArrowBackIosIcon /><ArrowBackIosIcon /></Button>
            </nav>
            <img src={AdminPageDecorators} style={{ position: 'fixed', top: '0', right: '0', width: '100%', height: '100vh' }} />
        </>

    )
}

export default TeacherHeader;