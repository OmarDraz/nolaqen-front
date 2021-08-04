import { Divider, Radio, RadioGroup, FormControlLabel, FormControl, Button, makeStyles } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../axios';
import Pagination from '@material-ui/lab/Pagination';
import '../css/exam.css'

const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiPagination-ul": {
            justifyContent: 'center',
        },
        "& .MuiSvgIcon-root": {
            transform: 'scale(-1, 1)'
        },
        "& .MuiButtonBase-root": {
            color: 'white'
        },
        "& .MuiPaginationItem-root": {
            color: 'white'
        },
    }
  }));

const RadioGroupComponent = (props) => {
    const [value, setValue] = React.useState('0');

    if(props.submit){
        return (
            <Button onClick={props.onClick}>ff</Button>
        )
    } else
    return (
    <RadioGroup aria-label="gender" name="gender1" value={value} onChange={(e) => props.setSendedAnswers({
        question: props.currentQuestion.id,
        answer: parseInt(e.target.value)
    }) }>
        <div style={{ display: 'grid', gridTemplateRows: '50% 50%', gridTemplateColumns: '50% 50%' }}>
            {props.currentQuestion.answer.map((answer) => <FormControlLabel onClick={(e) => setValue(e.target.value)}  style={{ overflow: 'hidden',  height: 'auto' }} value={`${answer.id}`} control={<Radio />} label={<span>{answer.answer}</span>} />) }
        </div>

    </RadioGroup>
    )
}

const ExamPage = () => {
const classes = useStyles();
const [examDetails, setExamDetails] = useState({
    color: ''
});
const [questions, setQuestions] = useState([])
const [questionNum, setQuestionNum] = useState(1)
const [currentQuestion, setCurrentQuestion] = useState(0);
const [sendedAnswers, setSendedAnswers] = useState([]);
const [examResult, setResult] = useState();
const [time, setTime] = useState({
    minutes: '00',
    seconds: '00'
});



let { examId } = useParams()

const checkAnswer = async (question) => {
    const check = new Promise((resolve, reject) => {
        sendedAnswers.filter((ans) => ans.question !== question )
    })
}

const incrementQNum = async () => {
    const increment = new Promise((resolve, reject) => {
        setCurrentQuestion(currentQuestion => currentQuestion + 1)
    })
}

const decrementQNum = async () => {
    const decrement = new Promise((resolve, reject) => {
        setCurrentQuestion(currentQuestion => currentQuestion - 1)
    })
}


const handleNextQuestion = () => {
    incrementQNum().then(() => setQuestionNum(currentQuestion + 2))
}
const handlePrevQuestion = () => {
    decrementQNum().then(() => setQuestionNum(currentQuestion))
}



    useEffect(() => {
        axiosInstance.get('questions/examquestions/' + examId).then((res) => setQuestions(res.data))
        axiosInstance.get('exams/examPageDetails/' + examId).then((res) => {
            console.log(res.data)
            setExamDetails(res.data)
            if(typeof res.data == 'object')
            startTimer(`${res.data.Limit.charAt(0)}${res.data.Limit.charAt(1)}`, `${res.data.Limit.charAt(3)}${res.data.Limit.charAt(4)}`)
        })
    }, [])

    const startTimer = (examTimeHours, examTimeMinutes) => {
        let examTime = (parseInt(examTimeHours) * 60 * 60 * 1000) + (parseInt(examTimeMinutes) * 60 * 1000)
        {console.log(examTime)}

            const countDownTime = Date.now() + examTime
            let interval = setInterval(() => {
                const now = new Date();
                
                const distance = countDownTime - now;
        
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
                if(distance < 0){
                    clearInterval(interval);
                    setTime({
                        minutes: '00',
                        seconds: '00'
                    })
                    axiosInstance.post('questions/examCorrection/' + examId, sendedAnswers).then((res) => {
                        setQuestions([]);
                        setResult(res.data.result)
                    })
                } else {
                    setTime({
                        minutes: minutes,
                        seconds: seconds
                    })
                }
        
            }, 1000)
        }
    return(
        <>
        {typeof examDetails !== 'object' ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: examDetails.color ? examDetails.color : '#3f51b5', color: 'white' }}>{examDetails}</div> : 
        examResult >= 0 ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: examDetails.color ? examDetails.color : '#3f51b5', color: 'white' }}>لقد حصلت على {examResult} / {examDetails.degree}</div> :
        <div style={{ background: examDetails.color ? examDetails.color : '#3f51b5', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <div style={{ position: 'absolute', display: 'flex', justifyContent: 'space-around', alignItems: 'center', width: '100%', top: '5%', color: 'white' }}>
            <h3>درجة الامتحان الكلية : {examDetails.degree}</h3>
            <h3>السؤال : {questionNum}/{questions.length}</h3>
        </div>
        <h2 style={{ color: 'white' }}>{examDetails.name}</h2>
        <h3 style={{ color: 'white' }}>{time.seconds < 0 ? `0${time.seconds}` : `${time.seconds}`} : {time.minutes < 0 ? `0${time.minutes}` : `${time.minutes}`}</h3>
        <div className="questionCard" style={{ width: '50%' }}>
            <div style={{ width: '100%', height:'auto', backgroundColor: 'white', display: 'flex', flexDirection: 'column', padding: '10px' }}>
                {questions.length > 0 && currentQuestion >= 0 ? 
                questions.map((question, index) =>
                <section style={{ display: questionNum !== index+1 ? 'none' : 'block'}}>
                <span style={{ color: 'grey', fontSize: '12px' }}>{`درجة : ${question.degree}`}</span>
                <p>{questions[currentQuestion].content}</p>
                <Divider style={{ margin: '10px auto', width: '90%', textAlign: 'center' }} />
                <div className='answers'>
                <FormControl component="fieldset" style={{ display: 'flex' }}>
                    <RadioGroupComponent currentQuestion={question} setSendedAnswers={sendedAnswer => {
                        setSendedAnswers([...sendedAnswers.filter((ans) => ans.question !== sendedAnswer.question), sendedAnswer])
                    }} />
                </FormControl> 
                </div>
                </section>)
                
                :
                '..تحميل'
                }
                
            </div>
            <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-around', paddingTop: '10px', color: 'white' }}>
                {questionNum + 1 > questions.length ? <Button variant="contained" color= "secondary" onClick={() => {
                    axiosInstance.post('questions/examCorrection/' + examId, sendedAnswers).then((res) => {
                        setQuestions([]);
                        setResult(res.data.result)
                        console.log(res.data)
                    })
                }}>انهاء الامتحان</Button> : 
                <Button variant="contained" style={{ backgroundColor: 'white' }} onClick={handleNextQuestion}>السؤال التالي</Button>}
                <Pagination className={classes.root} style={{ gridTemplateColumns: '100%', width: '60%', justifyContent: 'center' }} page={questionNum} onChange={(e, num) =>{ 
                    setCurrentQuestion(parseInt(num - 1)) 
                    setQuestionNum(parseInt(num))
                }} count={questions.length} color="secondary" />
                {questionNum - 1 == 0 ? <Button variant="contained" disabled style={{ backgroundColor: 'grey', color: 'rgba(255, 255, 255, 0.6)' }} onClick={handlePrevQuestion}>السؤال السابق</Button> : 
                <Button variant="contained" style={{ backgroundColor: 'white' }} onClick={handlePrevQuestion}>السؤال السابق</Button>}
            </div>
        </div>
        {console.log('num',questionNum)}
        {console.log('sendd',sendedAnswers)}
        {console.log('ques',questions)}
    </div>
        }
            
        </>
    )
}

export default ExamPage