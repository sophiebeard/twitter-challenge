import { useState } from "react";
import { Navigate } from "react-router-dom"

const Logout = ({ setUser }) => {

    const [loggedOut, setLoggedOut] = useState(false);

    const submitHandler = e => {
        e.preventDefault();
        setUser({});
        setLoggedOut(true);
    };

    return (
        <>
            {loggedOut && <Navigate to={`/`} />}
            <br />
            <h3 className="Auth-form-title">Would you like to log out?</h3>
            <div className="Auth-form-container">
                <form className="Auth-form" onSubmit={submitHandler} data-testid="form">
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-danger" >
                            Yes
                        </button>
                    </div>
                    <br />
                </form>
            </div>
        </>
    );
};

export default Logout;