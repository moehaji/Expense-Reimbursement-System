import React from 'react';
import './App.css';
import { LoginPage } from './Views/LoginPage/LoginPage';
import { EmployeePage } from './Views/EmployeePage/EmployeePage';
import { ManagerPage } from './Views/ManagerPage/ManagerPage';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return(
    <HashRouter>
    <Routes >
        <Route path="*" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />}/>
        
        <Route path="/employee" element={<EmployeePage />}/>

        {/* <Route path="/employee/:id" element={<EmployeePage />}/>
        <Route path="/user/:id" element={<ProfilePage />}/> */}

        <Route path="/manager" element={<ManagerPage />}/>
    </Routes>
  </HashRouter>
  );
}

export default App;