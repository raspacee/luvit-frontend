import { createContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Register from "./components/Register";
import SignIn from "./components/SignIn";
import Home from "./components/Home";
import AddFriends from "./components/AddFriends";
import PrivateRoute from "./components/PrivateRoute";
import "./App.css";

const defaultAuth = {
  isAuthenticated: true,
  signin() {
    this.isAuthenticated = true;
  },
  logout() {
    this.isAuthenticated = false;
  },
};

export const AuthContext = createContext();

function App() {
  return (
    <AuthContext.Provider value={defaultAuth}>
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/">
              <Redirect to='/home'/>
            </Route>
            <PrivateRoute path="/home">
              <Home />
            </PrivateRoute>
            <PrivateRoute path="/add_friends">
              <AddFriends />
            </PrivateRoute>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/signin">
              <SignIn />
            </Route>
            <Route path='*'>
              <h1>404, page not found</h1>
            </Route>
          </Switch>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
