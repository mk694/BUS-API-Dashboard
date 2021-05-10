import React from "react";

import { Switch, Route, Redirect } from "react-router-dom";

import "./App.css";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import AppLayout from "./pages/AppLayout";
import StudentPortal from "./pages/StudentPortal";

function App() {
  return (
    <>
      <Switch>
        <Route path="/app" component={AppLayout} />
        <Route path="/login" component={Login} />
        <Route path="/student-portal" component={StudentPortal} />
        <Route path="/signup" component={SignUp} />
        <Route exact path="/">
          <Redirect to="/student-portal" />
        </Route>
      </Switch>
    </>
  );
}

export default App;
