import React, { useState } from 'react';
import {Button, makeStyles} from "@material-ui/core";
import axiosInstance from "../../axios";
import TextField from "@material-ui/core/TextField";
import Select from '@material-ui/core/Select';
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Decor from '../../svg/register.svg'
import Container from '@material-ui/core/Container';
import { useHistory, Link } from 'react-router-dom';

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



const RegisterPage = ()=>{
    const [department, setDepartment] = useState('');
    const [level, setLevel] = useState('');
    const [studentDetails, setStudentDetails] = useState({})
    const [errorMsg, setErrorMsg] = useState('')

    let hist = useHistory()
    
  const handleDepChange = (event) => {
    const department = event.target.value;
    setDepartment(department);
  };
  const handleLevelChange = (event) => {
    const level = event.target.value;
    setLevel(level);
  };


    const classes = useStyles()
    return(
        <>
        <img src={Decor} style={{ position: 'fixed', top: 0, right: 0, width: '100%', height: '100vh', opacity: 0.6 }} />
        <Container component="main" maxWidth="md" align="center" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh' }}>
            <h3>تسجيل طالب جديد</h3>
            <form style={{ width: '100%' }} onSubmit={(e) => {
                e.preventDefault()
                axiosInstance.post('users/students', {
                    user:{
                        first_name: studentDetails.first_name,
                        last_name: studentDetails.last_name,
                        password: studentDetails.password,
                        phone: studentDetails.phone,
                        email: studentDetails.email,
                    },
                    parent_phone: studentDetails.parent_phone,
                    department: department,
                    level: parseInt(level)
                }).then((res) => {
                    hist.push('/')
                })
            }}>
            <div className="registerForm">
                <TextField required style={{ margin: '5px 4px' }} onChange={(e) => setStudentDetails({...studentDetails, first_name: e.target.value })} className={classes.root} label={<span>الاسم الاول</span>}/>
                <TextField required style={{ margin: '5px 4px' }} onChange={(e) => setStudentDetails({...studentDetails, last_name: e.target.value })} className={classes.root} label={<span>باقي الاسم كاملا</span>}/>
                <TextField required style={{ margin: '5px 4px' }} onChange={(e) => setStudentDetails({...studentDetails, phone: e.target.value})} className={classes.root} label={<span>رقم الهاتف</span>}/>
                <TextField required style={{ margin: '5px 4px' }} onChange={(e) => setStudentDetails({...studentDetails, parent_phone: e.target.value })} className={classes.root} label={<span>رقم هاتف ولي الامر</span>}/>
                <TextField type="password" required style={{ margin: '5px 4px' }} onChange={(e) => setStudentDetails({...studentDetails, password: e.target.value})} className={classes.root} label={<span>كلمة السر</span>}/>
                <TextField type="email" required style={{ margin: '5px 4px' }} onChange={(e) => setStudentDetails({...studentDetails, email: e.target.value})} className={classes.root} label={<span>البريد الالكتروني</span>}/>
                <FormControl required style={{ width: '200px', margin: '5px 4px' }}>
                        <Select
                        style={{ textAlign: 'right'}}
                        onChange={(e) => setStudentDetails({...studentDetails, department: e.target.value})}
                        value={department}
                        onChange={handleDepChange}
                        displayEmpty
                        >
                        <MenuItem value="">
                            <span style={{ overflow: 'hidden'}}>اختر الشعبة</span>
                        </MenuItem>
                        <MenuItem value="علمى">
                            <span style={{ overflow: 'hidden'}}>علمي</span>
                        </MenuItem>
                        <MenuItem value="ادبي">
                            <span style={{ overflow: 'hidden'}}>أدبي</span>
                        </MenuItem>
                        <MenuItem value="الجميع">
                            <span style={{ overflow: 'hidden'}}>لا يوجد تخصص</span>
                        </MenuItem>
                        </Select>
                </FormControl>
                <FormControl required style={{ width: '200px', margin: '5px 4px' }}>
                        <Select
                        onChange={(e) => setStudentDetails({...studentDetails, level: parseInt(e.target.value)})}
                        style={{ textAlign: 'right'}}
                        value={level}
                        onChange={handleLevelChange}
                        displayEmpty
                        >
                        <MenuItem value="">
                            <span style={{ overflow: 'hidden'}}>الصف الدراسي</span>
                        </MenuItem>
                        <MenuItem value="1">
                            <span style={{ overflow: 'hidden'}}>الاول الثانوي</span>
                        </MenuItem>
                        <MenuItem value="2">
                            <span style={{ overflow: 'hidden'}}>الثاني الثانوي</span>
                        </MenuItem>
                        <MenuItem value="3">
                            <span style={{ overflow: 'hidden'}}>الثالث الثانوي</span>
                        </MenuItem>
                        </Select>
                </FormControl>
            </div>
            <Button type="submit" variant="contained" style={{ background: '#ff5658', color: 'white', padding: 14, margin: 10 }}>سجل الان</Button>
            <div>
                <span>انا مسجل بالفعل</span>
                <Button component={Link} to="/" variant="text" color="primary">تسجيل الدخول</Button>
            </div>
            <span style={{ color: 'red' }}>{errorMsg}</span>
            </form>
            {console.log({user:{
                        first_name: studentDetails.first_name,
                        last_name: studentDetails.last_name,
                        password: studentDetails.password,
                        phone: studentDetails.phone,
                        email: studentDetails.email,
                    },
                    parent_phone: studentDetails.parent_phone,
                    department: department,
                    level: parseInt(level)})}
        </Container>
        </>
    )
}

export default RegisterPage;