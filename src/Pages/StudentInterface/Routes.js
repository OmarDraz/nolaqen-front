import React from 'react';
import { BrowserRouter as  Route,  } from 'react-router-dom';

import CoursesPage from './CoursesPage';


import Course from './Course'
import Header from '../../Components/Header';
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