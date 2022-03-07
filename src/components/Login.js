import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login(props) {
    const [Credentials, setCredentials] = useState({ email: "", password: "" });
    let navigate = useNavigate();

    const onSubmitFunc = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: Credentials.email, password: Credentials.password })
        });
        const res = await response.json();
        if (res.success) {
            // Save the authToken & Redirect to home page
            localStorage.setItem('token', res.authToken);
            props.showAlert("Login successful","success");
            navigate("/");
        }
        else {
            props.showAlert("Invalid details","danger");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...Credentials, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <h1 className='mb-3'>Login To Continue To iNotebook</h1>
            <form onSubmit={onSubmitFunc}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" name="email" id="email" onChange={onChange} value={Credentials.email} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" id="password" onChange={onChange} value={Credentials.password} />
                </div>
                <button type="submit" className="btn btn-outline-primary mt-3">Submit</button>
            </form>
        </div>
    )
}

export default Login