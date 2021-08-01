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
import Logs from '../../svg/Logs.svg'
import NoLogs from '../../svg/NoLogs.svg'
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
            flexDirection: 'row !important'
        },
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    input: {
      display: 'none',
    },
  }));



const LogsPage = () => {
    const [month, setMonth] = useState('');
    const [coursesStatistics, setCourseStatistics] = useState();
    const [studentsLogs, setStudentsLogs] = useState([]);
    const [loading, setLoading] = useState(true)
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
                        <h3 style={{borderBottom: '2px solid #ccc', margin: '10px 0', width: '10%'}}>السجلات</h3>
                        <FormControl style={{ width: '150px' }} className={classes.formControl}>
                            <Select
                            style={{ width: '150px' }}
                            onChange={(e) => {
                                axiosInstance.get('users/student_logs/' + parseInt(e.target.value)).then((res) => {
                                  setStudentsLogs(res.data)
                                  console.log(res.data)
                                })
                                axiosInstance.get('users/total_month/' + parseInt(e.target.value)).then((res) => {
                                    setCourseStatistics(res.data)
                                }).then(() => setLoading(false))

                                setMonth(e.target.value)

                            }}
                            value={month}
                            displayEmpty
                            >
                            <MenuItem value="">
                                <span style={{ overflow: 'hidden'}}>اختر الشهر</span>
                            </MenuItem>
                            <MenuItem value="1">
                                <span style={{ overflow: 'hidden'}}>يناير</span>
                            </MenuItem>
                            <MenuItem value="2">
                                <span style={{ overflow: 'hidden'}}>فبراير</span>
                            </MenuItem>
                            <MenuItem value="3">
                                <span style={{ overflow: 'hidden'}}>مارس</span>
                            </MenuItem>
                            <MenuItem value="4">
                                <span style={{ overflow: 'hidden'}}>ابريل</span>
                            </MenuItem>
                            <MenuItem value="5">
                                <span style={{ overflow: 'hidden'}}>مايو</span>
                            </MenuItem>
                            <MenuItem value="6">
                                <span style={{ overflow: 'hidden'}}>يونيو</span>
                            </MenuItem>
                            <MenuItem value="7">
                                <span style={{ overflow: 'hidden'}}>يوليو</span>
                            </MenuItem>
                            <MenuItem value="8">
                                <span style={{ overflow: 'hidden'}}>اغسطس</span>
                            </MenuItem>
                            <MenuItem value="9">
                                <span style={{ overflow: 'hidden'}}>سبتمبر</span>
                            </MenuItem>
                            <MenuItem value="10">
                                <span style={{ overflow: 'hidden'}}>اكتوبر</span>
                            </MenuItem>
                            <MenuItem value="11">
                                <span style={{ overflow: 'hidden'}}>نوفمبر</span>
                            </MenuItem>
                            <MenuItem value="12">
                                <span style={{ overflow: 'hidden'}}>ديسمبر</span>
                            </MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className="coursesGrid">
                        {loading ? 
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', gridColumn: '2 / 3' }}>
                          <img src={Logs} style={{ width: '100%', height: 'auto' }} />
                        </div> : coursesStatistics.map((course) => 
                        <div className="card" style={{ height: '180px' }}>
                          <img className="courseImg" />
                          <div style={{ display: 'flex', justifyContent: 'space-around', flexDirection: 'column', alignItems: 'center', width: '100%', height: '300px', margin: '10px' }}>
                              <h3>{course.course_name}</h3>
                              <span>عدد الشهور المدفوعة من الطلاب : {course.total}</span>
                              <span>عدد الطلاب : {course.students}</span>
                          </div>
                      </div>)}      
                    </div>
                    <Divider />
                    {month ? 
                    <>
                    <h3 style={{borderBottom: '2px solid #ccc', margin: '10px 0', width: '25%'}}>اخر السجلات المسجلة لهذا الشهر</h3>
                    {studentsLogs.length == 0 ? 
                    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                      <img src={NoLogs} style={{ width: '15%', height: 'auto' }} />
                      <span style={{ fontWeight: 'bold', margin: '10px' }}>لا يوجد سجلات لهذا الشهر</span>
                    </div> : 
                    <table style={{ borderSpacing: '0px 13px', width: '100%', borderCollapse: 'separate' }}>
                            <th align="right">كود الطالب</th>
                            <th align="right">اسم الطالب</th>
                            <th align="right">اسم التدريب</th>
                            <th align="right">عدد الشهور التي قام بدفعها</th>
                            {studentsLogs.length == 0 ? 
                            '' : studentsLogs.map((log) => 
                            <tr>
                              <td>{log.id}</td>
                              <td>{`${log.first_name} ${log.last_name}`}</td>
                              <td>{log.name}</td>
                              <td>{log.month_number}</td>
                            </tr>)}
                    </table>}
                    </> : '' }
                    
                    
                </div>
            </div>
        </div>
    )
}

export default LogsPage;