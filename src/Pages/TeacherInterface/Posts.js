import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import TextField from "@material-ui/core/TextField";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NoLogs from '../../svg/NoLogs.svg'
import { makeStyles } from '@material-ui/core/styles';
import {
    BrowserRouter as 
    Link,
  } from "react-router-dom";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import axiosInstance from "../../axios";
import {
    withStyles,
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

const PostsPage = () => {
    const classes = useStyles();


    const [posts, setPosts] = useState([]);
    const [postId, setPostId] = useState();
    const [deleteAlert, setDeleteAlert] = React.useState(false);
    const [courseId, setCourseId] = useState();
    const [teacherCourses, setTeacherCourses] = useState([]);
    const [selectedCourseName, setSelectedCourseName] = useState('');
    const [postContent, setPostContent] = useState('');
    const [editPopup, setEditPopup] = React.useState(false);
    const [editedGroupName, setEditedGroupName] = useState('');
    const [query, setQuery] = useState('');

    const lowerCaseQuery = query.toLowerCase();

      const handleDialogClose = () => {
        setDeleteAlert(false)
    }

      const handlePopUpClose = () => {
        setEditPopup(false);
      };

    useEffect( async () => {
        
                    axiosInstance.get('courses/teacher-courses').then((res) => {
                        setTeacherCourses(res.data)
                    })
    }, [])
    return(
        <div>
            <div style={{ zIndex: '-4' }}>
                <div style={{ position: 'absolute', top: '14%', right: '22%', width: '76%', display: 'flex', flexDirection:'column' }}>
                    <div style={{ display: 'flex', justifyContent:'space-between', alignItems: 'center' }}>
                        <h3 style={{borderBottom: '2px solid #ccc', margin: '10px 0', width: '15%'}}>المنشورات</h3>
                        <TextField className={classes.root} style={{ marginLeft: '17%', display: posts.length > 0 ? 'block' : 'none' }} label={<span>بحث ..</span>}  onChange={(e) => {
                                        setQuery(e.target.value)}} />
                        <FormControl style={{ width: '200px' }}>
                                    <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={selectedCourseName}
                                    displayEmpty
                                    onChange={(e) => {
                                        axiosInstance
                                                    .get('posts/my_posts/' + parseInt(e.target.value)).then((res) => {
                                                        setPosts(res.data)
                                                    })
                                        setCourseId(parseInt(e.target.value))
                                        setSelectedCourseName(e.target.value)
                                      }
                                    }
                                    >
                                    
                                    <MenuItem value=""><span style={{ overflow: 'hidden' }}>اختر الصف</span></MenuItem>

                                    {teacherCourses.map((e) => <MenuItem value={e.id}><span style={{ overflow: 'hidden' }}>{e.name}</span></MenuItem>)}
                                </Select>
                        </FormControl>
                    </div>
                    <div>
                        <table style={{ borderSpacing: '0px 13px', width: '100%', borderCollapse: 'separate' }}>
                            <th align="right">محتوى المنشور</th>
                            <th align="right">وقت النشر</th>
                            <th>عملية</th>
                            {posts.length == 0 ? <tr align="center" style={{ margin: 'auto' }}><td colSpan={3}><img src={NoLogs} style={{ width: '30%', marginTop: '10px', height: 'auto' }} /><td align="center" style={{ fontWeight: 'bold' }}>لا يوجد منشورات</td></td></tr> : 
                            posts.filter((row) => row.content.toLowerCase().includes(lowerCaseQuery)).map((post) =>
                            <tr>
                                <td>{post.content}</td>
                                <td>{post.created_at}</td>
                                <td align="center">
                                <IconButton onClick={() => {
                                        setPostId(post.id)
                                        setDeleteAlert(true)
                                    }} style={{ backgroundColor: '', color: '#FF5856', width: '40px', height: '40px' }} aria-label="delete">
                                        <DeleteIcon fontSize="small" />
                                </IconButton>
                                <Dialog onClose={handleDialogClose} style={{ width: '100%', height: 'auto', backgroundColor: 'rgba(0, 0, 0, 0.2) !important'}} aria-labelledby="customized-dialog-title"  open={deleteAlert}>
                                        <div style={{ backgroundColor: 'white', display: 'inline-flex', justifyContent: 'space-between', height: '80px', alignItems: 'center', flexDirection: 'column', flexWrap: 'wrap', width: '500px', padding: '10px 20px'  }}>
                                            <h4>هل انت متأكد من أنك تريد حذف هذا المنشور ؟</h4>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '140px', padding: '5px' }}>
                                                <Button variant="contained" style={{ backgroundColor: '#ff5856', color: 'white' }} onClick={(e) => {
                                                    axiosInstance.delete('posts/post_edit/' + postId).then((res) => {
                                                        setDeleteAlert(false)
                                                        setPosts(posts.filter((post) => post.id !== postId))
                                                    })
                                                }}>نعم</Button>
                                                <Button onClick={handleDialogClose} variant="contained" style={{ backgroundColor: '#3f51b5', color: 'white' }}>لا</Button>
                                            </div>
                                        </div>
                                    </Dialog>
                                <IconButton onClick={() => {
                                    setEditPopup(true)
                                    setPostContent(post.content)
                                    setPostId(post.id)

                                }} style={{ backgroundColor: '', width: '40px', color: '#3f51b5', height: '40px' }} aria-label="delete">
                                    <EditIcon fontSize="small" />
                                </IconButton>
                                <Dialog onClose={handlePopUpClose} style={{ width: '100%', height: 'auto', backgroundColor: 'rgba(0, 0, 0, 0.2) !important'}} aria-labelledby="customized-dialog-title" open={editPopup}>
                                    <div style={{ backgroundColor: 'white', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', flexWrap: 'wrap', width: '500px', padding: '10px 20px'  }}>
                                    <TextField className={classes.root} multiline rows={15} variant="outlined" style={{ width: '100%' }} value={postContent} onChange={(e) => {
                                        setEditedGroupName(e.target.value)
                                        setPostContent(e.target.value)
                                    }}/>
                                    <Button onClick={() => {
                                        axiosInstance
                                                    .put('posts/post_edit/' + postId, {
                                                        content: editedGroupName,
                                                        course: courseId 
                                                    }).then((res) => {
                                                        console.log(res.data)
                                                        axiosInstance
                                                            .get('posts/my_posts/' + courseId).then((res) => {
                                                                setPosts(res.data)
                                                                setEditPopup(false)
                                                            })
                                                    })
                                    }} style={{ backgroundColor: '#FF5856', color: 'white', height: '50px' }}>حفظ</Button>
                                    </div>
                                </Dialog>
                                </td>
                            </tr>)}
                            
                            {console.log('course id', courseId)}
                            {console.log('content', editedGroupName)}
                        </table>
                    </div>
                    <Button component={Link} to="/teacher/add-post" variant="contained" color="primary" style={{ borderRadius: '15px', position: 'fixed', bottom: '10px', left: '10px', width: '8%', height: '50px' }}> + أضف منشور</Button>
                </div>
            </div>
        </div>
    )
}

export default PostsPage;