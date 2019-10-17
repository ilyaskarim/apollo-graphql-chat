import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ChatSystem from "./containers/Messages/ChatSystem";
import { LoginForm } from "./containers/Forms/LoginForm";
import { SignUpForm } from "./containers/Forms/SignUpForm";
function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Route path="/" exact component={ChatSystem} />
          <Route path="/login/" component={LoginForm} />
          <Route path="/sign-up/" component={SignUpForm} />
        </div>
      </Router>
    </div>
  );
}

export default App;
