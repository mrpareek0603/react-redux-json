// import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Switch, Route} from "react-router-dom";

import Home from "./pages/Home";
import AddUser from './pages/AddUser';
import EditUser from './pages/EditUser';
import RegistrationForm from './pages/Registration';
import LoginForm from './pages/Login';

function App() {
  return (
    <div className="App">
      <BrowserRouter> 
        <Switch>
          <Route exact path="/" >
            <RegistrationForm/>
          </Route>
          <Route exact path="/login">
            <LoginForm />
          </Route>
          <Route exact path="/home" >
            <Home />
          </Route>
          <Route exact path="/addUser" >
            <AddUser />
          </Route>
          <Route exact path="/editUser/:id" >
            <EditUser />
          </Route>
        </Switch>
     </BrowserRouter>
    </div>
  );
}

export default App;
