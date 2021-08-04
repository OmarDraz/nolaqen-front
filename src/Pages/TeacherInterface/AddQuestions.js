import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import TextField from "@material-ui/core/TextField";
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import SuccessIcon from '../../svg/SuccessIcon.gif'
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import DeleteIcon from '@material-ui/icons/Delete';
import Divider from '@material-ui/core/Divider';
import ClearIcon from '@material-ui/icons/Clear';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
  import {
      Accordion,
      AccordionDetails,
      AccordionSummary,
    Typography,
  } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import axiosInstance from "../../axios";
import QuestionsSvg from '../../svg/questions.svg'
import { makeStyles } from '@material-ui/core/styles';
import {
    withStyles,
  } from "@material-ui/core";

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
        "& .MuiSelect-select": {
            height: '27px'
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



const AddQuestionsPage = () => {
    const [questionType, setQuestionType] = useState('');
    const [successPopup, setSuccessPopUp] = useState(false)
    const [answer, setAnswer] = useState([]);
    const [questionDetails, setQuestionDetails] = useState({});
    const [multipleChoiceContent, setMultipleChoiceContent] = useState('')
    const [trueFalseChoiceContent, settrueFalseChoiceContent] = useState('')
    const [selectedCourseName, setSelectedCourseName] = useState('');
    const [questionDegree, setQuetionDegree] = useState()
    const [sendedAnswers, setSendedAnswers] = useState([]);
    const [teacherCourses, setTeacherCourses] = useState([]);
    const [savedQuestions, setSavedQuestions] = useState([]);
    const [courseId, setCourseId] = useState();

      const classes = useStyles();

    useEffect(() => {
        axiosInstance.get('courses/teacher-courses').then((res) => {
            console.log(res.data)
            setTeacherCourses(res.data)
        })
    }, [])

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
            height: "25px",
            overflow: 'hidden'
          },
          "& legend": {
            textAlign: "right",
          }
        }
      })(TextField);

    const handleRightAnswer = index => e => {

        let newArr = [...sendedAnswers];
        newArr[index]['is_correct'] = !newArr[index]['is_correct'];
        console.log(e)
    
        setSendedAnswers(newArr);
    }


    const handleAddAnswer = () => {
        setSendedAnswers([...sendedAnswers,answer])
    }
    const handlePopUpClose = () => {
        setSuccessPopUp(false);
      };
