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



const AddExamPage = () => {
    const [courses, setCourses] = useState([]);
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

      useEffect(() => {
          axiosInstance.get('courses/student_number').then((res) => setCourses(res.data)).then(() => setLoading(false))
      }, [])

    return(
        <div>
            <div style={{ zIndex: '-4' }}>
                <div style={{ position: 'absolute', top: '14%', right: '22%', width: '76%', display: 'flex', flexDirection:'column' }}>
                <div className="coursesGrid">
                        {loading ? 'جاري التحميل' : courses.map((course) => 
                        <div className="card" style={{ height: '180px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-around', flexDirection: 'column', alignItems: 'center', width: '100%', height: '300px', margin: '10px' }}>
                              <h3>{course.course_name}</h3>
                              <span>عدد الشهور المدفوعة من الطلاب : {course.total}</span>
                              <span>عدد الطلاب : {course.students}</span>
                          </div>
                      </div>)}      
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddExamPage;