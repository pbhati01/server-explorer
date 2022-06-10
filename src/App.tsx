import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './hooks';
import './App.css'
import Login from './components/Login';

function App() {
  const dispatch = useAppDispatch();
  const token = useAppSelector(state => state.auth.token);
  
  if(token) {
    return null;
  }
  
  return (
    <Login />
  )
}

export default App
