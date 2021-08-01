import React, { useState, useEffect } from 'react';
import TeacherHeader from './Header.js';
import Dialog from '@material-ui/core/Dialog';
import TextField from "@material-ui/core/TextField";
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { DateTimePicker, KeyboardDateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateMomentUtils from '@date-io/moment';

import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import DeleteIcon from '@material-ui/icons/Delete';
import Divider from '@material-ui/core/Divider';
import ClearIcon from '@material-ui/icons/Clear';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import * as moment  from 'moment';
import MuiDialogContent from '@material-ui/core/DialogContent';
import SimpleDialog from './dialog';
import MuiDialogActions from '@material-ui/core/DialogActions';
import FormGroup from '@material-ui/core/FormGroup';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
  } from "react-router-dom";
  import {
      Accordion,
      AccordionDetails,
      AccordionSummary,
    Typography,
  } from "@material-ui/core";
import SidePanel from './SidePanel.js';
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@material-ui/icons/Edit';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { useParams } from 'react-router-dom';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { Container, Paper, Box } from '@material-ui/core';
import axiosInstance from "../../axios";
import { makeStyles } from '@material-ui/core/styles';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Menu from "@material-ui/core/Menu";
import NoLogs from '../../svg/NoLogs.svg'
import {
    withStyles,
    MuiThemeProvider,
    createMuiTheme,
  } from "@material-ui/core";
import axios from 'axios';

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
            flexDirection: 'row !important'
        },
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    input: {
      display: 'none',
    },
    dialog: {
        "& .MuiDialog-paperWidthSm": {
            width: '700px'
        }
    },
  }));



