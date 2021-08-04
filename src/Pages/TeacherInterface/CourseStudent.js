import React, { useState, useEffect } from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Dialog from '@material-ui/core/Dialog';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import IconButton from "@material-ui/core/IconButton";
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { makeStyles } from '@material-ui/styles';
import {
    BrowserRouter as 
    useHistory,
  } from "react-router-dom";
  import {
    TextField,
  } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import PaymentIcon from '@material-ui/icons/Payment';
import { useParams } from 'react-router-dom';
import { DataGrid } from '@material-ui/data-grid';
import axiosInstance from "../../axios";
import MenuItem from "@material-ui/core/MenuItem";
import '../css/teacher.css';


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

const CourseStudentPage = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentStudent, setCurrentStudent] = useState();
    const [selectedStudents, setSelectedStudents] = useState();
    const [deleteAlert, setDeleteAlert] = React.useState(false);
    const [groups, setGroups] = useState([]);
    const [monthsToBePurchased, setMonthsToBePurchased] = useState();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [query, setQuery] = useState('');
    const [toBeQueried, setToBeQueried] = useState('');
    const [alert, setAlert] = useState('');
    const [group, setGroup] = useState('');
    const [rerender, setRerender] = useState(1);

    const lowerCaseQuery = query.toLowerCase();
    let{courseId} = useParams();

    const [open, setOpen] = React.useState(false);

    const arr = [];
    const handleDialogClose = () => {
        setDeleteAlert(false)
    }
    const handleGroupChange = () => {
        axiosInstance
                    .post('users/changeGroup/' + group, selectedStudents).then((res) => {
                        console.log(res)
                        setAlert(res.data)
                    }).then(() => {
                        axiosInstance
                                .get('users/allStudentCourse/' + courseId).then((response) => {
                                    console.log(response.data)
                                    response.data.map((item) => arr.push({
                                        id: item.id,
                                        name: item.first_name + ' ' + item.last_name,
                                        group: item.group.name,
                                        phone: item.phone,
                                        parent_phone: item.parent_phone,
                                        point: item.point,
                                    }));
                           }).then(()=>{
                                    setStudents(arr)
                        })
                    })
        setOpen(true);
        setTimeout(() => {
            setOpen(false)
          }, 3000);

    }
    console.log(rerender)
    const columns = [
        {
            field: "id",
            headerName: "كود الطالب",
            flex: 1,
        },
        {
            field: "name",
            headerName: "اسم الطالب",
            flex: 1,
        },
        {
            field: "group",
            headerName: "مجموعة الطالب",
            flex: 1,
        },
        {
            field: "phone",
            headerName: "رقم الهاتف",
            flex: 1,
        },
        {
            field: "parent_phone",
            headerName: "هاتف ولي الامر",
            flex: 1,
        },
        {
            field: "point",
            headerName: "نقاط الطالب",
            flex: 1,
        },
        {
            field: "pay",
            headerName: "دفع الشهر",
            flex: 1,
            disableClickEventBubbling: true,
            renderCell: (student) => {
                return (
                    <div>
                        <IconButton onClick={() => {
                            setDeleteAlert(true)
                            setCurrentStudent(student.row.id)
                        }} size="small" variant="contained" color="primary">
                            <PaymentIcon />
                        </IconButton>
                        <Dialog onClose={handleDialogClose} style={{ width: '100%', height: 'auto', backgroundColor: 'rgba(0, 0, 0, 0.2) !important'}} aria-labelledby="customized-dialog-title"  open={deleteAlert}>
                                <div style={{ backgroundColor: 'white', display: 'inline-flex', justifyContent: 'space-around', height: '80px', alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap', width: '300px', padding: '10px 20px'  }}>
                                    <input type="number" className="customInput" placeholder="ادخل عدد الشهور" style={{ padding: '4px', margin: '0' }} value={monthsToBePurchased} onChange={(e) => setMonthsToBePurchased(parseInt(e.target.value))} />
                                    <Button variant="contained" style={{ backgroundColor: '#ff5658', color: 'white' }} onClick={() => {
                                        axiosInstance.post('users/add_points/' + courseId, {
                                            student: currentStudent,
                                            month_number: monthsToBePurchased
                                        }).then((res) => setDeleteAlert(false))
                                    }}>ادفع</Button>
                                </div>
                        </Dialog>
                    </div>
                )
            }
        },
        {
            field: "profile",
            headerName: "ملف الطالب",
            flex: 1,
            disableClickEventBubbling: true,
            renderCell: (student) => {
                return (
                    <div>
                        <Button onClick={() => handleUserClicked(student)} size="small"   color="secondary" variant="contained" ><AccountBoxIcon /></Button>
                    </div>
                )
            }
        },
    ]

    let hist = useHistory();

    const handleUserClicked = (clickedUser) => {
        hist.push(`/teacher/course/${courseId}/student/${clickedUser.row.id}`)
    }
   

    useEffect(async () => {
        axiosInstance
        .get('users/allStudentCourse/' + courseId).then((response) => {
            console.log('kk', response.data)
             response.data.map((item) => arr.push({
                 id: item.id,
                 name: item.first_name + ' ' + item.last_name,
                 group: !item.group ? 'بلا مجموعة' : item.group.name,
                 phone: item.phone,
                 parent_phone: item.parent_phone,
                 point: item.point,
             }));
         }).then(()=>{
             setStudents(arr)
         }).then(() => {
            axiosInstance
            .get('groups/groups/' + courseId).then((res) => {
                console.log(res.data)
                setGroups(res.data)
            }).then(() => setLoading(false))
         })
    }, [])
    const handleChange = (event) => {
        const name = event.target.value;
        setGroup(name);
      };
    const classes = useStyles();
    
    return(
        <div>
            {loading ? <div style={{position: 'absolute', marginTop: '100px', marginRight: '500px', color: 'red'}}>جاري التحميل</div> : <div style={{ zIndex: '-4' }}>
            <div style={{ position: 'absolute', top: '14%', right: '22%', width: '76%', display: 'flex', flexDirection:'column' }}>
            <h3 style={{borderBottom: '2px solid #ccc', margin: '10px 0', width: '10%'}}>طلاب التدريب</h3>
            <div style={{ display: 'flex',  alignItems: 'center' }}>
                <TextField className={classes.root} style={{ overflow: 'hidden', width: '15%' }} label={<span style={{overflow: 'hidden'}}>بحث .. </span>} onChange={(e) => {
                                        setQuery(e.target.value)
                }} />
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
                            <MenuItem value="phone">
                                <span style={{ overflow: 'hidden'}}>رقم الهاتف</span>
                            </MenuItem>
                            <MenuItem value="name">
                                <span style={{ overflow: 'hidden'}}>اسم الطالب</span>
                            </MenuItem>
                            <MenuItem value="group">
                                <span style={{ overflow: 'hidden'}}>اسم المجموعة</span>
                            </MenuItem>
                            <MenuItem value="parent_phone">
                                <span style={{ overflow: 'hidden'}}>رقم ولي الامر</span>
                            </MenuItem>
                            
                            </Select>
                </FormControl>
            </div>

                <div style={{ height: 450, width: '100%', margin: 'auto', overflow: 'hidden' }} className={classes.root}>
                <DataGrid
                    
                    components={{
                        NoRowsOverlay: () => {
                            return <span style={{ margin: 'auto', overflow: 'hidden'}}>لا يوجد طلاب لهذا التدريب</span>
                        }
                    }}
                    onSelectionModelChange={(e) => {
                        const selectedIDs = new Set(e.selectionModel);
                        console.log(selectedIDs);
                        const selectedRowData = students.filter((row) =>
                            selectedIDs.has(row.id)
                        );
                        console.log("select rowData:", selectedRowData);
                        setSelectedStudents(selectedRowData.map((row) => row.id));
                    }}autopageSize scrollbarSize={20} checkboxSelection rows={query ? students.filter((row) => {
                        if(toBeQueried == 'phone'){
                            return row.phone.toLowerCase().includes(lowerCaseQuery) 
                        } else if(toBeQueried == 'name'){
                            return row.name.toLowerCase().includes(lowerCaseQuery) 
                        } else if(toBeQueried == 'group'){
                            return row.group.toLowerCase().includes(lowerCaseQuery) 
                        } else if(toBeQueried == 'parent_phone'){
                            return row.parent_phone.toLowerCase().includes(lowerCaseQuery) 
                        } else {
                            return row.name.toLowerCase().includes(lowerCaseQuery) 
                        }
                    }) : students} columns={columns}
                    
                    />

                    {console.log("state: ", selectedStudents)}
                    {console.log(arr)}
       { console.log("ss", students)}

                </div>

                <div style={{ display: 'flex', margin: '10px 0'}}>
                    <span>أضف الى مجموعة : </span>
                    {/* <FormControl>
                        <NativeSelect
                        value={group}
                        onChange={handleChange}
                        name="group"
                        inputProps={{ 'aria-label': 'مجموعة' }}
                        >
                        <option value="">None</option>
                        <option value={10}>Ten</option>
                        <option value={20}>Twenty</option>
                        <option value={30}>Thirty</option>
                        </NativeSelect>
                        <FormHelperText>With visually hidden label</FormHelperText>
                    </FormControl> */}
                    <FormControl style={{ width: '150px' }}>
                        <Select
                        style={{ width: '150px' }}
                        value={group}
                        onChange={handleChange}
                        displayEmpty
                        >
                        <MenuItem value="">
                            <span style={{ overflow: 'hidden'}}>اختر مجموعة</span>
                        </MenuItem>
                        {groups.map((group) => 
                            <MenuItem value={group.id}><span style={{ overflow: 'hidden'}}>{group.name}</span></MenuItem>
                         )}
                        </Select>
                    </FormControl>
                    <Button onClick={handleGroupChange} variant="contained" style={{ backgroundColor: "#FF5856", color: "white" , margin: '0 10px'}}>حفظ</Button>
                    <Dialog style={{ width: '100%', height: 'auto', backgroundColor: 'rgba(0, 0, 0, 0.2) !important'}} aria-labelledby="customized-dialog-title" open={open}>
                            <div style={{ backgroundColor: 'white', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', flexWrap: 'wrap', width: '500px', padding: '10px 20px'  }}>
                            <CheckCircleIcon className="checkMark" style={{ margin: 'auto', width: "80px", height: '110px', color: 'green' }} />
                                <h5 style={{ fontSize: '16px' }}>
                                    {alert}
                                </h5>
                            </div>
                    </Dialog>
                </div>
                {console.log(groups)}

                
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
            </div>
        </div>}
        
        </div>
    )
}

export default CourseStudentPage; 