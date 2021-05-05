import React, { useEffect, useState } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useRouteMatch,
} from "react-router-dom";

import "./App.css";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import AppLayout from "./pages/AppLayout";

function App() {
  const [isLogged, setIsLogged] = useState(false);

  const token = localStorage.getItem("Token");

  useEffect(() => {
    if (token !== null) {
      setIsLogged(true);
    }
  }, []);

  return (
    <Switch>
      <Route path="/login" component={isLogged ? AppLayout : Login} />
      <Route path="/app" component={AppLayout} />

      <Route path="/signup">
        <SignUp />
      </Route>
      <Redirect to="/login" />
    </Switch>
  );
}

export default App;
