import React, {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigate, useNavigate } from 'react-router-dom';
import './App.css';

import { LoginPage } from './Views/LoginPage/LoginPage';
import { EmployeePage } from './Views/EmployeePage/EmployeePage';
import { ManagerPage } from './Views/ManagerPage/ManagerPage';
import {IUser} from './Interfaces/IUser'

function App() {

  const navigator = useNavigate()

  const [user, setUser] = useState<IUser> ({
    userID: -1,
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    role: 1,
  }); 

  useEffect(() => {
    console.log(user);
    if(user.userID > 0 && user.role === 1){
      navigator("/employeeHome")
    } else if(user.userID > 0 && user.role === 2) {
      navigator("/managerHome")
    } 
  }, [user]);

  const pullUpUser = (loggedIn:IUser) => {
    setUser(loggedIn);
  }


  return(
      <Routes>
        <Route path="/login" element={<LoginPage liftState={pullUpUser}/>}/>
        <Route path="/employeeHome" element={<EmployeePage {...user}/>}/>
        <Route path="/managerHome" element={<ManagerPage {...user}/>}/>
      </Routes>
  )

}

export default App;
