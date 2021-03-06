import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Cancel from './CancelBtn';

function EditAppointmentForm () {
    const dispatch = useDispatch();
    const history = useHistory();
    const {idM, idA} = useParams();   // { id: 2 }
    console.log('Ids in editForm', idM, idA);
    // Grab the "selected member appointment" from the redux store
    const selectedMember = useSelector(store => store.selectedMember);

    useEffect(() => {
        dispatch({
            type: 'FETCH_SELECTED_MEMBER_APPOINTMENT',
            payload: {
                memberId: idM,
                appointmentId: idA
            }
        });
    }, [idM]); // 👈 fetch the member again, if the url changes

    // Called when the submit button is pressed
    const handleSubmit = (event) => {
        event.preventDefault();

    // Save the updated `activeStudent`
    // to the db (via sagas, axios)
        dispatch({
        type: 'SAVE_MEMBER_APPOINTMENT',
        payload: selectedMember
        });

    // go back home
    // The saveStudent saga will call FETCH_STUDENTS
    // so the list view will be up to date
        history.push(`/appointment/${idM}`);
    };


    return (
    <>
        <h2>Edit Appointment</h2>
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                // The big change: 
                // bind inputs to redux (instead of local state)
                value={selectedMember.appointmentName}
                onChange={(evt) => dispatch({
                type: 'UPDATE_MEMBER',
                payload: { appointmentName: evt.target.value }
                })}
            />
            <input
                type="text"
                value={selectedMember.location}
                onChange={(evt) => dispatch({
                type: 'UPDATE_MEMBER',
                payload: { location: evt.target.value }
                })}
            />
            <input
                type="date"
                date-format="MON DD, YYYY"
                value={selectedMember.appointmentDate}
                onChange={(evt) => dispatch({
                type: 'UPDATE_MEMBER',
                payload: { appointmentDate: evt.target.value }
                })}
            />
            <input
                type="text"
                value={selectedMember.comments}
                onChange={(evt) => dispatch({
                type: 'UPDATE_MEMBER',
                payload: { comments: evt.target.value }
                })}
            />
            <input
                type='submit'
                value='Update Appointment'
            />
        </form>
        <Cancel 
            type="toAppointment"
            memberId={idM}
        />
    </>
    );
}

export default EditAppointmentForm;