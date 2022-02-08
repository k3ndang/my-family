function MemberHeader ({member}) {
    console.log("member in header", member);
        return (
            <>
            { member[0] ? (
                <h1>{member[0].firstName} {member[0].lastName}</h1>
            ) : null}
            </>
        )
};

export default MemberHeader;