// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./components/Home";
import AddUser from './components/AddUser';
import EditUser from './components/EditUser';
import RegistrationForm from './components/Registration';
import LoginForm from './components/Login';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" >
            <ErrorBoundary >
              <RegistrationForm />
            </ErrorBoundary>
          </Route>
          <Route exact path="/login">
            <ErrorBoundary >
              <LoginForm />
            </ErrorBoundary>
          </Route>
          <Route exact path="/home" >
            <ErrorBoundary >
              <Home />
            </ErrorBoundary>
          </Route>
          <Route exact path="/addUser" >
            <ErrorBoundary >
              <AddUser />
            </ErrorBoundary>
          </Route>
          <Route exact path="/editUser/:id" >
            <ErrorBoundary >
              <EditUser />
            </ErrorBoundary>
          </Route>
        </Switch>
      </BrowserRouter>
    </div >
  );
}

export default App;
