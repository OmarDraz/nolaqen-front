import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import lessonImg from './nol.png'
import NoLogs from '../../svg/NoLogs.svg'
  import {
    Checkbox,
  } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { useParams } from 'react-router-dom';
import axiosInstance from "../../axios";
import SuccessIcon from '../../svg/SuccessIcon.gif'
const StudentsProfilePage = () => {
    const [loading, setLoading] = useState(true)
    const [userInfo, setUserInfo] = useState({
      group: {
        name: ''
      },
      point: '',
      phone: ''
    });
    const [successPopup, setSuccessPopUp] = useState(false)
    const [pastLessons, setPastLessons] = useState([]);
    const [pastAddedLessons, setPastAddedLessons] = useState([]);
    const [checkedLessons, setCheckedLessons] = useState([])
    const [uncheckedLessons, setUnCheckedLessons] = useState([])
    const [studentsLogs, setStudentsLogs] = useState([]);


    let{courseId} = useParams();
    let{studentId} = useParams();


    useEffect(() => {
        axiosInstance
                    .get('users/lessonsAddedBefore/' + courseId + '/' + studentId).then((res) => {
                      console.log('res',res.data)
                      setPastAddedLessons(res.data)
                    })
        axiosInstance
                    .get('users/lessonsBefore/' + courseId + '/' + studentId).then((res) => {
                      console.log('res',res.data)
                      setPastLessons(res.data)
                    })
        axiosInstance
                    .get('users/studentInfo/' + courseId + '/' + studentId).then((res) => {
                        setUserInfo(res.data)
                    }).then((res) => setLoading(false))
        axiosInstance
                    .get('users/studentLogs/' + courseId + '/' + studentId).then((res) => console.log(res.data))
        axiosInstance
                    .get('users/studentLogs/' + courseId + '/' + studentId).then((res) => {
                      setStudentsLogs(res.data)
                      console.log(res.data)
                    })
    }, [])

      function handleCheckAddChange(e, lesson){
        if(e.target.checked){
          setCheckedLessons([...checkedLessons, lesson])
        } else {
          setCheckedLessons(checkedLessons.filter((les) => les !== lesson))
        }
      }

      function handleCheckRemoveChange(e, lesson){
        if(!e.target.checked){
            setUnCheckedLessons([...uncheckedLessons, lesson])
        } else {
            setUnCheckedLessons(uncheckedLessons.filter((les) => les !== lesson))
        }
      }
      const handlePopUpClose = () => {
        setSuccessPopUp(false);
      };
    return(
        <div>
            {loading ? <div style={{position: 'absolute', marginTop: '100px', marginRight: '500px', color: 'red'}}>جاري التحميل</div> : 
            <div style={{ zIndex: '-4' }}>
                <div style={{ position: 'absolute', top: '14%', right: '22%', width: '76%', display: 'flex', flexDirection:'column' }}>
                    <h3 style={{borderBottom: '2px solid #ccc', margin: '10px 0', width: '15%'}}>{userInfo.first_name + ' ' + userInfo.last_name}</h3>
                    <ul>
                        <li>مجموعة الطالب : {userInfo.group.name}</li>
                        <li>نقاط الطالب : {userInfo.point}</li>
                        <li>رقم الطالب : {userInfo.phone}</li>
                    </ul>
                    <h3 style={{borderBottom: '2px solid #ccc', margin: '20px 0', width: '27%'}}>دروس ما قبل تسجيل الطالب بالمنصة</h3>
                    <div className="coursesGrid">
                      {pastLessons.length === 0 ? 'لا يوجد' : pastLessons.map((lesson) => 
                      <div className="card">
                          <img className="courseImg" src={lessonImg} />
                          <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', width: '100%', margin: '10px' }}>
                            <div>
                              <h3>{lesson.name}</h3>
                              <span className="courseTitle">{lesson.description}</span>
                            </div>
                            <Checkbox onChange={(e) => handleCheckAddChange(e, lesson.id)}/>
                          </div>
                      </div>)}
                    </div>
                    <h3 style={{borderBottom: '2px solid #ccc', margin: '20px 0', width: '40%'}}>دروس ما قبل تسجيل الطالب بالمنصة ولكن اضيفت اليه</h3>
                    <div className="coursesGrid">
                    {pastAddedLessons.length === 0 ? 'لا يوجد' : pastAddedLessons.map((lesson) =>
                      <div className="card">
                          <img className="courseImg" src={lessonImg} />
                            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', width: '100%', margin: '10px' }}>
                              <div>
                                <h3>{lesson.name}</h3>
                                <span className="courseTitle">{lesson.description}</span>
                              </div>
                              <Checkbox defaultChecked onChange={(e) => handleCheckRemoveChange(e, lesson.id)} />
                            </div>
                      </div>)}
                    </div>
                    {pastLessons.length === 0 && pastAddedLessons.length === 0 ? '' : 
                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', width: '150px', margin: '10px 0' }}>
                      <Button variant="contained" color='primary' onClick={() => {
                          axiosInstance.post('users/addLessons/' + courseId + '/' + studentId, {
                            check: checkedLessons,
                            uncheck: uncheckedLessons
                          }).then((res) => {
                            console.log(res)
                            setSuccessPopUp(true)
                            setTimeout(() => {
                              setSuccessPopUp(false)
                            }, 3000)
                          })
                        }}>حفظ التعديلات</Button>
                    </div>}
                    <Dialog onClose={handlePopUpClose} style={{ width: '100%', height: 'auto', backgroundColor: 'rgba(0, 0, 0, 0.2) !important'}} aria-labelledby="customized-dialog-title" open={successPopup}>
                        <div style={{ backgroundColor: 'white', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', flexWrap: 'wrap', width: '500px', padding: '10px 20px'  }}>
                              <img src={SuccessIcon} style={{ width: '80px', height: 'auto' }} />
                              <span style={{ fontSize: '16px', fontWeight: 'bold' }}>تم حفظ التعديلات بنجاح</span>
                        </div>
                    </Dialog>
                    

                    {console.log('cheked',checkedLessons)}
                    {console.log('uncheked',uncheckedLessons)}
                    {console.log('added',pastAddedLessons)}
                    <h3 style={{borderBottom: '2px solid #ccc', margin: '10px 0', width: '25%'}}>اخر السجلات المسجلة لهذا الشهر</h3>
                    {studentsLogs.length === 0 ? 
                    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                      <img src={NoLogs} style={{ width: '15%', height: 'auto' }} />
                      <span style={{ fontWeight: 'bold', margin: '10px' }}>لا يوجد سجلات لهذا الشهر</span>
                    </div> : 
                    <table style={{ borderSpacing: '0px 13px', width: '100%', borderCollapse: 'collapse' }}>
                            <th style={{ borderBottom: '0.5px solid rgba(0,0,0, 0.2)', padding: '10px 0' }} align="right">عدد الشهور التي قام بدفعها</th>
                            <th style={{ borderBottom: '0.5px solid rgba(0,0,0, 0.2)', padding: '10px 0' }} align="right">وقت الدفع</th>
                            {studentsLogs.length === 0 ? 
                            '' : studentsLogs.map((log) => 
                            <tr style={{ borderBottom: '0.5px solid rgba(0,0,0, 0.2)' }}>
                              <td style={{ padding: '10px 0' }}>{log.month_number}</td>
                              <td style={{ padding: '10px 0' }}>{log.created_at}</td>
                            </tr>
                            )}
                    </table>}
                </div>
            </div>}
            
        </div>
    )
}

export default StudentsProfilePage;