import React, { useEffect } from 'react';
import { useHistory, useParams, Link }  from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import MemberHeader from './MemberHeader';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddAppointmentBtn from './AddAppointmentBtn';
import Delete from './DeleteBtn';
import Edit from './EditBtn';
import { Button } from '@material-ui/core';
import BackBtn from './BackBtn';


function MemberAppointment () {

    const history = useHistory();
    const params = useParams();
    console.log('memberId in memberAppointment', params.idM);
    const dispatch = useDispatch();
    const member = useSelector ((store) => store.memberInfo);
    const appointment = useSelector ((store) => store.memberAppointment);
    
    useEffect (() => {
        dispatch({
            type: 'FETCH_MEMBER_APPOINTMENT',
            payload: params.idM
        })
    }, [params.idM]);


    return (
        <>
        <div className='link'>
        <Link
                to={`/document/${params.idM}`}
            >
                Document
            </Link>
        </div>
        <br />
        <div className='backBtn'>
        <BackBtn 
            type="toMemberDetails"
            memberId={params.idM}
        />
        </div>
        <br />
        <MemberHeader member={member} className="memberHeader" />
        <br />
        <TableContainer component={Paper}>
            <h3>Appointment</h3>
        <AddAppointmentBtn 
            className="appointmentBtn" 
            memberId={params.idM}
        />
        <Table sx={{ minWidth: 100, border: 2, borderColor: 'black' }}  aria-label="simple table">
            <TableHead className='tableHead'>
            <TableRow>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Where</TableCell>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Comments</TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="center"></TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {appointment.map((appointment, index) => (
                <TableRow
                key={index}
                sx={ { border: 2, minWidth: 100 } }
                >
                <TableCell align="center">{appointment.name}</TableCell>
                <TableCell align="center">{appointment.location}</TableCell>
                <TableCell align="center">{appointment.dateTime}</TableCell>
                <TableCell align="center">{appointment.comments}</TableCell>
                <TableCell align="center">
                    <Edit 
                        type="editAppointment"
                        memberId={params.idM} 
                        appointmentId={appointment.id}
                    />
                </TableCell>
                <TableCell align="center">
                    <Delete 
                        type="DELETE_APPOINTMENT"
                        appointmentId={appointment.id}
                        memberId={params.idM}
                        />
                </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
        </>
    )
};  // end of MemberDetails

export default MemberAppointment;