import React, { useState } from "react";
import mutations from "./../../graphql";
import { httpLink } from "./../../Apollo";

import "./styles.css";

export const LoginForm = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  let user = window.localStorage.getItem("user");
  user = JSON.parse(user);
  if (user && user.hasOwnProperty("name")) {
    window.location.replace("/");
  }
  console.log(httpLink, "http");

  const handleOnSubmit = e => {
    e.preventDefault();
    console.log("Submitted!");
  };

  return (
    <div className="wrap">
      <form className="login-form" action="">
        <div className="form-body">
          <div className="form-header">
            <h3>Login Form</h3>
            <p>Login to access your dashboard</p>
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
            <button
              className="form-button"
              type="submit"
              onSubmit={handleOnSubmit}
            >
              Login
            </button>
          </div>
        </div>
        <div className="form-footer">
          Don't have an account? <a href="/sign-up">Sign Up</a>
        </div>
      </form>
    </div>
  );
};
