import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const Login = ({ url, setUser }) => {

    const [loginUser, setLoginUser] = useState({
        email: ``,
        password: ``,
    });

    const [loggedIn, setLoggedIn] = useState(false);

    const loginHandler = e => {
        const { name, value } = e.target;
        setLoginUser({
            ...loginUser,
            [name]: value
        });
    };

    const submitHandler = e => {
        e.preventDefault();
        postLogin(loginUser);
    };

    const postLogin = async loginUser => {
        const res = await axios.post(`${url}/login`, loginUser);
        alert(res.data.message);
        setUser(res.data.user);
        resetLogin();
        setLoggedIn(res.data.user ? true : false);
    };

    const resetLogin = () => setLoginUser({ email: ``, password: `` });

    return (
        <>
            {loggedIn && <Navigate to={'/'} />}
            <br />
            <h3 className="Auth-form-title">Log In to Chitter!</h3>
            <div className="Auth-form-container">
                <form className="Auth-form" onSubmit={submitHandler} data-testid="form">
                    <div className="Auth-form-content">
                        <div className="form-group mt-3">
                            <label>Email Address</label>
                            <input
                                className="form-control mt-1"
                                placeholder="Enter email"
                                data-testid="email" type="email" id="create-account-email" name="email" label="Email" variant="outlined" value={loginUser.email} onChange={loginHandler} required
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Password</label>
                            <input
                                type="password" id="create-account-password" name="password" label="Password" variant="outlined" value={loginUser.password} onChange={loginHandler} required
                                className="form-control mt-1"
                                placeholder="Enter password"
                            />
                        </div>
                        <div className="d-grid gap-2 mt-3">
                            <button type="submit" className="btn btn-primary" style={{ backgroundColor: "#0dcaf0" }}>
                                Log In
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Login;