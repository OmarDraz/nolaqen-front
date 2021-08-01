import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import TextField from "@material-ui/core/TextField";
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Button from "@material-ui/core/Button";
import axiosInstance from "../../axios";
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



const AddPostPage = () => {
    const [courseId, setCourseId] = useState();
    const [teacherCourses, setTeacherCourses] = useState([]);
    const [postContent, setPostContent] = useState('')
    const [popup, setPopup] = useState(false);

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


      const handleDialogClose = () => {
        setPopup(false)
    }
    const handlePopupOpen = () => {
      setPopup(true)
      setTimeout(() => {
          setPopup(false)
        }, 3000);
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
                    <h3 style={{borderBottom: '2px solid #ccc', margin: '10px 0', width: '15%'}}>إضافة منشور</h3>
                    <TextField variant="outlined" multiline rows={15} placeholder="..." value={postContent} onChange={(e) => setPostContent(e.target.value)} />
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Button variant="contained" style={{ backgroundColor: '#ff5658', color: 'white' }} onClick={(e) => {
                          axiosInstance.post('posts/AddPost', {
                            course: courseId,
                            content: postContent
                          }).then((res) => handlePopupOpen())
                        }}>نشر</Button>
                        <Dialog onClose={handleDialogClose} className={classes.dialog} style={{ width: '100%', height: 'auto', backgroundColor: 'rgba(0, 0, 0, 0.2) !important'}} aria-labelledby="customized-dialog-title"  open={popup}>
                              <div style={{ backgroundColor: 'white', display: 'flex', justifyContent: 'center', height: 'auto', alignItems: 'center', flexDirection: 'column', flexWrap: 'wrap', width: '100%', padding: '10px 0'  }}>
                                    <CheckCircleIcon style={{ color: 'green', fontSize: '36px' }} />
                                    <span style={{ fontSize: '18px' }}>تم اضافة المنشور بنجاح</span>
                              </div>
                          </Dialog>
                        <FormControl style={{ width: '300px' }}>
                                    <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={teacherCourses.name}
                                    displayEmpty
                                    onChange={(e) => {
                                        setCourseId(e.target.value)
                                      }
                                    }
                                    >
                                    
                                    <MenuItem value=""><span style={{ overflow: 'hidden' }}>اختر الصف المراد اضافة اسئلة اليه</span></MenuItem>

                                    {teacherCourses.map((e) => <MenuItem value={e.id}><span style={{ overflow: 'hidden' }}>{e.name}</span></MenuItem>)}
                                </Select>
                        </FormControl>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddPostPage;