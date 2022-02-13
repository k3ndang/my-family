import { useHistory, useParams } from "react-router-dom";


function AddAppointmentBtn (props) {
    console.log('appt Btn id', props.memberId);
    
    const history = useHistory();

    return (
        <>
        <button
            // When click on this button it should take user to AddMemberForm
            className={props.className}
            onClick={() => history.push(`/addAppointmentForm/${props.memberId}`)}
        >
            Add Appointment
        </button>
        </>
    )
}; // end of AddAppointmentBtn

export default AddAppointmentBtn;