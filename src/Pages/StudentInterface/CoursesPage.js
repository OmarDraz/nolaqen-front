import React, { useState, useEffect } from 'react';
import Container from "@material-ui/core/Container";
import Header from "../../Components/Header";
import CustomizedDialogs from "../../Components/dialog";
import Divider from '@material-ui/core/Divider';
import '../css/courses.css';
import axiosInstance from "../../axios";
import { Button } from '@material-ui/core';
import decorators from '../../svg/Decorators.svg';
import teacher from '../../svg/Teacher.svg';
import Cover from './cover.png'

const CoursesPage = () => {
    const [courses, setCourses] = useState([])
    useEffect(async () =>{
        axiosInstance
        .get('courses/courses').then(res => {
            console.log(res.data);
            setCourses(res.data);
            console.log('c',courses);
            courses.map(course => console.log(course.id));
        })
      }, [])
    return(
        <div>
        <Container component="main">
            <img src={decorators} className="decorators"/>
            <img src={teacher} className="teacherSVG"/>
            <div style={{ textAlign: 'center', fontSize: '24px', marginTop: "20px", borderBottom: '1px' }}>الدورات التدريبية</div>
            <Divider style={{ width: '220px', margin: 'auto' }} />
            <div className="coursesGrid">
                {courses.map(course => 
                <div className="course-card">
                    <img className="courseImg" src={Cover} />
                        <h3>أ/ {course.first_name} {course.last_name}</h3>
                        <span className="courseTitle">{course.name}</span>
                        <CustomizedDialogs courseId={course.id} btnText={course.status} />
                </div>)}
            </div>
        </Container>
        </div>
    )
}

export default CoursesPage;