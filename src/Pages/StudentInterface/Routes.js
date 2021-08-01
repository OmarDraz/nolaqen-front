import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import HomePage from './HomePage';
import CoursesPage from './CoursesPage';
import Logout from '../../Components/logout';


import Course from './Course'
import Header from '../../Components/Header';
import Redir from '../../Components/redirect'
import '../../App.css';
import CourseContent from './CourseContent';
import SingleLesson from './SingleLesson';
import ExamPage from './Exam';

const StudentRoutes = () => {
    return (
        <div>
                    <Header />

                    {/*Student Routes*/}
                    <Route path='/student/courses' component= {CoursesPage}/>
                    <Route path='/student/course/:courseId' component= {Course}/>
                    <Route path="/student/course-content/:courseId" component= {CourseContent} />
                    <Route path="/student/lesson/:lessonId" component= {SingleLesson} />
                    <Route path="/student/exam/:examId" component= {ExamPage} />
        </div>
    )
};

export default StudentRoutes;