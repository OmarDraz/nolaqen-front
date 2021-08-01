import React, { useState, useEffect } from 'react';
import AdminPageDecorators from '../../svg/AdminPageDecorators.svg'
import Container from "@material-ui/core/Container";
import Header from "../../Components/Header";
import { Tabs, AppBar, Tab } from "@material-ui/core"
import CustomizedDialogs from "../../Components/dialog";
import Divider from '@material-ui/core/Divider';
import '../css/courses.css';
import axiosInstance from "../../axios";
import { Button } from '@material-ui/core';
import decorators from '../../svg/Decorators.svg';
import teacher from '../../svg/Teacher.svg';
import logo from './k.png'
import courseCover from './course-cover.png'
import { useParams, Link } from 'react-router-dom';

const Panel = (props) => (
    <div style={{ marginTop: '10px', paddingBottom: '10px' }} hidden={props.value !== props.index}>
        {props.value === props.index && <div>{props.children}</div>}
    </div>
)

const Course = () => {
    const [checkResponse, setCheckResponse] = useState('')
    const [points, setPoints] = useState(4);
    const [courseDetails, setCourseDetails] = useState({})
    const [lastLessons, setCourseLastLessons] = useState([])
    const [lastExams, setCourseLastExams] = useState([])
    const [lastPosts, setCourseLastPosts] = useState([])
    const [tabIndex, setTabIndex] = useState(0);
    const [empty, setEmpty] = useState(false)
    let { courseId } = useParams()

    const onTabClicked = (event, index) => {
        setTabIndex(index)
    }

    useEffect(() => {
        axiosInstance.get('courses/points/' + courseId).then((res) => setPoints(res.data.point))
        axiosInstance.get('courses/check/' + courseId).then((res) => setCheckResponse(res.data))
        axiosInstance.get('users/news-feed/' + courseId).then((res) => setCourseDetails(res.data))
        axiosInstance.get('users/last_lesson/' + courseId).then((res) => setCourseLastLessons(res.data))
        axiosInstance.get('users/last_exam/' + courseId).then((res) => setCourseLastExams(res.data))
        axiosInstance.get('users/last_post/' + courseId).then((res) => setCourseLastPosts(res.data))
    }, [])
    return(
        checkResponse ? <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh', background: '#3f51b5', color: 'white'}}>{checkResponse}</div> :
        <div>
        <img src={AdminPageDecorators} style={{ position: 'fixed', top: 0, right: 0, width: '100%', height: '100vh', zIndex: -1 }} />

            <Container style={{ marginBottom: '30px' }}>
                {checkResponse ? <div style={{ margin: 'auto', justifyContent: 'center', display: 'flex', height: '80vh', alignItems: 'center' }}>{checkResponse}</div> : 
                <div className='coursePage' style={{ display: 'grid', gridTemplateColumns: '29% 69%', margin: '10px 40px', gridGap: '2%' }}>
                    <div className="courseDetails" style={{ backgroundColor: 'white' }}>
                        <img src={courseCover} style={{ width: '100%', height: '200px' }}/>
                        <img src={logo} style={{ width: '150px', height: '150px', borderRadius: '50%', marginTop: '-25px', boxShadow :'black 0px 0px 7px' }}/>
                        <h3 style={{ marginTop: '10px' }}>{`أ / ${courseDetails.first_name} ${courseDetails.last_name}`}</h3>
                        <span style={{ color: 'grey' }}>{courseDetails.name}</span>
                    </div>
                    <div className="responsivePanel" style={{ boxShadow: '0px 0px 19px -8px rgb(0 0 0 / 25%)', padding: '10px', margin: '20px', background: 'white' }}>
                            <Tabs variant="fullWidth" style={{ backgroundColor: 'white' }} value={tabIndex} onChange={onTabClicked}>
                                <Tab style={{ overflow: 'hidden' }} label={<span style={{ overflow: 'hidden' }}>الحصص</span>}></Tab>
                                <Tab style={{ overflow: 'hidden' }} label={<span style={{ overflow: 'hidden' }}>الاختبارات</span>}></Tab>
                                <Tab style={{ overflow: 'hidden' }} label={<span style={{ overflow: 'hidden' }}>الاخبار</span>}></Tab>
                            </Tabs>
                            <Panel value={tabIndex} index={0} empty>
                            <div className="contentGrid" style={{ gridGap: '2%' }}>
                                {lastLessons.length == 0 ? 'لا يوجد دروس' : lastLessons.map((les) => 
                                    <div className="card" style={{ width: '90%', height: '100%' }}>
                                        <Link to={`/student/lesson/${les.id}`}><img className="courseImg" src={courseCover} /></Link>
                                        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '100%', margin: '10px', overflow: 'hidden' }}>
                                            <div style={{  padding: '10px', overflow: 'hidden' }}>
                                            <h3>{les.name}</h3>
                                            <span className="courseTitle">{les.description}</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <span style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>كل الحصص</span>
                            </Panel>
                            <Panel value={tabIndex} index={1}>
                            <div className="contentGrid" style={{ gridGap: '2%' }}>
                                {lastExams.length == 0 ? 'لا يوجد دروس' : lastExams.map((exam) => 
                                    <div className="card" style={{ height: 'auto', width: '90%' }}>
                                        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '100%', margin: '10px', overflow: 'hidden' }}>
                                            <div style={{  padding: '10px', overflow: 'hidden' }}>
                                            <h3>{exam.name}</h3>
                                            <p className="courseTitle">درجة الامتحان : {exam.degree}</p>
                                            <p className="courseTitle">موعد انتهاء الامتحان : {exam.end_at}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <span style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>كل الاختبارات</span>

                            </Panel>
                            <Panel value={tabIndex} index={2}>
                                <div className="contentGrid" style={{ gridGap: '2%' }}>
                                    {lastPosts.length == 0 ? 'لا يوجد اخبار' : lastPosts.map((post) => 
                                    <div className="card" style={{ height: 'auto', width: '100%' }}>
                                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', width: '100%', margin: '10px', overflow: 'hidden' }}>
                                            <p style={{ fontSize: '18px', fontWeight: '550' }}>{post.content}</p>
                                            <span style={{ color: 'grey', fontSize: '12px' }}>{post.created_at}</span>
                                        </div>
                                    </div>
                                    )}
                                </div>
                                <span style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>كل الاخبار</span>
                            </Panel>
                    </div>
                </div>}
            </Container>
            {console.log(lastLessons)}
            <Button variant="contained" color="primary" style={{ borderRadius: '15px', position: 'fixed', bottom: '10px', left: '10px', width: '150px', height: '50px', letterSpacing: 1.5 }}>نقاطك | {points}</Button>
        </div>
    )
}

export default Course;