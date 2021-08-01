import React, { useState, useEffect, Fragment } from 'react';
import TeacherHeader from './Header.js';
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from "@material-ui/core/TextField";
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import EditIcon from '@material-ui/icons/Edit';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { DateTimePicker, KeyboardDateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import * as moment  from 'moment';

import DateMomentUtils from '@date-io/moment';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import Dialog from '@material-ui/core/Dialog';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import clsx from 'clsx';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/styles';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
  } from "react-router-dom";
  import {
      Accordion,
    Checkbox,
    AccordionDetails,
      AccordionSummary,
    Typography,
  } from "@material-ui/core";
import SidePanel from './SidePanel.js';
import Button from "@material-ui/core/Button";
import PaymentIcon from '@material-ui/icons/Payment';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { useParams } from 'react-router-dom';
import { DataGrid } from '@material-ui/data-grid';
import { Container, Paper, Box } from '@material-ui/core';
import axiosInstance from "../../axios";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import '../css/teacher.css';


const CourseExamsPage = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editLoad, setEditLoad] = useState(true);
    const [exams, setExams] = useState();
    const [examDetails, setExamDetails] = useState();
    const [examId, setExamId] = useState();
    const [limit, setLimit] = useState();
    const [courseLessons, setLessons] = useState([])
    const [lesson, setLesson] = useState();
    const [groups, setGroups] = useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [deleteAlert, setDeleteAlert] = React.useState(false);
    const [editPopup, setEditPopup] = React.useState(false);
    const [groupPopUp, setGroupPopup] = React.useState(false);
    const [notAddedGroups, setNotAddedGroups] = useState([])
    const [addedGroups, setAddedGroups] = useState([])
    const [addedQuestions, setAddedQuestions] = useState([])
    const [notAddedQuestions, setNotAddedQuestions] = useState([])
    const [checkedGroups, setCheckedGroups] = useState([])
    const [unCheckedGroups, setUnCheckedGroups] = useState([]);
    const [checkedQuestions, setCheckedQuestions] = useState([])
    const [unCheckedQuestions, setUnCheckedQuestions] = useState([]);



    let { courseId } = useParams()

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
                width: '700px',
                height: 'auto',
                overflow: 'scroll',
                display: 'flow-root'
            }
        },
        input: {
          display: 'none',
        },
      }));

      const classes = useStyles();
      const hist = useHistory()


    useEffect(() => {
        axiosInstance
                    .get('exams/my-exams/' + courseId).then((res) => {
                        console.log(res)
                        setExams(res.data)
                    }).then(() => setLoading(false))
    }, [])      

    const handleDialogClose = () => {
        setDeleteAlert(false)
    }
    const handleEditDialogClose = () => {
        setEditPopup(false)
    }
    const handleGroupsDialogClose = () => {
        setGroupPopup(false)
    }
    function handleCheckAddChange(e, group){
        if(e.target.checked){
          setCheckedGroups([...checkedGroups, group])
          setUnCheckedGroups(unCheckedGroups.filter((gr) => gr !== group))
        } else {
          setCheckedGroups(checkedGroups.filter((gr) => gr !== group))
        }
      }
      function handleCheckRemoveChange(e, group){
        if(!e.target.checked){
            setUnCheckedGroups([...unCheckedGroups, group])
            setCheckedGroups(checkedGroups.filter((gr) => gr !== group))
        } else {
            setUnCheckedGroups(unCheckedGroups.filter((gr) => gr !== group))
        }
      }

      //--
      function handleCheckAddQuestionChange(e, question){
        if(e.target.checked){
          setCheckedQuestions([...checkedQuestions, question])
          setUnCheckedQuestions(unCheckedQuestions.filter((que) => que !== question))
        } else {
          setCheckedQuestions(checkedQuestions.filter((que) => que !== question))
        }
      }
      function handleCheckRemoveQuestionChange(e, question){
        if(!e.target.checked){
            setUnCheckedQuestions([...unCheckedQuestions, question])
            setCheckedQuestions(checkedQuestions.filter((que) => que !== question))
        } else {
            setUnCheckedQuestions(unCheckedQuestions.filter((que) => que !== question))
        }
      }
      const handleLessonChange = (event) => {
        const name = event.target.value;
        setExamDetails({...examDetails, lesson : name})
      };
    
    return(
        <div>
            {loading ? <div style={{position: 'absolute', marginTop: '100px', marginRight: '500px', color: 'red'}}>جاري التحميل</div> : 
            <div style={{ zIndex: '-4' }}>
                <div style={{ position: 'absolute', top: '14%', right: '22%', width: '76%', display: 'flex', flexDirection:'column' }}>
                    <h3 style={{borderBottom: '2px solid #ccc', margin: '10px 0', width: '15%'}}>امتحانات التدريب</h3>
                    <table style={{ borderSpacing: '0px 13px', width: '100%', borderCollapse: 'separate' }}>
                        <th align='right'>اسم الامتحان</th>
                        <th align='right'>ميعاد انتهاء الامتحان</th>
                        <th align='center'>عملية</th>
                        {exams.map((exam) => 
                            <tr>
                                <Button component={Link} variant="text" to="/"><td  style={{ height: 'auto', overflow: 'hidden' }}>{exam.name}</td></Button>
                                <td>{exam.end_at}</td>
                                <td align="center">
                                    <IconButton onClick={() => {
                                        setExamId(exam.id)
                                        setDeleteAlert(true)
                                    }} style={{ backgroundColor: '', color: '#FF5856', width: '40px', height: '40px' }} aria-label="delete">
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                    <Dialog onClose={handleDialogClose} style={{ width: '100%', height: 'auto', backgroundColor: 'rgba(0, 0, 0, 0.2) !important'}} aria-labelledby="customized-dialog-title"  open={deleteAlert}>
                                        <div style={{ backgroundColor: 'white', display: 'inline-flex', justifyContent: 'space-between', height: '80px', alignItems: 'center', flexDirection: 'column', flexWrap: 'wrap', width: '500px', padding: '10px 20px'  }}>
                                            <h4>هل انت متأكد من أنك تريد حذف هذا الامتحان ؟</h4>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '140px', padding: '5px' }}>
                                                <Button variant="contained" style={{ backgroundColor: '#ff5856', color: 'white' }} onClick={(e) => {
                                                    axiosInstance.delete('exams/exam_details/' + examId).then((res) => {
                                                        setDeleteAlert(false)
                                                        setExams(exams.filter((ex) => ex.id !== examId))
                                                    })
                                                }}>نعم</Button>
                                                <Button onClick={handleDialogClose} variant="contained" style={{ backgroundColor: '#3f51b5', color: 'white' }}>لا</Button>
                                            </div>
                                        </div>
                                    </Dialog>
                                    <IconButton style={{ backgroundColor: '', color: '#3f51b5', width: '40px', height: '40px' }} aria-label="delete" onClick={() => {
                                        setExamId(exam.id)
                                        setEditPopup(true)
                                        axiosInstance.get('exams/exam_details/' + exam.id).then((res) => {
                                        setExamDetails({
                                            name: res.data.name,
                                            description: res.data.description,
                                            color: res.data.color,
                                            start_at: res.data.start_at,
                                            end_at: res.data.end_at,
                                            lesson: res.data.lesson
                                        })
                                        console.log(res.data.start_at)
                                        {console.log(examDetails)}
                                        setLimit({
                                            hours: res.data.Limit.charAt(0) + res.data.Limit.charAt(1),
                                            minutes: res.data.Limit.charAt(3) + res.data.Limit.charAt(4),
                                            sec: '00'
                                        })
                                        axiosInstance.get('exams/uncheckQuestions/' + exam.id).then((res) => setNotAddedQuestions(res.data))
                                        axiosInstance.get('lessons/teacher_lessons/' + courseId).then((res) => setLessons(res.data))
                                        axiosInstance.get('exams/checkQuestions/' + exam.id).then((res) => setAddedQuestions(res.data))
                                    }).then(() => setEditLoad(false))
                                    }}>
                                        <EditIcon fontSize="small" />
                                    </IconButton>
                                    {editLoad ? '' : 
                                    <Dialog onClose={handleEditDialogClose} className={classes.dialog} style={{ width: '100%', height: 'auto', backgroundColor: 'rgba(0, 0, 0, 0.2) !important', display: 'flex', flexDirection: 'column'}} aria-labelledby="customized-dialog-title"  open={editPopup}>
                                        <div style={{ backgroundColor: 'white', display: 'flex', justifyContent: 'center', height: 'auto', alignItems: 'center', flexDirection: 'column', width: '100%', overflow: 'scroll'  }}>
                                            <TextField value={examDetails.name} onChange={(e) => setExamDetails({...examDetails, name: e.target.value})} className={classes.root} label="اسم الامتحان"/>
                                            <TextField value={examDetails.description} onChange={(e) => setExamDetails({...examDetails, description: e.target.value})} multiline className={classes.root} label="وصف الامتحان"/>
                                            <table style={{ borderSpacing: '0px 13px', width: '100%', height: '50px', borderCollapse: 'separate', padding: '40px'}}>
                                                <th align="right">محتوى السؤال</th>
                                                <th align="right">درجة السؤال</th>
                                                <th>إضافة</th>
                                                <section style={{ display: 'contents' }}>
                                                {notAddedQuestions == 0 ? '' : notAddedQuestions.map((ques) => 
                                                <tr>
                                                    <td>{ques.content}</td>
                                                    <td align="center">{ques.degree}</td>
                                                    <td align="center"><Checkbox onChange={(e) => handleCheckAddQuestionChange(e, ques.id)} /></td>
                                                </tr>)}
                                                {addedQuestions == 0 ? '' : addedQuestions.map((ques) => 
                                                <tr>
                                                    <td>{ques.content}</td>
                                                    <td align="center">{ques.degree}</td>
                                                    <td align="center"><Checkbox defaultChecked onChange={(e) => handleCheckRemoveQuestionChange(e, ques.id)} /></td>
                                                </tr>
                                                )}
                                                </section>
                                            </table>
                                            <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-around', margin: '10px 0 10px 0' }}>
                                            <span>فترة الامتحان من : </span>
                                            <MuiPickersUtilsProvider utils={DateMomentUtils}>
                                                <DateTimePicker
                                                    variant="dialog"
                                                    value={examDetails.start_at}
                                                    onChange={(e) => setExamDetails({...examDetails, start_at: moment(e).format('YYYY-MM-DDTHH:mm+02:00')})}
                                                    ampm={false}
                                                    onError={console.log}
                                                    disablePast
                                                    format="yyyy/MM/dd HH:mm"
                                                />
                                            </MuiPickersUtilsProvider>
                                            <span>الى : </span>
                                            <MuiPickersUtilsProvider utils={DateMomentUtils}>
                                                <DateTimePicker
                                                    onChange={(e) => setExamDetails({...examDetails, end_at: moment(e).format('YYYY-MM-DDTHH:mm+02:00')})}
                                                    value={examDetails.end_at}
                                                    variant="dialog"
                                                    ampm={false}
                                                    onError={console.log}
                                                    disablePast
                                                    format="yyyy/MM/dd HH:mm"
                                                />
                                            </MuiPickersUtilsProvider>
                                            </div>
                                            <div style={{ display: 'flex', width: '60%', alignItems: 'center', justifyContent: 'space-around', margin: '10px 0 10px 0'  }}>
                                                <span>زمن الامتحان : </span>
                                                <span>ساعة : </span>
                                                <input type="number" value={limit.hours} className="customInput" style={{ width: '50px', padding: '4px' }} placeholder="ساعة" onChange={(e) => setLimit({...limit, hours: e.target.value})} />
                                                <span>دقيقة : </span>
                                                <input type="number" value={limit.minutes} className="customInput" style={{ width: '50px', padding: '4px' }} placeholder="دقيقة" onChange={(e) => setLimit({...limit, minutes: e.target.value})} />
                                        </div>
                                    {console.log('ss', {...examDetails, Limit: `${limit.hours}:${limit.minutes}:${limit.sec}`})}

                                        <FormControl style={{ width: '150px', marginBottom: '10px' }}>
                                                        <Select
                                                        onChange={(e) => setExamDetails({...examDetails, color: e.target.value})}
                                                        value={examDetails.color}
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        displayEmpty
                                                        >
                                                        
                                                        <MenuItem value=""><span style={{ overflow: 'hidden' }}>اختر لون الامتحان</span></MenuItem>
                                                        <MenuItem style={{ backgroundColor: '#ff5856', }}  value="#ff5856"><span style={{ overflow: 'hidden', backgroundColor: '#ff5856', width: '100%', textAlign: 'center', color: 'white' }}>الاحمر</span></MenuItem>
                                                        <MenuItem style={{ backgroundColor: '#3f51b5', }}  value="#3f51b5"><span style={{ overflow: 'hidden', backgroundColor: '#3f51b5', width: '100%', textAlign: 'center', color: 'white' }}>الازرق</span></MenuItem>
                                                        <MenuItem style={{ backgroundColor: 'green', }} value="green"><span style={{ overflow: 'hidden', width: '100%', textAlign: 'center', color: 'white' }}>الاخضر</span></MenuItem>
                                                    </Select>
                                        </FormControl>
                                        <FormControl style={{ width: '450px', margin: '10px 0' }}>
                                                        <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={examDetails.lesson ? examDetails.lesson : ''}
                                                        displayEmpty
                                                        onChange={handleLessonChange}
                                                        >
                                                        
                                                        <MenuItem value=""><span style={{ overflow: 'hidden' }}> لا يمكن خوض الامتحان الا بعد مشهادة هذا الدرس (اختياري)</span></MenuItem>
                                                        {courseLessons.map((les) => <MenuItem value={les.id}><span style={{ overflow: 'hidden' }}>{les.name}</span></MenuItem>)}
                                                    </Select>
                                        </FormControl>
                                        {console.log({
                                        id: examId,
                                        name: examDetails.name,
                                        description: examDetails.description,
                                        start_at: examDetails.start_at,
                                        end_at: examDetails.end_at,
                                        color: examDetails.color,
                                        Limit: `${limit.hours}:${limit.minutes}`,
                                        lesson: lesson
                                    })}
                                        </div>
                                        <Button style={{ margin: '10px 10px' }} variant="contained" color="primary" onClick={() => {
                                                axiosInstance.post('exams/addQuestions/' + examId, {
                                                    check: checkedQuestions,
                                                    uncheck: unCheckedQuestions
                                                })
                                                
                                                axiosInstance.put('exams/exam_details/' + examId, {
                                                    course: courseId,
                                                    name: examDetails.name,
                                                    description: examDetails.description,
                                                    start_at: examDetails.start_at,
                                                    end_at: examDetails.end_at,
                                                    color: examDetails.color,
                                                    Limit: `${limit.hours}:${limit.minutes}:${limit.sec}`,
                                                    lesson: examDetails.lesson
                                                } ).then((res) => setEditPopup(false))
                                            }}>حفظ التغييرات</Button>
                                    </Dialog>}
                                    
                                    <IconButton style={{ backgroundColor: '', color: '#3f51b5', width: '50px', height: '50px' }} aria-label="delete" onClick={() => {
                                        setGroupPopup(true)
                                        axiosInstance.get('exams/uncheckGroupsExam/' + exam.id).then((res) => setNotAddedGroups(res.data))
                                        axiosInstance.get('exams/checkGroupsExam/' + exam.id).then((res) => setAddedGroups(res.data))
                                        setExamId(exam.id)
                                    }}>
                                        <GroupAddIcon fontSize="medium" />
                                    </IconButton>
                                    <Dialog onClose={handleGroupsDialogClose} className={classes.dialog} style={{ width: '100%', height: 'auto', backgroundColor: 'rgba(0, 0, 0, 0.2) !important'}} aria-labelledby="customized-dialog-title"  open={groupPopUp}>
                                        <div style={{ backgroundColor: 'white', display: 'flex', justifyContent: 'center', height: 'auto', alignItems: 'center', flexDirection: 'column', flexWrap: 'wrap', width: '100%', padding: '10px 0'  }}>
                                            <span style={{ fontSize: '18px', fontWeight: 'bold' }}>المجموعات المضاف اليها الامتحان</span>
                                            <ul>
                                                {notAddedGroups.length == 0 ? '' : notAddedGroups.map((group) => 
                                                <li><Checkbox onChange={(e) => handleCheckAddChange(e, group.id)} />{group.name}</li>
                                                )}
                                                {addedGroups.length == 0 ? '' : addedGroups.map((group) => 
                                                <li><Checkbox defaultChecked onChange={(e) => handleCheckRemoveChange(e, group.id)}/>{group.name}</li>
                                                )}
                                            </ul>
                                            <Button style={{ margin: '10px 0' }} variant="contained" color="primary" onClick={() => {
                                                axiosInstance.post('exams/addQuestions/' )
                                                
                                                axiosInstance.post('exams/addExamGroups/' + examId, {
                                                    check: checkedGroups,
                                                    uncheck: unCheckedGroups
                                                }).then((res) => setGroupPopup(false))
                                            }}>حفظ التغييرات</Button>
                                            
                                        </div>
                                    </Dialog>
                                    {console.log('ch', checkedQuestions)}
                                    {console.log('un', unCheckedQuestions)}
                                </td>
                            </tr>
                        )}
                    </table>
                </div>
            </div>}
        </div>
    )
}

export default CourseExamsPage; 