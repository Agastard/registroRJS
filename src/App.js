import logo from './logo.svg';
import './App.css';
import Header from './Header';
import Home from './Home';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Login from './Login';
import Register from './Register';
import { UserProvider } from './UserProvider';
import ListUsers from './ListUsers';
import Account from './Account';
//import { useEffect, useState } from 'react';
function App() {
  return (
    <Router>
      <UserProvider>
          <div className='container'>
            <Header />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/home" element={<Home />} />
              <Route path="/listusers" element={<ListUsers />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            <Route path="/account" element={<Account />} />
            </Routes>
          </div>
        
      </UserProvider>
    </Router>
  );
}
export default App;
