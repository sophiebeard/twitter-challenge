import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const Register = ({ url }) => {

    const [user, setUser] = useState({
        namePeep: ``,
        lastNamePeep: ``,
        username: ``,
        email: ``,
        password: ``
    });

    const [registered, setRegistered] = useState(false);

    const userHandler = e => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    };

    const submitHandler = e => {
        e.preventDefault();
        postUser(user);
    };

    const postUser = async user => {
        try {
            const res = await axios.post(`${url}/register`, user);
            alert(res.data.message);
            setRegistered(true);
            resetUser();
        }
        catch (err) {
            alert(`Error registering user: ${err.message}`);
            resetUser();
        }
    };

    const resetUser = () => setUser({ namePeep: ``, lastNamePeep: ``, username: ``, email: ``, password: `` });

    return (
        <>
            {registered && <Navigate to={'/login'} />}
            <div className="Auth-form-container">
                <form className="Auth-form" onSubmit={submitHandler} data-testid="form">
                    <div className="Auth-form-content">
                        <h3 className="Auth-form-title">Register for Chitter!</h3>
                        <div className="form-group mt-3">
                            <label>First Name</label>
                            <input
                                className="form-control mt-1"
                                placeholder="First Name"
                                type="text" id="create-account-name" name="namePeep" label="First Name" variant="outlined" value={user.namePeep} onChange={userHandler} required
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Last Name</label>
                            <input
                                className="form-control mt-1"
                                placeholder="Last Name"
                                type="text" id="create-account-name" name="lastNamePeep" label="Last Name" variant="outlined" value={user.lastNamePeep} onChange={userHandler} required
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Username</label>
                            <input
                                className="form-control mt-1"
                                placeholder="Username"
                                type="text" id="create-account-username" name="username" label="Username" variant="outlined" value={user.username} onChange={userHandler} required
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Email</label>
                            <input
                                className="form-control mt-1"
                                placeholder="Email"
                                data-testid="email" type="email" id="create-account-email" name="email" label="Email" variant="outlined" value={user.email} onChange={userHandler} required
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Password</label>
                            <input
                                className="form-control mt-1"
                                placeholder="Password"
                                data-testid="password"
                                type="password" id="create-account-password" name="password" label="Password" variant="outlined" value={user.password} onChange={userHandler} required
                            />
                        </div>
                        <div className="d-grid gap-2 mt-3">
                            <button type="submit" className="btn btn-primary" style={{ backgroundColor: "#0dcaf0" }}>
                                Register
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Register;