const QuestionsPage = () => {
    const [courseId, setCourseId] = useState();
    const [questionDetails, setQuestionDetails] = useState();
    const [questionAnswers, setQuestionAnswers] = useState();
    const [questionId, setQuestionId] = useState();
    const [isMultiple, setIsMultiple] = useState()
    const [isTrueFalse, setIsTrueFalse] = useState()
    const [editPopup, setEditPopup] = React.useState(false);
    const [editLoad, setEditLoad] = useState(true);
    const [answer, setAnswer] = useState({});
    const [query, setQuery] = useState('');
    const [deleteAlert, setDeleteAlert] = React.useState(false);
    const [teacherCourses, setTeacherCourses] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [courseSelected, setCourseSelected] = useState('');
    const [start_at, setStartAt] = useState(new Date());
    const [end_at, setEndAt] = useState(new Date());

    const lowerCaseQuery = query.toLowerCase();


    const columns = [
        {
            field: "id",
            headerName: "رقم الاجابة",
            flex: 1,
        },
        {
            field: "content",
            headerName: "محتوى الاجابة",
            flex: 5,
        },
        {
            field: "degree",
            headerName: "درجة السؤال",
            flex: 1,
        }
    ]
    const handleDialogClose = () => {
        setDeleteAlert(false)
    }
    const handleEditDialogClose = () => {
        setEditPopup(false)
    }
    const handleCheckboxChange = (e, index) => {
        if(e.target.checked){
            questionAnswers[index].is_correct = true
        } else{
            questionAnswers[index].is_correct = false
        }
        console.log('hh',questionAnswers)
    }
    const handleAddAnswer = () => {
        setQuestionAnswers([...questionAnswers,answer])
    }
    useEffect(() => {
        axiosInstance.get('courses/teacher-courses').then((res) => {
            console.log(res.data)
            setTeacherCourses(res.data)
        })
    }, [])


      const classes = useStyles();

    const StyledFormControlLabel = withStyles({
        root: {
          "& label": {
            fontFamily: "Cairo",
          }
        }
      })(FormControlLabel);
      const StyledTextField = withStyles({
        root: {
          "& label": {
            left: "auto",
            fontFamily: "Cairo",
            height: "20px",
            overflow: 'hidden'
          },
          "& legend": {
            textAlign: "right",
          }
        }
      })(TextField);

    return(
        <div>
            <div style={{ zIndex: '-4' }}>
                <div style={{ position: 'absolute', top: '14%', right: '22%', width: '76%', display: 'flex', flexDirection:'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems:'center', }}>
                        <h3 style={{borderBottom: '2px solid #ccc', margin: '10px 0', width: '15%'}}>كل الاسئلة</h3>
                        <TextField className={classes.root} style={{ marginLeft: '17%', display: questions.length > 0 ? 'block' : 'none' }} label={<span>بحث ..</span>}  onChange={(e) => {
                                        setQuery(e.target.value)}} />
                        <FormControl style={{ width: '300px' }}>
                                    <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={courseSelected}
                                    displayEmpty
                                    onChange={(e) => {
                                      axiosInstance.get('exams/questions/' + e.target.value).then((res) => {
                                        setQuestions(res.data)
                                      }).then(() => {
                                        setCourseId(e.target.value)
                                      })
                                      setCourseSelected(e.target.value)
                                    }}
                                    >
                                    <MenuItem value=""><span style={{ overflow: 'hidden' }}>اختر التدريب المراد اضافة اسئلة اليه</span></MenuItem>
                                    {teacherCourses.map((e) => <MenuItem value={e.id}><span style={{ overflow: 'hidden' }}>{e.name}</span></MenuItem>)}
                                </Select>
                        </FormControl>
                    </div>
                    <table style={{ borderSpacing: '0px 13px', width: '100%', borderCollapse: 'separate' }}>
                            <th align="right">محتوى السؤال</th>
                            <th align="center">درجة السؤال</th>
                            <th>عملية</th>
                            {questions.length == 0 ? <tr align="center" style={{ margin: 'auto' }}><td colSpan={3}><img src={NoLogs} style={{ width: '30%', marginTop: '10px', height: 'auto' }} /><td align="center" style={{ fontWeight: 'bold' }}>لا يوجد اسئلة</td></td></tr> :
                            questions.length == 0 ? <tr>لا يوجد اسئلة</tr> : questions.filter((row) => row.content.toLowerCase().includes(lowerCaseQuery)).map((question) => 
                            <tr>
                                <td style={{ width: '50%', margin: '10px' }}>{question.content}</td>
                                <td align="center">{question.degree}</td>
                                <td align="center">
                                <IconButton onClick={() => {
                                        setQuestionId(question.id)
                                        setDeleteAlert(true)
                                    }} style={{ backgroundColor: '', color: '#FF5856', width: '40px', height: '40px' }} aria-label="delete">
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                    <Dialog onClose={handleDialogClose} style={{ width: '100%', height: 'auto', backgroundColor: 'rgba(0, 0, 0, 0.2) !important'}} aria-labelledby="customized-dialog-title"  open={deleteAlert}>
                                        <div style={{ backgroundColor: 'white', display: 'inline-flex', justifyContent: 'space-between', height: '80px', alignItems: 'center', flexDirection: 'column', flexWrap: 'wrap', width: '500px', padding: '10px 20px'  }}>
                                            <h4>هل انت متأكد من أنك تريد حذف هذا السؤال ؟</h4>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '140px', padding: '5px' }}>
                                                <Button variant="contained" style={{ backgroundColor: '#ff5856', color: 'white' }} onClick={(e) => {
                                                    axiosInstance.delete('questions/question_edit/' + questionId).then((res) => {
                                                        setDeleteAlert(false)
                                                        setQuestions(questions.filter((ques) => ques.id !== questionId))
                                                    })
                                                }}>نعم</Button>
                                                <Button onClick={handleDialogClose} variant="contained" style={{ backgroundColor: '#3f51b5', color: 'white' }}>لا</Button>
                                            </div>
                                        </div>
                                    </Dialog>
                                    <IconButton style={{ backgroundColor: '', color: '#3f51b5', width: '40px', height: '40px' }} aria-label="delete" onClick={() => {
                                        setQuestionId(question.id)
                                        setEditPopup(true)
                                        axiosInstance.get('questions/question_edit/' + question.id).then((res) => {
                                            setQuestionDetails({
                                                content: res.data.content,
                                                degree: res.data.degree,
                                            })
                                            console.log(res.data)
                                            setQuestionAnswers(res.data.answer)
                                            setIsMultiple(res.data.isMultiple)
                                            setIsTrueFalse(res.data.isTrueFalse)

                                        }).then(() => {
                                            setEditLoad(false)
                                        })
                                    }}>
                                        <EditIcon fontSize="small" />
                                    </IconButton>
                                    {editLoad ? '' : 
                                    <Dialog onClose={handleEditDialogClose} className={classes.dialog} style={{ width: '100%', height: 'auto', backgroundColor: 'rgba(0, 0, 0, 0.2) !important'}} aria-labelledby="customized-dialog-title"  open={editPopup}>
                                        <div style={{ backgroundColor: 'white', display: 'flex', justifyContent: 'center', height: 'auto', alignItems: 'center', flexDirection: 'column', flexWrap: 'wrap', width: '100%'  }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-around', width: '70%', alignItems: 'center' }}>
                                                <TextField style={{ width: '250px' }} className={classes.root} label="محتوى السؤال" multiline value={questionDetails.content} onChange={(e) => setQuestionDetails({...questionDetails, content: e.target.value})} />
                                                <span>درجة السؤال</span>
                                                <TextField type="number" className={classes.root} style={{ width: '50px', padding: '4px' }} value={questionDetails.degree} placeholder="درجة" onChange={(e) => {
                                                    setQuestionDetails({...questionDetails, degree: parseInt(e.target.value)})
                                                }} />
                                            </div>
                                        <h4 style={{borderBottom: '2px solid #ccc', margin: '10px 0', width: '15%'}}>اجابات السؤال</h4>
                                        {isMultiple ? 
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <input className="customInput" onChange={(e) => {
                                            setAnswer({
                                                is_correct: false,
                                                answer: e.target.value
                                            })
                                        }}  placeholder="ادخل اجابة" style={{ padding: '4px', margin: '0' }} />
                                        <Button color="primary" onClick={handleAddAnswer} variant="contained" size="medium" style={{ margin: '10px 0' }}>اضف اجابة</Button>
                                        </div> : ''}
                                        
                                        {questionAnswers.length == 0 ? <span>لا يوجد إجابات</span> : questionAnswers.map((answer, index) => 
                                        <ul>
                                            <li>{isMultiple ? <div style={{ display: 'flex', alignItems: 'center' }}>{answer.answer}<Checkbox defaultChecked={answer.is_correct ? true : false} onChange={(e) => handleCheckboxChange(e, index)}/><IconButton onClick={() => {
                                                    setQuestionAnswers(questionAnswers.filter((y) => answer.answer !== y.answer))
                                                }} color="primary" aria-label="upload picture" component="span">
                                                        <ClearIcon />
                                            </IconButton></div>: 
                                            <FormControl component="fieldset" style={{ width: '100%' }}>
                                            <span>{`الاجابة الصحيحة هي: ${answer.answer == "true" ? 'صح' : 'خطأ'}`}</span>

                                                <RadioGroup onChange={(e) => setAnswer({
                                                    is_correct: true,
                                                    answer: e.target.value
                                                })} style={{ display: 'flex', flexDirection: 'row' }}>
                                                    <FormControlLabel value="true"  control={<Radio />} label={<span>صح</span>} />
                                                    <FormControlLabel value="false" control={<Radio  />} label={<span>خطأ</span>} />
                                                </RadioGroup>
                                            </FormControl>
                            }
                                            
                                            
                                            </li>
                                        </ul>)}
                                        </div>
                                        <Button style={{ margin: '10px 0' }} variant="contained" color="primary" onClick={() => {
                                            console.log('k', questionDetails.content)
                                            console.log('d', questionDetails.degree)
                                            console.log(questionAnswers)
                                            axiosInstance.put('questions/question_edit/' + questionId, {
                                                course: courseId,
                                                isMultiple: isMultiple,
                                                isTrueFalse: isTrueFalse,
                                                photo: null,
                                                content: questionDetails.content,
                                                degree: questionDetails.degree,
                                                answer: isMultiple ? questionAnswers : [answer]
                                            }).then(() => setEditPopup(false))
                                        }}>حفظ التغييرات</Button>
                                    </Dialog>}
                                </td>
                            </tr> )}
                        </table>
                        {console.log(questionDetails)}
                      
                        {console.log(questionAnswers)}
                        <Button component={Link} to="/teacher/add-questions" variant="contained" color="primary" style={{ borderRadius: '15px', position: 'fixed', bottom: '10px', left: '10px', width: '8%', height: '50px' }}> + أضف اسئلة</Button>
                </div>
            </div>
        </div>
    )
}

export default QuestionsPage;