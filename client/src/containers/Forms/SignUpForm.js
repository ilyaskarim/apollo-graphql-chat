import React, { useState } from "react";

export const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");

  const handleOnSubmit = e => {
    e.preventDefault();
    console.log("Submitted!");
  };

  return (
    <div>
      <div className="wrap">
        <form className="SignUpForm" action="">
          <div className="form-body">
            <div className="form-header">
              <h3> SignUp Form</h3>
              <p>SignUp to access your dashboard</p>
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-input"
                placeholder="username"
                onChange={e => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-input"
                placeholder="email@example.com"
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-input"
                placeholder="password"
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-input"
                placeholder="Please confirm your password"
                onChange={e => setRepassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <button
                className="form-button"
                type="submit"
                onSubmit={handleOnSubmit}
              >
                SignUp
              </button>
            </div>
          </div>
          <div className="form-footer">
            Already a member ? <a href="/login">Go and Login</a>
          </div>
        </form>
      </div>
    </div>
  );
};
