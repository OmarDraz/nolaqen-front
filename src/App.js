import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginPage from './Pages/StudentInterface/LoginPage';
import RegisterPage from './Pages/StudentInterface/RegisterPage';
import Logout from './Components/logout';
import Redir from './Components/redirect'
import './App.css';
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