import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import LoginPage from './Pages/StudentInterface/LoginPage';
import RegisterPage from './Pages/StudentInterface/RegisterPage';
import HomePage from './Pages/StudentInterface/HomePage';
import CoursesPage from './Pages/StudentInterface/CoursesPage';
import Logout from './Components/logout';
import TeacherHeader from './Pages/TeacherInterface/Header'
import RequestsPage from './Pages/TeacherInterface/Requests';
import GroupsPage from './Pages/TeacherInterface/Groups';
import StudentProfilePage from './Pages/TeacherInterface/StudentProfile';
import AddQuestionsPage from './Pages/TeacherInterface/AddQuestions';
import CourseStudentPage from './Pages/TeacherInterface/CourseStudent';
import CourseExamsPage from './Pages/TeacherInterface/CourseExams';
import CourseLessonsPage from './Pages/TeacherInterface/CourseLessons';
import EditExamPage from './Pages/TeacherInterface/EditExam';
import AddExamPage from './Pages/TeacherInterface/AddExam';
import AddPostPage from './Pages/TeacherInterface/AddPost';
import LogsPage from './Pages/TeacherInterface/Logs';
import QuestionsPage from './Pages/TeacherInterface/Questions';
import SidePanel from './Pages/TeacherInterface/SidePanel';
import TeacherDecorators from './svg/TeacherDecorators.svg'


import Course from './Pages/StudentInterface/Course'
import Header from './Components/Header';
import Redir from './Components/redirect'
import './App.css';
import CourseContent from './Pages/StudentInterface/CourseContent';
import SingleLesson from './Pages/StudentInterface/SingleLesson';
import ExamPage from './Pages/StudentInterface/Exam';
import StudentRoutes from './Pages/StudentInterface/Routes';
import TeacherRoutes from './Pages/TeacherInterface/Routes';

const App = () => {
    return (
        <div>
            <Router>
                <Switch>
                    <Route path="/register" component={RegisterPage} />
                    <Route path='/' component= {LoginPage}/>
                    <Route path='/logout' component= {Logout}/>
                    <Route path='/exam/:examId' component= {ExamPage} />
                    <Route path="/redirect" component={Redir} />
                    <Route path='/student' component={StudentRoutes} />
                    <Route path="/teacher" component = {TeacherRoutes} />
                </Switch>
            </Router>
            
        </div>
    )
};

export default App;