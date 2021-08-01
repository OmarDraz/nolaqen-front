import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import axiosInstance from '../axios';
import Typography from '@material-ui/core/Typography';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import "./header.css";
import axios from 'axios';
import { useHistory } from 'react-router-dom';


const styles = (theme) => ({
  root: {
    margin: 0,
    overflow: 'hidden',
    width: '200px',
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    overflow: 'hidden',
    
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    overflow: 'hidden',
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function CustomizedDialogs(props) {
  const [response, setResponse] = useState('');
  const [open, setOpen] = React.useState(false);
  let hist = useHistory()

  const handleClickOpen = () => {
    axiosInstance
            .get('courses/check/' + props.courseId).then(res => {
                console.log(res.data);
                setResponse(res.data);
            })
    setOpen(true);
    setTimeout(() => {
        setOpen(false)
      }, 2000);
  };

  return (
    <div>
      <Button onClick={handleClickOpen} variant="contained" disabled={props.btnText == 'طلبك قيد المراجعة' ? true : false} style={{ marginTop: '20px', backgroundColor: props.btnText == 'طلبك قيد المراجعة' ? 'grey' : '#ff5658', color: 'white' }} onClick={() => {
        if(props.btnText == 'دخول'){
          hist.push('/course/' + props.courseId)
        }
      }}>{props.btnText}</Button>
      <Dialog style={{overflow: 'hidden', width: '100%'}} aria-labelledby="customized-dialog-title" TransitionComponent={Transition} transitionDuration={{ exit: 1000 }} open={open}>
          <CheckCircleIcon className="checkMark" style={{ margin: 'auto', width: "80px", height: '110px', color: 'green' }} />
          <DialogContent style={{ fontSize: 22, textAlign: 'center' }}>
              <div>
                  {response}
              </div>
          </DialogContent>
      </Dialog>
    </div>
  );
}
