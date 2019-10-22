import React, {useEffect,useState} from "react";
import { useMutation } from '@apollo/react-hooks';

import graphql from "./graphql";


export default function () {
  const [name,setname] = useState('');
  const [email,setemail] = useState('');
  const [authType, setauthtype] = useState('login');

  const {login: LOGIN_MUTATION, signup: SIGNUP_MUTATION} = graphql.mutation;
  const [login, { data: loginData }] = useMutation(LOGIN_MUTATION);
  const [signup, { data: signupData }] = useMutation(SIGNUP_MUTATION);

  const handleForm = (e) => {
    e.preventDefault();
    if (authType == 'login') {
      if (email) {
        login({
          variables: {
            email: email
          }
        }).then((resp) => {
          let id = resp.data.login.id;
          localStorage.setItem('id', id);
          window.location.replace("/");
        });
        
      }else {
        alert("please write email")
      }
    }else {
      if (email && name) {
        signup({
          variables: {
            email: email,
            name: name
          }
        }).then((resp) => {
          let id = resp.data.signup.id;
          localStorage.setItem('id', id);
          window.location.replace("/");
        });
      }else {
        alert("please write email and name")
      }
    }
  }

  useEffect(() => {
    const id = localStorage.id;
    if (id && id.constructor == String) {
      window.location.replace("/");
    }
  },[])

  return (
    <div>
      <form onSubmit={ handleForm } >
        <h3>Auth</h3>
        {
          (authType == 'signup') ? (<div>
            <label>name: </label>
            <input value={name} onChange={(e) => setname(e.target.value) } />
          </div>) : <span></span>
        }
        <div>
          <label>Email: </label>
          <input value={email} onChange={(e) => setemail(e.target.value) } />
        </div>
        <div>
          Signup?
          <input checked={ (authType == 'signup') ? true : false } onChange={ (e) => setauthtype(e.target.value) } value="signup" name="auth-radio" type="radio" />
        </div>
        <div>
          Login?
          <input checked={ (authType == 'login') ? true : false } onChange={ (e) => setauthtype(e.target.value) } value="login" name="auth-radio" type="radio" />
        </div>
        <input type="submit" value="Go" />
      </form>
    </div>
  )
}