import React, { useEffect } from 'react';
import { useHistory, useParams }  from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import MemberHeader from './MemberHeader'


function MemberDetails () {
    const { id } = useParams();
    console.log('member id', id);
    const dispatch = useDispatch();
    const member = useSelector ((store) => store.memberInfo);
    console.log('member info', member);


    useEffect (() => {
        dispatch({
            type: 'FETCH_MEMBER_INFO',
            payload: id
        })
    }, []);


    return (
        <>
        <MemberHeader member={member} className="memberHeader" />
        </>
    )
};  // end of MemberDetails

export default MemberDetails;