console.log('answer',answer)
console.log('sended',sendedAnswers)



    const questionFormRender = () => {
        if (questionType == 'trueFalse') {
            return (
                <div style={{marginTop: '10px', backgroundColor: 'white', boxShadow: '1px 1px 8px -4px black', transition: '1s .5s ease' }}>
                    <form onSubmit={(e) => {
                                        setSavedQuestions([...savedQuestions, {
                                            course: courseId,
                                            isMultiple: false,
                                            isTrueFalse: true,
                                            content: trueFalseChoiceContent,
                                            degree: questionDegree,
                                            photo: null,
                                            answer: answer
                                        }])
                                        e.preventDefault()
                                    }}>
                        <div style={{ display: 'grid', gridTemplateColumns: "50% 50%", padding: '20px', gridGap: '20px'}}>
                            <TextareaAutosize required onChange={(e) => settrueFalseChoiceContent(e.target.value)} style={{ border: '0.1px solid grey', outline: 'none', padding: '5px', overflow: 'scroll' }} className="textArea" aria-label="minimum height" rowsMin={3} placeholder="محتوى السؤال" />
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <FormControl component="fieldset" style={{ width: '100%' }}>
                                    <FormLabel required component="legend" style={{ overflow: 'hidden' }}><span>الاجابة الصحيحة</span></FormLabel>
                                    <RadioGroup onChange={(e) => setAnswer([
                                    {
                                        is_correct: false,
                                        answer: e.target.value == 'خطأ' ? 'صح' : 'خطأ'

                                    }, {
                                        is_correct: true,
                                        answer: e.target.value
                                    }])} aria-label="gender" name="gender1" style={{ display: 'flex', flexDirection: 'row' }}>
                                        <FormControlLabel value="صح" control={<Radio />} label={<span>صح</span>} />
                                        <FormControlLabel value="خطأ" control={<Radio />} label={<span>خطأ</span>} />
                                    </RadioGroup>
                                </FormControl>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    {/* <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
                                    <label htmlFor="icon-button-file">
                                        <IconButton color="primary" aria-label="upload picture" component="span">
                                            <PhotoCamera />
                                        </IconButton>
                                        <span>ارفق صورة</span>
                                    </label> */}
                                    <TextField required type="number" className={classes.root}  style={{ width: '80px', padding: '4px' }} label={<span>درجة</span>} onChange={(e) => {
                                        setQuetionDegree(parseInt(e.target.value))
                                    }} />
                                    <Button type="submit" onClick={(e) => e.preventDefault} style={{ backgroundColor: '#FF5856', height: '40px', color: 'white', marginLeft: '15px' }}>حفظ</Button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            )
        } else if (questionType == 'mcq') {
            return (
                <div style={{marginTop: '10px', backgroundColor: 'white', boxShadow: '1px 1px 8px -4px black', transition: '1s .5s ease' }}>
                    <form onSubmit={(e) => {
                                    setSavedQuestions([...savedQuestions, {
                                        course: courseId,
                                        isMultiple: true,
                                        isTrueFalse: false,
                                        content: multipleChoiceContent,
                                        degree: questionDegree,
                                        photo: null,
                                        answer: sendedAnswers
                                    }])
                                    setSendedAnswers([])
                                    setMultipleChoiceContent('')
                                    setQuetionDegree()
                                    e.preventDefault()
                                }}>
                    <div style={{ display: 'grid', gridTemplateColumns: "50% 50%", padding: '20px', gridGap: '20px'}}>
                        <TextareaAutosize required onChange={(e) => {
                            setMultipleChoiceContent(e.target.value)
                        }} style={{ border: '0.1px solid grey', outline: 'none', padding: '5px', overflow: 'scroll' }} className="textArea" aria-label="minimum height" rowsMin={3} placeholder="محتوى السؤال" />
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <TextField required className={classes.root} onChange={(e) => {
                                    setAnswer({
                                        is_correct: false,
                                        answer: e.target.value
                                    })
                                }}  label={<span>ادخل اجابة</span>} style={{ padding: '4px', margin: '0' }} />
                                <Button color="primary" onClick={handleAddAnswer} variant="contained" size="medium">اضف اجابة</Button>
                            </div>
                            <div style={{ display: sendedAnswers.length == 0 ? 'none' : 'block' }}>
                            <FormControl required component="fieldset" className={classes.formControl}>
                                <FormGroup style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <ul>
                                
                                {sendedAnswers.map((e, index) => 
                                    <li>
                                    <FormControlLabel
                                    style={{ overflow: 'hidden' }}
                                    control={<Checkbox onChange={handleRightAnswer(index)}  name="" />}
                                    label={<span>{e.answer}</span>}
                                />
                                {console.log(index)}
                                <IconButton onClick={() => {
                                    setSendedAnswers(sendedAnswers.filter((y) => e.answer !== y.answer))
                                }} color="primary" aria-label="upload picture" component="span">
                                        <ClearIcon />
                                </IconButton>
                                </li>
                                )}
                                </ul>
                                
                                </FormGroup>
                            </FormControl>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                {/* <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
                                <label htmlFor="icon-button-file">
                                    <IconButton color="primary" aria-label="upload picture" component="span">
                                        <PhotoCamera />
                                    </IconButton>
                                    <span>ارفق صورة</span>
                                </label> */}
                                <TextField required type="number" className={classes.root}  style={{ width: '80px', padding: '4px' }} label={<span>درجة</span>} onChange={(e) => {
                                        setQuetionDegree(parseInt(e.target.value))
                                    }} />
                                <Button type="submit" style={{ backgroundColor: '#FF5856', height: '40px', color: 'white', marginLeft: '15px' }}>حفظ</Button>

                            </div>
                        </div>
                    </div>
                    </form>
                </div>
            )
        } else {
            return <img src={QuestionsSvg} style={{ margin: '20px auto', width: '80%' }} />
        }
    }

    const handleQuestionTypeChange = (event) => {
        setQuestionType(event.target.value);
      };

    
    return(
        <div>
            <div style={{ zIndex: '-4' }}>
                <div style={{ position: 'absolute', top: '14%', right: '22%', width: '76%', display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center' }}>
                                <FormControl style={{ width: '300px' }}>
                                    <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={selectedCourseName}
                                    displayEmpty
                                    onChange={(e) => {
                                        setCourseId(e.target.value)
                                        setSelectedCourseName(e.target.value)
                                    }}
                                    >
                                    
                                    <MenuItem value=""><span style={{ overflow: 'hidden' }}>اختر التدريب المراد اضافة اسئلة اليه</span></MenuItem>

                                    {teacherCourses.map((e) => <MenuItem value={e.id}><span style={{ overflow: 'hidden' }}>{e.name}</span></MenuItem>)}
                                </Select>
                            </FormControl>
                    {courseId ? 
                    <>
                        <h3 style={{borderBottom: '2px solid #ccc', margin: '10px 0', textAlign: 'center', width: '15%'}}>إضافة اسئلة</h3>
                        <div style={{display: 'flex', width: '700px', flexDirection: 'column', height: 'auto', padding: '10px 0'}}>
                        <div style={{ display: 'flex', width: '700px', justifyContent: 'space-around', alignItems:'center', backgroundColor: 'white', height: '50px', boxShadow: '1px 1px 8px -4px black' }}>
                            <span>حدد نوع السؤال</span>
                            <FormControl style={{ width: '200px' }}>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={questionType}
                                displayEmpty
                                onChange={handleQuestionTypeChange}
                                >
                                
                                <MenuItem value=""><span style={{ overflow: 'hidden' }}>لا شئ</span></MenuItem>
                                <MenuItem value={'trueFalse'}><span style={{ overflow: 'hidden' }}>صح وغلط</span></MenuItem>
                                <MenuItem value={'mcq'}><span style={{ overflow: 'hidden' }}>اختيار من متعدد</span></MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        {
                            questionFormRender()
                        }
                        {savedQuestions.length > 0 ? <h3 style={{borderBottom: '2px solid #ccc', margin: '10px 0', textAlign: 'center', width: '30%'}}>الاسئلة التي تمت اضافتها</h3> : ''}

                            {savedQuestions.map((question) => 
                            <div style={{marginTop: '10px', overflow: 'hidden'}}>
                                <Accordion style={{overflow: 'hidden'}}>
                                    <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                    >
                                    <Typography><span>{question.content}</span></Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                    <div style={{ width: '100%' ,display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
                                        <div>
                                            <span>الاجابة : </span>
                                            {question.answer.map((e) => <li>{e.answer}</li>)}
                                        </div>
                                        <span style={{ justifyItems: 'center' }}>الدرجة : {question.degree}</span>
                                        <IconButton onClick={() => setSavedQuestions(savedQuestions.filter((y) => question.content !== y.content))} color="primary" aria-label="upload picture" component="span">
                                            <DeleteIcon />
                                        </IconButton>
                                    </div>
                                    </AccordionDetails>
                                </Accordion>
                                <Divider />
                            </div>)}
                        {savedQuestions.length > 0 ? <Button onClick={() => {
                            axiosInstance
                                        .post('questions/question-post/' + courseId, savedQuestions).then((res) => {
                                            console.log(res)
                                        })
                            setSavedQuestions([])
                            setSuccessPopUp(true)
                            setTimeout(() => {
                                setSuccessPopUp(false)
                            }, 3000)
                        }} color="primary" variant="contained">تسجيل الاسئلة</Button> : ''}
                    </div>
                    <Dialog onClose={handlePopUpClose} style={{ width: '100%', height: 'auto', backgroundColor: 'rgba(0, 0, 0, 0.2) !important'}} aria-labelledby="customized-dialog-title" open={successPopup}>
                        <div style={{ backgroundColor: 'white', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', flexWrap: 'wrap', width: '500px', padding: '10px 20px'  }}>
                              <img src={SuccessIcon} style={{ width: '80px', height: 'auto' }} />
                              <span style={{ fontSize: '16px', fontWeight: 'bold' }}>تم حفظ الاسئلة بنجاح</span>
                        </div>
                    </Dialog>
                    </>
             : <img src={QuestionsSvg} style={{ margin: '20px auto', width: '80%' }} />}
                    
                </div>
                {console.log(courseId)}
                {console.log(savedQuestions)}
            </div>
        </div>
    )
}

export default AddQuestionsPage;