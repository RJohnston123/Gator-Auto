import React, {useEffect} from 'react';
import InventorySearch from './InventorySearch/InventorySearch';
import {BrowserRouter as Router, Switch, Route, } from "react-router-dom";
import VehicleList from './Vehicle_List/VehicleList';
import Taskbar from './Taskbar/Taskbar';
import Sidebar from './Sidebar/Sidebar';
import CreateNewDealership from './Dealerships/CreateNewDealership/CreateNewDealership'
import './App.css';
import './Vehicle_List/Vehicle.css';
import Authentication from './Authentication/Authentication';
import AddVehicle from './Inventory/AddVehicle/AddVehicle';
import CreateUser from './User/CreateUser/CreateUser';
import ManageInventory from './Inventory/ManageInventory/ManageInventory';

const App = () => {  
  return (
    <Router>
      <div className="App">
          <Taskbar/>

          <Switch>
            <Route exact path="/home" >
              <InventorySearch/>
              <VehicleList/>
            </Route>

            <Route path="/adminportal/CreateUser">
              <Authentication role="Admin">
                <Sidebar/>
                <CreateUser/>
              </Authentication>
            </Route>

            <Route path="/adminportal/CreateDealership">
              <Authentication role="Admin">
                <Sidebar/>
                <CreateNewDealership/>
              </Authentication>
            </Route>

            <Route path="/adminportal/AddVehicle">
              <Authentication role="Admin">
                <Sidebar/>
                <AddVehicle/>
              </Authentication>
            </Route>

            <Route path="/adminportal/Inventory">
              <Authentication role="Admin">
                <Sidebar/>
                <ManageInventory/>
              </Authentication>
            </Route>

          </Switch>
      </div>
    </Router>
  );
}

export default App;
