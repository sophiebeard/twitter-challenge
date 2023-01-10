const Peep = ({ props }) => {

    const { namePeep, lastNamePeep, username, timePeep, textPeep } = props;
    const peepDate = new Date(timePeep).toDateString();
    const peepTime = new Date(timePeep).toLocaleTimeString();

    return (
        <>
            <br />
            <div className="card mx-4 mt-2">
                <div className="card-header pb-2 pt-1.5" style={{ backgroundColor: "#0dcaf0" }}>
                    <h4> {namePeep} {lastNamePeep}</h4>
                    <p>@{username}</p>
                </div>
                <div className="card-body">
                    <h5 className="card-title pb-3 ps-5 pt-2">{textPeep}</h5>
                    <br />
                    <div className="text-end">
                        <p className="blockquote-footer mb-0"> {peepTime} - {peepDate} </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Peep;