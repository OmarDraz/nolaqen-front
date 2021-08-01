import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import TextField from "@material-ui/core/TextField";
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { DateTimePicker, KeyboardDateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateMomentUtils from '@date-io/moment';
import RenderCellExpand from "./renderCellExpand";
import SuccessIcon from '../../svg/SuccessIcon.gif'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import * as moment  from 'moment';
import Button from "@material-ui/core/Button";
import { DataGrid } from '@material-ui/data-grid';
import axiosInstance from "../../axios";
import { makeStyles } from '@material-ui/core/styles';
import Exams from '../../svg/Exams.svg'
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
        "& .MuiInputBase-input": {
            fontFamily: 'Cairo'
        },
        "& .MuiFormControl-root": {
            flexDirection: 'row !important'
        },
        "& .MuiDataGrid-window":{
          overflow: 'hidden !important'
        },
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    input: {
      display: 'none',
    },
  }));



const AddExamPage = () => {
    const [courseId, setCourseId] = useState();
    const [successPopup, setSuccessPopUp] = useState(false)
    const [course, setCourse] = useState('')
    const [examHours, setExamHours] = useState();
    const [examMinutes, setExamMinutes] = useState();
    const [totalDegree, setTotalDegree] = useState([]);
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [teacherCourses, setTeacherCourses] = useState([]);
    const [courseLessons, setLessons] = useState([])
    const [lesson, setLesson] = useState();
    const [questions, setQuestions] = useState([]);
    const [examDetails, setExamDetails] = useState({
      examName: '',
      examColor: '',
      examDescription: '',
      start_at: new Date(),
      end_at: new Date()
    })


    const handleLessonChange = (event) => {
      const name = event.target.value;
      setLesson(name);
    };
    const handlePopUpClose = () => {
      setSuccessPopUp(false);
    };

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
            renderCell: RenderCellExpand
        },
        {
            field: "degree",
            headerName: "درجة السؤال",
            flex: 1,
        }
    ]


    useEffect(() => {
        axiosInstance.get('courses/teacher-courses').then((res) => {
            console.log(res.data)
            setTeacherCourses(res.data)
        }).then(() => {
          axiosInstance.get('lessons/teacher_lessons/' + courseId).then((res) => setLessons(res.data))
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
            <form onSubmit={(e) => {
                        axiosInstance
                                    .post('exams/add-exam', {
                                      name: examDetails.examName,
                                      course: courseId,
                                      start_at: examDetails.start_at,
                                      end_at: examDetails.end_at,
                                      Limit: `${examHours}:${examMinutes}:00`,
                                      description: examDetails.examDescription,
                                      color: examDetails.examColor,
                                      question: selectedQuestions,
                                      lesson: lesson,
                                      degree: totalDegree.reduce((accumulator, n) => {
                                        return accumulator + n;
                                      })

                                    }).then((res) => {
                                      setExamDetails({
                                        examName: '',
                                        examColor: '',
                                        examDescription: '',
                                        start_at: new Date(),
                                        end_at: new Date()
                                      })
                                      setLesson()
                                      setQuestions([])
                                      setTotalDegree([])
                                      setSuccessPopUp(true)
                                      setTimeout(() => {
                                        setSuccessPopUp(false)
                                      }, 3000)
                                    })
                      e.preventDefault()
                      
                      }
                      }>
                        <Dialog onClose={handlePopUpClose} style={{ width: '100%', height: 'auto', backgroundColor: 'rgba(0, 0, 0, 0.2) !important'}} aria-labelledby="customized-dialog-title" open={successPopup}>
                        <div style={{ backgroundColor: 'white', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', flexWrap: 'wrap', width: '500px', padding: '10px 20px'  }}>
                              <img src={SuccessIcon} style={{ width: '80px', height: 'auto' }} />
                              <span style={{ fontSize: '16px', fontWeight: 'bold' }}>تم حفظ الامتحان بنجاح</span>
                        </div>
                    </Dialog>
                <div style={{ position: 'absolute', top: '14%', right: '22%', width: '76%', display: 'flex', flexDirection:'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems:'center', }}>
                  <h3 style={{borderBottom: '2px solid #ccc', margin: '10px 0', width: '15%'}}>إضافة امتحان</h3>
                  <FormControl style={{ width: '300px' }}>
                              <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={course}
                              displayEmpty
                              onChange={(e) => {
                                axiosInstance.get('exams/questions/' + e.target.value).then((res) => {
                                  setQuestions(res.data)
                                }).then(() => {
                                  setCourseId(e.target.value)
                                }).then(() => {
                                  axiosInstance.get('lessons/teacher_lessons/' + e.target.value).then((res) => {
                                    setLessons(res.data)
                                  })
                                  setCourse(e.target.value)
                                })
                              }}
                              >
                              
                              <MenuItem value=""><span style={{ overflow: 'hidden' }}>اختر التدريب المراد اضافة امتحان له</span></MenuItem>

                              {teacherCourses.map((e) => <MenuItem value={e.id}><span style={{ overflow: 'hidden' }}>{e.name}</span></MenuItem>)}
                          </Select>
                      </FormControl>
              </div>
                  {course ? 
                  <>
              <div style={{ display: 'flex', width: '42%', justifyContent: 'space-between' }}>
                  <TextField required style={{ flexDirection: 'row' }} className={classes.root} onChange={(e) => setExamDetails({...examDetails, examName: e.target.value})} value={examDetails.examName} label="اسم الامتحان"/>
                  <TextField required value={examDetails.examDescription} className={classes.root} onChange={(e) => setExamDetails({...examDetails, examDescription: e.target.value})} multiline style={{ width: '270px' }} label="وصف الامتحان"/>
              </div>
              <h3 style={{borderBottom: '2px solid #ccc', margin: '20px 0', width: '20%'}}>إضافة اسئلة الامتحان</h3>
              <div style={{ height: 450, width: '100%', margin: 'auto', overflow: 'hidden' }}>
                  <DataGrid
                      className={classes.root}
                      components={{
                          NoRowsOverlay: () => {
                              return <span style={{ margin: 'auto', overflow: 'hidden'}}>لا يوجد اسئلة لهذه الدورة التدريبية  </span>
                          }
                      }}
                      onSelectionModelChange={(e) => {
                          const selectedIDs = new Set(e.selectionModel);
                          console.log(selectedIDs);
                          const selectedRowData = questions.filter((row) =>
                              selectedIDs.has(row.id)
                          );
                          console.log("select rowData:", selectedRowData);
                          setTotalDegree(selectedRowData.map(function(row){
                            return row.degree
                          }))
                          setSelectedQuestions(selectedRowData.map(function(item){
                            return {
                              question: item.id
                            }
                          }));
                      }}autopageSize scrollbarSize={20} checkboxSelection rows={questions} columns={columns}
                      
                      />
              </div>
              {console.log('total', totalDegree)}
              <h3 style={{borderBottom: '2px solid #ccc', margin: '20px 0', width: '20%'}}>اعدادات الامتحان</h3>
              
              <div style={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '0 0 10px 0' }}>
                <span>فترة الامتحان من : </span>
                <MuiPickersUtilsProvider utils={DateMomentUtils}>
                    <DateTimePicker
                        variant="dialog"
                        ampm={false}
                        required
                        value={examDetails.start_at}
                        onChange={(e) => setExamDetails({...examDetails, start_at: moment(e).format('YYYY-MM-DDTHH:mm+02:00')})}
                        onError={console.log}
                        disablePast
                        format="yyyy/MM/dd HH:mm"
                    />
                </MuiPickersUtilsProvider>
                <span>الى : </span>
                <MuiPickersUtilsProvider utils={DateMomentUtils}>
                    <DateTimePicker
                        variant="dialog"
                        required
                        ampm={false}
                        value={examDetails.end_at}
                        onChange={(e) => setExamDetails({...examDetails, end_at: moment(e).format('YYYY-MM-DDTHH:mm+02:00')})}
                        onError={console.log}
                        disablePast
                        format="yyyy/MM/dd HH:mm"
                    />
                </MuiPickersUtilsProvider>
              </div>
              <div style={{ display: 'flex', width: '30%', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span>زمن الامتحان : </span>
                      <span>ساعة : </span>
                      <input required type="number" value={examHours} className="customInput" style={{ width: '50px', padding: '4px' }} placeholder="ساعة" onChange={(e) => setExamHours(parseInt(e.target.value))} />
                      <span>دقيقة : </span>
                      <input required type="number" value={examMinutes} className="customInput" style={{ width: '50px', padding: '4px' }} placeholder="دقيقة" onChange={(e) => setExamMinutes(parseInt(e.target.value))} />
              </div>
              <FormControl style={{ width: '150px' }} required>
                              <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={examDetails.examColor}
                              displayEmpty
                              onChange={(e) => setExamDetails({...examDetails,examColor:e.target.value})}
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
                              value={lesson ? lesson : ''}
                              displayEmpty
                              onChange={handleLessonChange}
                              >
                              
                              <MenuItem value=""><span style={{ overflow: 'hidden' }}> لا يمكن خوض الامتحان الا بعد مشهادة هذا الدرس (اختياري)</span></MenuItem>
                              {courseLessons.map((les) => <MenuItem value={les.id}><span style={{ overflow: 'hidden' }}>{les.name}</span></MenuItem>)}
                          </Select>
              </FormControl>
              <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0', justifyContent: 'flex-end' }}> 
                      <Button color="primary" variant="contained" type="submit">حفظ الامتحان</Button>
                      {console.log('q',selectedQuestions)}
              </div>
              </>
                  : <img src={Exams} style={{ height: 'auto', width: '60%', margin: 'auto' }} />}
                    
                </div>
                </form>
            </div>
        </div>
    )
}

export default AddExamPage;