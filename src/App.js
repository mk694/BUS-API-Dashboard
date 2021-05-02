import React from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import "./App.css";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import AppLayout from "./pages/AppLayout";

function App() {
  // const user = {
  //   email: "moeidsaleem@gmail.com",
  //   password: "moeid123",
  //   name: "Moin",
  // };

  // const createUser = () => {
  //   console.log("cicked");
  //   //   signUp(user).then(response=>{
  //   //     console.log('user created', response.data);
  //   //     localStorage.setItem('token', response.data.token);
  //   //     localStorage.setItem('user', JSON.stringify(response.data))
  //   // })
  // };

  // const routing = useRoutes(routes);

  return (
    <div>
      <Router className="logo">
        <Switch>
          <AppLayout />
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
        <Redirect to="/dashboard" />
      </Router>
    </div>
  );
}

export default App;
