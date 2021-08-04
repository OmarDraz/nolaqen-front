import React, { useState, useEffect } from 'react';

import Button from "@material-ui/core/Button";
import { useParams } from 'react-router-dom';
import { DataGrid } from '@material-ui/data-grid';
import axiosInstance from "../../axios";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import '../css/teacher.css';


const RequestsPage = () => {
    const [requests, setRequests] = useState([]);
    const [selectedRequests, setSelectedRequests] = useState();
    const [anchorEl, setAnchorEl] = React.useState(null);
    let{courseId} = useParams();

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleAccept = () => {
        axiosInstance
                    .post('courses/accept-requests/' + courseId, selectedRequests).then((res) => {
                        console.log(res);
                    })
      setAnchorEl(null);
    };

    console.log('sel', selectedRequests)

    const handleReject = () => {
        axiosInstance
                    .post('courses/reject-requests/' + courseId, selectedRequests).then((res) => {
                        console.log(res);
                    })
      setAnchorEl(null);
    }

    const handleClose = () => {
      setAnchorEl(null);
    }
    const columns = [
        {
            field: "id",
            headerName: "رقم الطلب",
            flex: 1,
        },
        {
            field: "first_name",
            headerName: "الاسم الاول",
            flex: 1,
        },
        {
            field: "last_name",
            headerName: "الاسم الثاني",
            flex: 1,
        },
        {
            field: "created_at",
            headerName: "وقت الطلب",
            flex: 1,
        },
        {
            field: "phone",
            headerName: "رقم الطالب",
            flex: 1,
        },
        {
            field: "parent_phone",
            headerName: "رقم ولي الامر",
            flex: 1,
        }
    ]
   

    useEffect(() => {
        axiosInstance
        .get('courses/requests/' + courseId).then((response) => {
            console.log(response.data)
            setRequests(response.data);
            console.log('ss',requests)
        })
    }, [])

    return(
        <div>
        <div style={{ zIndex: '-4' }}>
            <div style={{ position: 'absolute', top: '14%', right: '22%', width: '76%', display: 'flex', flexDirection:'column' }}>
                <div style={{ height: 600, width: '100%', margin: 'auto' }}>
                    <DataGrid
                    className={'smallScrollBar'}
                    scrollbarSize= {1}
                    components={{
                        NoRowsOverlay: () => {
                            return <span style={{ margin: 'auto', overflow: 'hidden'}}>لا يوجد طلبات انضمام حاليا</span>
                        }
                    }}
                    onSelectionModelChange={(e) => {
                        const selectedIDs = new Set(e.selectionModel);
                        console.log(selectedIDs);
                        const selectedRowData = requests.filter((row) =>
                            selectedIDs.has(row.id)
                        );
                        console.log("select rowData:", selectedRowData);
                        setSelectedRequests(selectedRowData.map((row) => row.id));
                    }}autopageSize scrollbarSize={20} checkboxSelection rows={requests} columns={columns}
                    
                    />

                    {console.log("state: ", selectedRequests)}
                </div>
                <Button style={{backgroundColor: '#FF5856', color: 'white'}} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                    اتخذ اجراء
                </Button>
                <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                >
                <MenuItem onClick={handleAccept} style={{overflow: 'hidden', fontFamily: 'Cairo'}}>قبول الانضمام</MenuItem>
                <MenuItem onClick={handleReject} style={{overflow: 'hidden', fontFamily: 'Cairo'}}>رفض الانضمام</MenuItem>
                </Menu>
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
        </div>
        </div>
    )
}

export default RequestsPage; 