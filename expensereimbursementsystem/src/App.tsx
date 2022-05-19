import React, {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './App.css';
import { EmployeePage } from './Views/EmployeePage/EmployeePage';

import { LoginPage } from './Views/LoginPage/LoginPage';
import { ManagerPage } from './Views/ManagerPage/ManagerPage';
import { ProfilePage } from './Views/ProfilePage/ProfilePage';

function App() {

  return(
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<Navigate to="/login" replace/>}/>
        <Route path='/login' element={<LoginPage />}/>
        <Route path='/home' element={<EmployeePage />}/>
        <Route path='/managerHome' element={<ManagerPage />}/>
        <Route path="/user/:id" element={<ProfilePage/>}/>
      </Routes>
    </BrowserRouter>
  );

}

export default App;