import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {

  const [Credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
  let navigate = useNavigate();

  const onSubmitFunc = async (e) => {
    const { name, email, password, cpassword } = Credentials;
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    });
    const res = await response.json();
    console.log(res);
    if (res.success) {
      // Save the authToken & Redirect to home page
      localStorage.setItem('token', res.authToken);
      navigate("/");
    }
    else {
      alert("Invalid Credentials.");
    }
  }

  const onChange = (e) => {
    setCredentials({ ...Credentials, [e.target.name]: e.target.value })
  }

  return (
    <div>
      <form onSubmit={onSubmitFunc}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" name="name" id="name" onChange={onChange} value={Credentials.name} aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" name="email" id="email" onChange={onChange} value={Credentials.email} aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="current-password" className="form-control" name="password" id="password" onChange={onChange} value={Credentials.password} />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="current-password" className="form-control" name="cpassword" id="cpassword" onChange={onChange} value={Credentials.cpassword} />
        </div>
        <button type="submit" className="btn btn-outline-primary mt-3">Submit</button>
      </form>
    </div>
  )
}

export default Signup