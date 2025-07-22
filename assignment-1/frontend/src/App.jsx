import React from 'react';
import {createBrowserRouter, RouterProvider, } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Userpage from './components/userPage';
import './App.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>,
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/register',
    element: <Register/>,
  },
  {
    path: '/userpage',
    element: <Userpage/>
  }
]);

function App() {
  return (
    <div className="app1">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
