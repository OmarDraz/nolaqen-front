import React from 'react';
import '../css/teacher.css';
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