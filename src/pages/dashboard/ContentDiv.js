import React from "react";
import Buses from "./buses/Buses";
import Login from "../Login";

import { Route, Switch } from "react-router-dom";
import SignUp from "../Signup";
import Admin from "./admin/Admin";
import Students from "./students/Students";
import Drivers from "./drivers/Drivers";
import Departments from "./departments/Departments";
import Dashboard from "./dashboard/Dashboard";

function ContentDiv() {
  return (
    <>
      <Switch>
        <Route path="/buses">
          <Buses />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/departments">
          <Departments />
        </Route>
        <Route path="/admin">
          <Admin />
        </Route>
        <Route path="/drivers">
          <Drivers />
        </Route>
        <Route path="/students">
          <Students />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
      </Switch>
    </>
  );
}

export default ContentDiv;
