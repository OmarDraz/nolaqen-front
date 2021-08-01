import React, { useState, useEffect } from 'react';
import TeacherHeader from './Header.js';
import Dialog from '@material-ui/core/Dialog';
import TextField from "@material-ui/core/TextField";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import SimpleDialog from './dialog';
import MuiDialogActions from '@material-ui/core/DialogActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { makeStyles } from '@material-ui/core/styles';
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
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { useParams } from 'react-router-dom';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { Container, Paper, Box } from '@material-ui/core';
import axiosInstance from "../../axios";
import Menu from "@material-ui/core/Menu";
import {
    withStyles,
    MuiThemeProvider,
    createMuiTheme,
  } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";

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
        "& .MuiSelect-select": {
            height: '27px'
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

const ExamResultsPage = () => {
    const classes = useStyles();

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
    const [results, setResults] = useState([]);
    const [query, setQuery] = useState('');
    const [toBeQueried, setToBeQueried] = useState('');
    const [degreeSearch, setDegreeSearch] = useState(0)


    let { examId } = useParams();
    const lowerCaseQuery = query.toLowerCase();

    const arr = []

    useEffect(() => {
        axiosInstance
                    .get('exams/exam_results/' + examId).then((res) => {
                        res.data.map((item) => arr.push({
                            result: item.results,
                            name: item.first_name + ' ' + item.last_name,
                            phone: item.phone,
                            parent_phone: item.parent_phone
                        }));
                    }).then(() => setResults(arr))
    }, [])
    return(
        <div>
            <div style={{ zIndex: '-4' }}>
                <div style={{ position: 'absolute', top: '14%', right: '22%', width: '76%', display: 'flex', flexDirection:'column' }}>
                    <div style={{ display: 'flex', justifyContent:'space-between' }}>
                        <h3 style={{borderBottom: '2px solid #ccc', margin: '10px 0', width: '15%'}}>نتائج الامتحان</h3>
                        <div>
                            <FormControl style={{ width: '150px' }}  className={classes.root}>
                                        <Select
                                        style={{ width: '150px' }}
                                        value={toBeQueried}
                                        onChange={(e) => setToBeQueried(e.target.value)}
                                        displayEmpty
                                        >
                                        <MenuItem value="">
                                            <span style={{ overflow: 'hidden'}}>بحث باستخدام</span>
                                        </MenuItem>
                                        <MenuItem value="greaterThan">
                                            <span style={{ overflow: 'hidden'}}>أعلى من</span>
                                        </MenuItem>
                                        <MenuItem value="lessThan">
                                            <span style={{ overflow: 'hidden'}}>أقل من</span>
                                        </MenuItem>
                                        <MenuItem value="equal">
                                            <span style={{ overflow: 'hidden'}}>يساوي</span>
                                        </MenuItem>
                                        </Select>
                            </FormControl>
                            <TextField type="number" className={classes.root} onChange={(e) => {
                                setDegreeSearch(parseInt(e.target.value))
                            }} label={<span>بحث الدرجات ..</span>} />
                        </div>
                        <TextField className={classes.root} style={{  }} label={<span>بحث باسم الطالب ..</span>}  onChange={(e) => {
                                        setQuery(e.target.value)}} />
                    </div>
                    <div>
                        <table style={{ borderSpacing: '0px 13px', width: '100%', borderCollapse: 'separate' }}>
                            <th align="right">اسم الطالب</th>
                            <th align="right">درجة الطالب</th>
                            <th align="right">رقم الطالب</th>
                            <th align="right">رقم ولي الامر</th>
                            {results.length == 0 ? <div style={{ width: 'flex', justifyContent: 'center', alignItems: 'center' }}>لا يوجد مجموعات</div> : 
                            toBeQueried ? results.filter((row) => {
                                if(toBeQueried == 'equal'){
                                    return row.result == degreeSearch
                                } else if(toBeQueried == 'greaterThan'){
                                    return row.result > degreeSearch
                                } else if(toBeQueried == 'lessThan'){
                                    return row.result < degreeSearch
                                }
                            }).map((result) =>
                            <tr>
                                <td>{result.name}</td>
                                <td>{result.result}</td>
                                <td>{result.phone}</td>
                                <td>{result.parent_phone}</td>
                            </tr>) :
                            results.filter((row) => row.name.toLowerCase().includes(lowerCaseQuery)).map((result) =>
                            <tr>
                                <td>{result.name}</td>
                                <td>{result.result}</td>
                                <td>{result.phone}</td>
                                <td>{result.parent_phone}</td>
                            </tr>)}
                            
                    {console.log(toBeQueried)}
                            
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExamResultsPage;