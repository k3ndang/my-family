import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Cancel from './CancelBtn'

function EditGrowthForm () {
    const dispatch = useDispatch();
    const history = useHistory();
    const {idM, idG} = useParams();   // { id: 2 }
    console.log('growthId in editForm', idM, idG);
    // Grab the "selected member appointment" from the redux store
    const selectedMember = useSelector(store => store.selectedMember);
    console.log('selcted member for update growth', selectedMember);
    useEffect(() => {
        dispatch({
            type: 'FETCH_SELECTED_MEMBER_GROWTH',
            payload: {
                memberId: idM,
                growthId: idG
            }
        });
    }, [idM]); // 👈 fetch the member again, if the url changes

    // Called when the submit button is pressed
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch({
        type: 'SAVE_MEMBER_GROWTH',
        payload: selectedMember
        });
        history.push(`/memberDetails/${idM}`);
    };


    return (
    <>
        <h2>Edit Growth</h2>
        <form onSubmit={handleSubmit}>
            <input
                type="integer"
                value={selectedMember.height}
                onChange={(evt) => dispatch({
                type: 'UPDATE_MEMBER',
                payload: { height: evt.target.value }
                })}
            />
            <input
                type="integer"
                value={selectedMember.weight}
                onChange={(evt) => dispatch({
                type: 'UPDATE_MEMBER',
                payload: { weight: evt.target.value }
                })}
            />
            <input
                type="date"
                date-format="MON DD, YYYY"
                value={selectedMember.date}
                onChange={(evt) => dispatch({
                type: 'UPDATE_MEMBER',
                payload: { date: evt.target.value }
                })}
            />
            <input
                type='submit'
                value='Update GrowthInfo'
            />
        </form>
        <Cancel 
            type="toDetails"
            memberId={idM}
        />
    </>
    );
}

export default EditGrowthForm;