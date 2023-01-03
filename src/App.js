// import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Switch, Route} from "react-router-dom";

import Home from "./pages/Home";
import AddUser from './pages/AddUser';
import EditUser from './pages/EditUser';

function App() {
  return (
    <div className="App">
      <BrowserRouter> 
        <Switch>
          <Route exact path="/" >
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
    lll
    </div>
  );
}

export default App;
