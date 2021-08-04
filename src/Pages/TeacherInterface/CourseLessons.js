import React, { useState, useEffect } from 'react';
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from "@material-ui/core/TextField";
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import EditIcon from '@material-ui/icons/Edit';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/styles';
import {
    BrowserRouter as 
    useHistory,
  } from "react-router-dom";
  import {
    Checkbox,
  } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { useParams } from 'react-router-dom';
import axiosInstance from "../../axios";
import '../css/teacher.css';


const CourseLessonsPage = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editLoad, setEditLoad] = useState(true);
    const [lessons, setLessons] = useState();
    const [lessonDetails, setLessonDetails] = useState();
    const [lessonId, setLessonId] = useState();
    const [notAddedGroups, setNotAddedGroups] = useState([])
    const [addedGroups, setAddedGroups] = useState([])
    const [checkedGroups, setCheckedGroups] = useState([])
    const [unCheckedGroups, setUnCheckedGroups] = useState([]);
    const [query, setQuery] = useState('');
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [deleteAlert, setDeleteAlert] = React.useState(false);
    const [editPopup, setEditPopup] = React.useState(false);
    const [groupPopUp, setGroupPopup] = React.useState(false);

    const lowerCaseQuery = query.toLowerCase();

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
                width: '700px'
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
                    .get('lessons/teacher_lessons/' + courseId).then((res) => {
                        console.log(res)
                        setLessons(res.data)
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
    return(
        <div>
            {loading ? <div style={{position: 'absolute', marginTop: '100px', marginRight: '500px', color: 'red'}}>جاري التحميل</div> : 
            <div style={{ zIndex: '-4' }}>
                <div style={{ position: 'absolute', top: '14%', right: '22%', width: '76%', display: 'flex', flexDirection:'column' }}>
                    <div style={{ display: 'flex', alignItems:'center', justifyContent: 'space-between' }}>
                        <h3 style={{borderBottom: '2px solid #ccc', margin: '10px 0', width: '15%'}}>دروس التدريب</h3>
                        <TextField className={classes.root} style={{ marginLeft: '17%' }} label={<span>بحث ..</span>}  onChange={(e) => {
                                        setQuery(e.target.value)}} />    
                    </div>
                    {lessons.length == 0 ? <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>لا يوجد دروس</div> : 
                    <>
                        <table style={{ borderSpacing: '0px 13px', width: '100%', borderCollapse: 'separate' }}>
                        <th align='right'>اسم الدرس</th>
                        <th align='right'>وصف الدرس</th>
                        <th align='center'>عملية</th>
                        {lessons.filter((row) => row.name.toLowerCase().includes(lowerCaseQuery)).map((lesson) => 
                            <tr>
                                <td>{lesson.name}</td>
                                <td>{lesson.description}</td>
                                <td align="center">
                                    <IconButton onClick={() => {
                                        setLessonId(lesson.id)
                                        setDeleteAlert(true)
                                    }} style={{ backgroundColor: '', color: '#FF5856', width: '40px', height: '40px' }} aria-label="delete">
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                    <Dialog onClose={handleDialogClose} style={{ width: '100%', height: 'auto', backgroundColor: 'rgba(0, 0, 0, 0.2) !important'}} aria-labelledby="customized-dialog-title"  open={deleteAlert}>
                                        <div style={{ backgroundColor: 'white', display: 'inline-flex', justifyContent: 'space-between', height: '80px', alignItems: 'center', flexDirection: 'column', flexWrap: 'wrap', width: '500px', padding: '10px 20px'  }}>
                                            <h4>هل انت متأكد من أنك تريد حذف هذا الدرس ؟</h4>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '140px', padding: '5px' }}>
                                                <Button variant="contained" style={{ backgroundColor: '#ff5856', color: 'white' }} onClick={(e) => {
                                                    axiosInstance.delete('lessons/UpdateDeleteLesson/' + lessonId).then((res) => {
                                                        setDeleteAlert(false)
                                                        setLessons(lessons.filter((les) => les.id !== lessonId))
                                                    })
                                                }}>نعم</Button>
                                                <Button onClick={handleDialogClose} variant="contained" style={{ backgroundColor: '#3f51b5', color: 'white' }}>لا</Button>
                                            </div>
                                        </div>
                                    </Dialog>
                                    <IconButton style={{ backgroundColor: '', color: '#3f51b5', width: '40px', height: '40px' }} aria-label="delete" onClick={() => {
                                        setLessonId(lesson.id)
                                        setEditPopup(true)
                                        axiosInstance.get('lessons/UpdateDeleteLesson/' + lesson.id).then((res) => {setLessonDetails({
                                            name: res.data.name,
                                            description: res.data.description
                                        })
                                        console.log('data',res.data)
                                    }).then(() => setEditLoad(false))
                                    }}>
                                        <EditIcon fontSize="small" />
                                    </IconButton>
                                    {editLoad ? '' : 
                                    <Dialog onClose={handleEditDialogClose} className={classes.dialog} style={{ width: '100%', height: 'auto', backgroundColor: 'rgba(0, 0, 0, 0.2) !important'}} aria-labelledby="customized-dialog-title"  open={editPopup}>
                                        <div style={{ backgroundColor: 'white', display: 'flex', justifyContent: 'center', height: 'auto', alignItems: 'center', flexDirection: 'column', flexWrap: 'wrap', width: '100%', padding: '10px 0'  }}>
                                            <TextField style={{ flexDirection: 'row' }} className={classes.root} onChange={(e) => setLessonDetails({...lessonDetails, name : e.target.value})} value={lessonDetails.name} label="اسم الدرس"/>
                                            <TextField style={{ flexDirection: 'row' }} className={classes.root} onChange={(e) => setLessonDetails({...lessonDetails, description : e.target.value})} value={lessonDetails.description} label="وصف الدرس"/>
                                            <Button style={{ margin: '10px 0' }} variant="contained" color="primary" onClick={() => {
                                                
                                                axiosInstance.put('lessons/UpdateDeleteLesson/' + lesson.id, {
                                                    name: lessonDetails.name,
                                                    description: lessonDetails.description
                                                }).then((res) => setLessonDetails(lessonDetails))
                                            }}>حفظ التغييرات</Button>
                                        </div>
                                    {console.log(lessonDetails)}
                                    </Dialog>}
                                    <IconButton style={{ backgroundColor: '', color: '#3f51b5', width: '50px', height: '50px' }} aria-label="delete" onClick={() => {
                                        setGroupPopup(true)
                                        axiosInstance.get('lessons/UncheckedGroups/' + lesson.id).then((res) => setNotAddedGroups(res.data))
                                        axiosInstance.get('lessons/checkedGroups/' + lesson.id).then((res) => setAddedGroups(res.data))
                                    }}>
                                        <GroupAddIcon fontSize="medium" />
                                    </IconButton>
                                    <Dialog onClose={handleGroupsDialogClose} className={classes.dialog} style={{ width: '100%', height: 'auto', backgroundColor: 'rgba(0, 0, 0, 0.2) !important'}} aria-labelledby="customized-dialog-title"  open={groupPopUp}>
                                        <div style={{ backgroundColor: 'white', display: 'flex', justifyContent: 'center', height: 'auto', alignItems: 'center', flexDirection: 'column', flexWrap: 'wrap', width: '100%', padding: '10px 0'  }}>
                                            <span style={{ fontSize: '18px', fontWeight: 'bold' }}>المجموعات المضاف اليها الدرس</span>
                                            <ul>
                                                {notAddedGroups.length == 0 ? '' : notAddedGroups.map((group) => 
                                                <li><Checkbox onChange={(e) => handleCheckAddChange(e, group.id)} />{group.name}</li>
                                                )}
                                                {addedGroups.length == 0 ? '' : addedGroups.map((group) => 
                                                <li><Checkbox defaultChecked onChange={(e) => handleCheckRemoveChange(e, group.id)}/>{group.name}</li>
                                                )}
                                            </ul>
                                            <Button style={{ margin: '10px 0' }} variant="contained" color="primary" onClick={() => {
                                                
                                                axiosInstance.post('lessons/addLessonGroups/' + lesson.id, {
                                                    check: checkedGroups,
                                                    uncheck: unCheckedGroups
                                                }).then((res) => setGroupPopup(false))
                                            }}>حفظ التغييرات</Button>
                                        </div>
                                    </Dialog>
                                </td>
                            </tr>
                        )}
                    </table>
                    </>
                    }
                    
                    {console.log('un', unCheckedGroups)}
                    {console.log('ch', checkedGroups)}
                </div>
            </div>}
        </div>
    )
}

export default CourseLessonsPage; 