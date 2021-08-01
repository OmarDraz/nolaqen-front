import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';

import Logout from '../../Components/logout';
import TeacherHeader from './Header'
import RequestsPage from './Requests';
import GroupsPage from './Groups';
import StudentProfilePage from './StudentProfile';
import AddQuestionsPage from './AddQuestions';
import CourseStudentPage from './CourseStudent';
import CourseExamsPage from './CourseExams';
import CourseLessonsPage from './CourseLessons';
import EditExamPage from './EditExam';
import AddExamPage from './AddExam';
import AddPostPage from './AddPost';
import LogsPage from './Logs';
import QuestionsPage from './Questions';
import SidePanel from './SidePanel';
import ExamResultsPage from './ExamResults';
import PostsPage from './Posts';

const TeacherRoutes = () => {
    return (
        <div>
                <TeacherHeader />
                <SidePanel />
                    <Route path='/teacher/teacher-panel' component= {TeacherHeader}/>
                    <Route path='/teacher/requests/:courseId' component= {RequestsPage}/>
                    <Route path='/teacher/groups/:courseId' component= {GroupsPage}/>
                    <Route path='/teacher/exams/:courseId' component= {CourseExamsPage}/>
                    <Route path='/teacher/lessons/:courseId' component= {CourseLessonsPage}/>
                    <Route path='/teacher/edit-exam/:examId' component= {EditExamPage}/>
                    <Route path='/teacher/course-students/:courseId' component= {CourseStudentPage}/>
                    <Route path='/teacher/add-questions' component= {AddQuestionsPage}/>
                    <Route path='/teacher/add-exam' component= {AddExamPage}/>
                    <Route path='/teacher/exam-results/:examId' component={ExamResultsPage} />
                    <Route path='/teacher/all-posts' component={PostsPage} />
                    <Route path='/teacher/add-post' component= {AddPostPage}/>
                    <Route path='/teacher/logs'  component= {LogsPage}/>
                    <Route path='/teacher/all-questions' component= {QuestionsPage}/>
                    <Route path='/teacher/course/:courseId/student/:studentId' component= {StudentProfilePage}/>
        </div>
    )
};

export default TeacherRoutes;