import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


import {Home} from "./Home";
import Messages from "./Messages";
import Auth from "./auth";


function App() {
  
  const id = window.localStorage.id;

  const hasLoggedin = (id) ? id.constructor == String : false;

  return (
    <Router>
    <div>
      <nav>
        <ul>
          { hasLoggedin && <li>
            <Link to="/messages">Messages</Link>
          </li> }
          <li>
            <Link to="/auth">Auth</Link>
          </li>
          { hasLoggedin && <li>
            <Link to="/">Home</Link>
          </li> }
          <li>
            <a href="#" onClick={ () => {window.localStorage.clear(); window.location.reload()} } >Logout</a>
          </li>
        </ul>
      </nav>

      <div className="header" >

      </div>
      <Switch>
        <Route path="/messages">
          <Messages />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  </Router>
  )
}

export default App;