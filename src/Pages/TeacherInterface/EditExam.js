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
            flexDirection: 'row !impoertant'
        },
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    input: {
      display: 'none',
    },
  }));



const EditExamPage = () => {
    const [courseId, setCourseId] = useState();
    const [examName, setExamName] = useState('');
    const [examColor, setExamColor] = useState('');
    const [examDescription, setExamDescription] = useState('');
    const [examHours, setExamHours] = useState();
    const [examMinutes, setExamMinutes] = useState();
    const [selectedQuestions, setSelectedQuestions] = useState();
    const [teacherCourses, setTeacherCourses] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [start_at, setStartAt] = useState(new Date());
    const [end_at, setEndAt] = useState(new Date());

    let { examId } = useParams()

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


    useEffect(() => {
        axiosInstance.get('exams/exam_details/' + examId).then((res) => {
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
                        <h3 style={{borderBottom: '2px solid #ccc', margin: '10px 0', width: '15%'}}>إضافة امتحان</h3>
                    <div style={{ display: 'flex', width: '42%', justifyContent: 'space-between' }}>
                        <TextField style={{ flexDirection: 'row' }} className={classes.root} onChange={(e) => setExamName(e.target.value)} value={examName} label="اسم الامتحان"/>
                        <TextField value={examDescription} className={classes.root} onChange={(e) => setExamDescription(e.target.value)} multiline style={{ width: '270px' }} label="وصف الامتحان"/>
                    </div>
                    <h3 style={{borderBottom: '2px solid #ccc', margin: '20px 0', width: '20%'}}>إضافة اسئلة الامتحان</h3>
                    <div style={{ height: 450, width: '100%', margin: 'auto', overflow: 'hidden' }}>
                        <DataGrid
                            
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
                                selectedRowData.map((row) => setSelectedQuestions([{question: row.id}]));
                            }}autopageSize scrollbarSize={20} checkboxSelection rows={questions} columns={columns}
                            
                            />
                    </div>
                    <h3 style={{borderBottom: '2px solid #ccc', margin: '20px 0', width: '20%'}}>اعدادات الامتحان</h3>
                    
                    <div style={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '0 0 10px 0' }}>
                      <span>فترة الامتحان من : </span>
                      <MuiPickersUtilsProvider utils={DateMomentUtils}>
                          <DateTimePicker
                              variant="dialog"
                              ampm={false}
                              value={start_at}
                              onChange={(e) => setStartAt(moment(e).format('YYYY-MM-DDTHH:mm+02:00'))}
                              onError={console.log}
                              disablePast
                              format="yyyy/MM/dd HH:mm"
                          />
                      </MuiPickersUtilsProvider>
                      <span>الى : </span>
                      <MuiPickersUtilsProvider utils={DateMomentUtils}>
                          <DateTimePicker
                              variant="dialog"
                              ampm={false}
                              value={end_at}
                              onChange={(e) => setEndAt(moment(e).format('YYYY-MM-DDTHH:mm+02:00'))}
                              onError={console.log}
                              disablePast
                              format="yyyy/MM/dd HH:mm"
                          />
                          {console.log(start_at)}
                      </MuiPickersUtilsProvider>
                    </div>
                    <div style={{ display: 'flex', width: '30%', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span>زمن الامتحان : </span>
                            <span>ساعة : </span>
                            <input type="number" value={examHours} className="customInput" style={{ width: '50px', padding: '4px' }} placeholder="ساعة" onChange={(e) => setExamHours(parseInt(e.target.value))} />
                            <span>دقيقة : </span>
                            <input type="number" value={examMinutes} className="customInput" style={{ width: '50px', padding: '4px' }} placeholder="دقيقة" onChange={(e) => setExamMinutes(parseInt(e.target.value))} />
                    </div>
                    <FormControl style={{ width: '150px' }}>
                                    <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={examColor}
                                    displayEmpty
                                    onChange={(e) => setExamColor(e.target.value)}
                                    >
                                    
                                    <MenuItem value=""><span style={{ overflow: 'hidden' }}>اختر لون الامتحان</span></MenuItem>
                                    <MenuItem style={{ backgroundColor: '#ff5856', }}  value="#ff5856"><span style={{ overflow: 'hidden', backgroundColor: '#ff5856', width: '100%', textAlign: 'center', color: 'white' }}>الاحمر</span></MenuItem>
                                    <MenuItem style={{ backgroundColor: '#3f51b5', }}  value="#3f51b5"><span style={{ overflow: 'hidden', backgroundColor: '#3f51b5', width: '100%', textAlign: 'center', color: 'white' }}>الازرق</span></MenuItem>
                                    <MenuItem style={{ backgroundColor: 'green', }} value="green"><span style={{ overflow: 'hidden', width: '100%', textAlign: 'center', color: 'white' }}>الاخضر</span></MenuItem>
                                </Select>
                    </FormControl>
                    <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0', justifyContent: 'flex-end' }}> 
                            <Button color="primary" variant="contained" onClick={(e) => {
                              axiosInstance
                                          .post('exams/add-exam', {
                                            name: examName,
                                            course: courseId,
                                            start_at: start_at,
                                            end_at: end_at,
                                            Limit: `${examHours}:${examMinutes}:00`,
                                            description: examDescription,
                                            color: examColor,
                                            question: selectedQuestions

                                          }).then((res) => console.log(res))
                            }}>حفظ الامتحان</Button>
                            {console.log('q',selectedQuestions)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditExamPage;