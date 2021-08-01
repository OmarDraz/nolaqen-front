import React, { useEffect, useState } from 'react'
import Header from '../../Components/Header'
import { Tabs, AppBar, Tab, Container, Card, ButtonBase, TextField} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import courseCover from './course-cover.png'
import { Link } from 'react-router-dom'
import axiosInstance from '../../axios';
import Decorators from '../../svg/decorators2.svg'
import PostsDecorators from '../../svg/postDeocrators.svg'
import { useParams } from 'react-router-dom';
import '../css/courses.css';




const Panel = (props) => (
    <div style={{ marginTop: '10px', paddingBottom: '10px' }} hidden={props.value !== props.index}>
        {props.value === props.index && <div>{props.children}</div>}
    </div>
)

const CourseContent = () => {
    const useStyles = makeStyles((theme) => ({
        root: {
            "& .MuiFormLabel-root": {
                color: "rgba(0, 0, 0, 0.54)", // or black
                fontFamily: "Cairo",
                left: 'auto',
                overflow: 'hidden',
                height: '20px',
                margin: '0px 12px'
              },
            "& .MuiInputBase-input": {
                fontFamily: 'Cairo'
            },
            "& .MuiFormControl-root": {
                flexDirection: 'row !impoertant'
            },
          '& > *': {
            margin: theme.spacing(1),
          },
        },
        dialog: {
            "& .MuiDialog-paperWidthSm": {
                width: '700px'
            }
        },
        tabs:{
            "& .MuiTabs-flexContainer": {
                background: '#ff5658'
            },
            "& .MuiTab-textColorInherit.Mui-selected": {
                background: '#3f51b5'
            }
        },
        input: {
          display: 'none',
        },
        card: {
            "@media (max-width: 696px)":{
                width: '100px'
            }
        }
      }));

    const [tabIndex, setTabIndex] = useState(0);
    const [checkResponse, setCheckResponse] = useState('')
    const [lessons, setLessons] = useState([])
    const [exams, setExams] = useState([])
    const [posts, setPosts] = useState([])

    const classes = useStyles();
    let { courseId } = useParams()

    const onTabClicked = (event, index) => {
        setTabIndex(index)
    }

    useEffect(() => {
        axiosInstance.get('courses/check/' + courseId).then((res) => setCheckResponse(res.data))
        axiosInstance.get('lessons/lessons/' + courseId).then((res) => setLessons(res.data))
        axiosInstance.get('exams/exams/' + courseId).then((res) => setExams(res.data))
        axiosInstance.get('posts/posts/' + courseId).then((res) => setPosts(res.data))
    }, [])
    return(
        checkResponse ? <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh', background: '#3f51b5', color: 'white'}}>{checkResponse}</div> :
        <div style={{ overflow: 'hidden' }}>
            <Container style={{ height: 'auto', overflow: 'hidden' }}>
                <Panel value={tabIndex} index={0}>
                <img src={Decorators} style={{ width: '100%', height: '100vh', position: 'absolute', right: 0, top: 0, overflow: 'hidden', zIndex: -1 }} />
                <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                    <h3 style={{borderBottom: '2px solid #ccc', margin: '10px 0', width: '120px'}}>كل الحصص</h3>
                    <TextField  className={classes.root} label="بحث .."/>
                </div>
                <div className="coursesGrid" style={{ gridGap: '2%', overflow: 'hidden', paddingBottom: '20%' }}>
                        {lessons.length == 0 ? 'لا يوجد دروس' : lessons.map((les) => 
                            <div className="card" style={{ width: '100%'}}>
                            <img className="courseImg" src={courseCover} />
                                <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '100%', margin: '10px', overflow: 'hidden' }}>
                                    <div style={{  padding: '10px', overflow: 'hidden' }}>
                                    <h3>{les.name}</h3>
                                    <span className="courseTitle">{les.created_at}</span>
                                    </div>
                            </div>
                        </div>
                        )}
                </div>
                </Panel>
                <Panel value={tabIndex} index={1}>
                <img src={Decorators} style={{ width: '100%', height: '100vh', position: 'absolute', right: 0, top: 0, overflow: 'hidden', zIndex: -1 }} />
                <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                    <h3 style={{borderBottom: '2px solid #ccc', margin: '10px 0', width: '120px'}}>كل الاختبارات</h3>
                    <TextField  className={classes.root} label="بحث .."/>
                </div>
                <div className="coursesGrid" style={{ gridGap: '2%', overflow: 'hidden', paddingBottom: '20%' }}>
                        {exams.length == 0 ? 'لا يوجد اختبارات' : exams.map((exam) => 
                            <div className="card" style={{ width: '100%', height: '150px' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '70% 30%', alignItems: 'center', width: '100%', margin: '10px', overflow: 'hidden' }}>
                                    <div style={{  padding: '10px', overflow: 'hidden' }}>
                                        <h3>{exam.name}</h3>
                                        <p className="courseTitle">{exam.created_at}</p>
                                        <p className="courseTitle">{`درجة : ${exam.degree}`}</p>
                                    </div>
                                    <Button onClick={() => window.open(`/exam/${exam.id}`, "_blank")} variant="contained" style={{ height: '50px', color:"white", backgroundColor:'#ff5658', margin: '10px', fontSize: '10px' }}>
                                        خوض الامتحان
                                    </Button>
                                </div>
                        </div>
                        )}
                </div>
                </Panel>
                <Panel value={tabIndex} index={2} style={{ padding: '10px' }}>
                <img src={PostsDecorators} style={{ width: '100%', height: '100vh', position: 'absolute', right: 0, top: 0, overflow: 'hidden', zIndex: -1 }} />
                    <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
                        <h3 style={{borderBottom: '2px solid #ccc', margin: '10px 0', width: '120px', textAlign: 'center'}}>كل الاخبار</h3>
                    </div>
                    <div style={{ overflow: 'hidden', display: 'flex', alignItems:'center', flexDirection:'column', marginBottom: '45px'  }}>
                    {posts.length == 0 ? 'لا يوجد اختبارات' : posts.map((post) => 
                            <div className="card" style={{ width: '60%', height: 'auto', display: 'flex' , alignItems: 'flex-start', padding: '10px', margin: '10px'}}>
                                <h4>{`أ / ${post.first_name} ${post.last_name}`}</h4>
                                <span style={{ color: 'grey' }}>{post.created_at}</span>
                                <p style={{ fontSize: '18px', fontWeight: '550' }}>{post.content}</p>
                            </div>
                        )}
                    </div>
                </Panel>
            </Container>
            <div style={{ position: 'fixed', bottom: '0', width: '100%' }}>
                    <Tabs indicatorColor="none" className={classes.tabs} variant="fullWidth" style={{ backgroundColor: 'white' }} value={tabIndex} onChange={onTabClicked}>
                        <Tab style={{ overflow: 'hidden' }} label={<span style={{ overflow: 'hidden', color: 'white' }}>الحصص</span>}></Tab>
                        <Tab style={{ overflow: 'hidden' }} label={<span style={{ overflow: 'hidden', color: 'white' }}>الاختبارات</span>}></Tab>
                        <Tab style={{ overflow: 'hidden' }} label={<span style={{ overflow: 'hidden', color: 'white' }}>الاخبار</span>}></Tab>
                    </Tabs>
                </div>
                {console.log(exams)}
        </div>
    )
}
export default CourseContent