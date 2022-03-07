import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup(props) {

  const [Credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
  let navigate = useNavigate();

  const onSubmitFunc = async (e) => {
    const { name, email, password } = Credentials;
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/signup", {
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
      props.showAlert("Created account successfully", "success");
      navigate("/");
    }
    else {
      props.showAlert("Invalid Credentials", "danger");
      alert("Invalid Credentials.");
    }
  }

  const onChange = (e) => {
    setCredentials({ ...Credentials, [e.target.name]: e.target.value })
  }

  return (
    <div>
      <h1 className='mb-3'>Sign Up</h1>
      <form onSubmit={onSubmitFunc}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" name="name" id="name" onChange={onChange} value={Credentials.name} aria-describedby="emailHelp" required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" name="email" id="email" onChange={onChange} value={Credentials.email} aria-describedby="emailHelp" required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" name="password" id="password" onChange={onChange} value={Credentials.password} minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" name="cpassword" id="cpassword" onChange={onChange} value={Credentials.cpassword} minLength={5} required />
        </div>
        <button type="submit" className="btn btn-outline-primary mt-3">Submit</button>
      </form>
    </div>
  )
}

export default Signup