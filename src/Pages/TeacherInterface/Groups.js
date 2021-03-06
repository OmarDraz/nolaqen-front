import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import TextField from "@material-ui/core/TextField";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { makeStyles } from '@material-ui/core/styles';
import ErrorIcon from '@material-ui/icons/Error';
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useParams } from 'react-router-dom';
import { DataGrid } from '@material-ui/data-grid';
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

const GroupsPage = () => {
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
    const [groups, setGroups] = useState([]);
    const [courseStudents, setCourseStudents] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState();
    const [groupName, setGroupName] = useState('');
    const [toBeQueried, setToBeQueried] = useState('');
    const [open, setOpen] = React.useState(false);
    const [editPopup, setEditPopup] = React.useState(false);
    const [editedGroupName, setEditedGroupName] = useState('');
    const [msgOpen, setMsgOpen] = React.useState(false);
    const [msgContent, setMsgContent] = React.useState('');
    const [query, setQuery] = useState('');
    const [addQuery, setAddQuery] = useState('');

    const lowerCaseQuery = query.toLowerCase();



    const columns = [
        {
            field: "id",
            headerName: "?????? ????????????",
            flex: 1,
        },
        {
            field: "name",
            headerName: "?????? ????????????",
            flex: 1,
        },
        {
            field: "phone",
            headerName: "?????? ????????????",
            flex: 1,
        }
    ]


    let{courseId} = useParams();




    const handleMsgOpen = () => {
        setMsgOpen(true)
        setTimeout(() => {
            setMsgOpen(false)
          }, 3000);
    }

    const arr = [];


    const handleClickOpen = () => {
      axiosInstance
                .get('groups/get-student/' + courseId).then((res) => {
                    console.log(res.data)
                    res.data.map((item) => arr.push({
                        id: item.id,
                        name: item.first_name + ' ' + item.last_name,
                        group: item.group.name,
                        phone: item.phone,
                        parent_phone: item.parent_phone,
                        point: item.point,
                    }));
                }).then(() => setCourseStudents(arr))
      setOpen(true);
    };
    const handleSaveGroup = () => {
        axiosInstance
                    .post('groups/new-group/' + courseId, {
                        "name": groupName,
                        "students": selectedStudents
                    }).then((res) => {
                        console.log(res)
                    })
        setOpen(false);
      };

      const handleClose = () => {
        setOpen(false);
      };

      const handlePopUpClose = () => {
        setEditPopup(false);
      };

    useEffect(() => {
        axiosInstance
                    .get('groups/groups/' + courseId).then((res) => {
                        console.log(res.data)
                        setGroups(res.data)
                    })
                    console.log("state:",groups)
    }, [])
    return(
        <div>
            <div style={{ zIndex: '-4' }}>
                <div style={{ position: 'absolute', top: '14%', right: '22%', width: '76%', display: 'flex', flexDirection:'column' }}>
                    <div style={{ display: 'flex', justifyContent:'space-between' }}>
                        <h3 style={{borderBottom: '2px solid #ccc', margin: '10px 0', width: '15%'}}>??????????????????</h3>
                        <TextField className={classes.root} style={{ marginLeft: '17%' }} label={<span>?????? ..</span>}  onChange={(e) => {
                                        setQuery(e.target.value)}} />
                        <Button onClick={handleClickOpen} style={{ backgroundColor: '#FF5856', color: 'white', height: '50px' }}>?????? ???????????? +</Button>
                        <Dialog onClose={handleClose} style={{ width: '100%', height: 'auto', backgroundColor: 'rgba(0, 0, 0, 0.2) !important'}} aria-labelledby="customized-dialog-title" open={open}>
                            <div style={{ backgroundColor: 'white', display: 'inline-flex', flexDirection: 'column', flexWrap: 'wrap', width: '500px', padding: '10px 20px'  }}>
                                <TextField className={classes.root} onChange={(e) => setGroupName(e.target.value)} style={{ overflow: 'hidden', width: "30%" }} placeholder="?????? ????????????????" />
                                <h4 style={{ margin: '10px 0' }}>?????????? ???????? ????????????????</h4>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                <TextField className={classes.root} label={<span>?????? ..</span>} onChange={(e) => {
                                    setAddQuery(e.target.value)
                                }} />
                                <FormControl style={{ width: '150px' }}  className={classes.root}>
                                            <Select
                                            style={{ width: '150px' }}
                                            value={toBeQueried}
                                            onChange={(e) => setToBeQueried(e.target.value)}
                                            displayEmpty
                                            >
                                            <MenuItem value="">
                                                <span style={{ overflow: 'hidden'}}>?????? ????????????????</span>
                                            </MenuItem>
                                            <MenuItem value="phone">
                                                <span style={{ overflow: 'hidden'}}>?????? ????????????</span>
                                            </MenuItem>
                                            <MenuItem value="name">
                                                <span style={{ overflow: 'hidden'}}>?????? ????????????</span>
                                            </MenuItem>
                                            <MenuItem value="id">
                                                <span style={{ overflow: 'hidden'}}>?????? ????????????</span>
                                            </MenuItem>
                                            
                                            </Select>
                                </FormControl>
                                </div>
                                {console.log(groupName)}
                                <div style={{ height: 300, width: '100%', margin: 'auto' }}>
                                 <DataGrid
                                    style={{ display: 'flex',  }}
                                    className={'smallScrollBar'}
                                    scrollbarSize= {1}
                                    components={{
                                        NoRowsOverlay: () => {
                                            return <span style={{ margin: 'auto', overflow: 'hidden'}}>???? ???????? ???????? ???????????????? </span>
                                        }
                                    }}
                                    onSelectionModelChange={(e) => {
                                        const selectedIDs = new Set(e.selectionModel);
                                        console.log(selectedIDs);
                                        const selectedRowData = courseStudents.filter((row) =>
                                            selectedIDs.has(row.id)
                                        );
                                        console.log("select rowData:", selectedRowData);
                                        setSelectedStudents(selectedRowData.map((row) => row.id));

                                    }}autopageSize scrollbarSize={20} checkboxSelection rows={addQuery ? courseStudents.filter((row) => {
                                        if(toBeQueried == 'phone'){
                                            return row.phone.toLowerCase().includes(lowerCaseQuery) 
                                        } else if(toBeQueried == 'name'){
                                            return row.name.toLowerCase().includes(lowerCaseQuery) 
                                        } else if(toBeQueried == 'id'){
                                            return row.id.toLowerCase().includes(lowerCaseQuery) 
                                        } else {
                                            return row.name.toLowerCase().includes(lowerCaseQuery) 
                                        }
                                    }) : courseStudents} columns={columns}
                                    
                                />
                                {console.log("selecte",selectedStudents)}
                                </div>
                                    <Button onClick={handleSaveGroup} style={{ backgroundColor: '#FF5856', color: 'white', height: '50px' }}>??????</Button>

                            </div>
                        </Dialog>
                    </div>
                    <div>
                        <table style={{ borderSpacing: '0px 13px', width: '100%', borderCollapse: 'separate' }}>
                            <th align="right">?????? ????????????????</th>
                            <th align="right">?????? ????????????????</th>
                            <th>??????????</th>
                            {groups.length == 0 ? <div style={{ width: 'flex', justifyContent: 'center', alignItems: 'center' }}>???? ???????? ??????????????</div> : 
                            groups.filter((row) => row.name.toLowerCase().includes(lowerCaseQuery)).map((group) =>
                            <tr>
                                <td>{group.name}</td>
                                <td>{group.id}</td>
                                <td align="center">
                                <IconButton onClick={() => {
                                    axiosInstance
                                                .delete('groups/updateGroup/' + group.id).then((res) => {
                                                    
                                                    console.log(res)
                                                    setMsgContent(res.data)
                                                
                                                }).then((res) => {
                                                    axiosInstance.get('groups/groups/' + courseId).then((res) => {
                                                        setGroups(res.data)
                                                        handleMsgOpen()
                                                    })
                                                });
                                                
                                    
                                }} style={{ backgroundColor: '', color: '#FF5856', width: '40px', height: '40px' }} aria-label="delete">
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                                <Dialog style={{ width: '100%', height: 'auto', backgroundColor: 'rgba(0, 0, 0, 0.2) !important'}} aria-labelledby="customized-dialog-title" open={msgOpen}>
                                    <div style={{ backgroundColor: 'white', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', flexWrap: 'wrap', width: '500px', padding: '10px 20px'  }}>
                                        {msgContent == '???? ???????? ?????? ???????????????? ???????? ???????? ???????? ???????? ???????????? ???????????? ???????? ???? ?????????? ????????????????' ? <ErrorIcon className="checkMark" style={{margin: 'auto', width: "80px", height: '110px', color: 'red'}} /> : <CheckCircleIcon className="checkMark" style={{margin: 'auto', width: "80px", height: '110px', color: 'green'}} /> }
                                        <h5 style={{ fontSize: '16px' }}>
                                            {msgContent}
                                        </h5>
                                    </div>
                                </Dialog>
                                <IconButton onClick={() => {
                                    setEditPopup(true)
                                }} style={{ backgroundColor: '', width: '40px', color: '#3f51b5', height: '40px' }} aria-label="delete">
                                    <EditIcon fontSize="small" />
                                </IconButton>
                                <Dialog onClose={handlePopUpClose} style={{ width: '100%', height: 'auto', backgroundColor: 'rgba(0, 0, 0, 0.2) !important'}} aria-labelledby="customized-dialog-title" open={editPopup}>
                                    <div style={{ backgroundColor: 'white', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', flexWrap: 'wrap', width: '500px', padding: '10px 20px'  }}>
                                    <input className="customInput" placeholder={group.name} onChange={(e) => {
                                        setEditedGroupName(e.target.value)
                                    }}/>
                                    <Button onClick={() => {
                                        axiosInstance
                                                    .put('groups/updateGroup/' + group.id, {
                                                        "name": editedGroupName
                                                    }).then((res) => {
                                                        console.log(res.data)
                                                        axiosInstance
                                                            .get('groups/groups/' + courseId).then((res) => {
                                                                setGroups(res.data)
                                                                setEditPopup(false)
                                                            })
                                                    })
                                    }} style={{ backgroundColor: '#FF5856', color: 'white', height: '50px' }}>??????</Button>
                                    </div>
                                </Dialog>
                                </td>
                            </tr>)}
                            
                            
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GroupsPage;