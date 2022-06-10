import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './hooks';
import './App.css'
import Login from './components/Login';
import ServerListDetails from './components/ServerListDetails';

function App() {
  const dispatch = useAppDispatch();
  const token = useAppSelector(state => state.auth.token);
  
  if(token) {
    return <ServerListDetails />;
  }

  return (
    <Login />
  )
}

export default App
