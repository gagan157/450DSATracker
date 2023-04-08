import React,{ useState } from 'react'
import './App.css'
import {createBrowserRouter, RouterProvider}  from 'react-router-dom';
import Home from './components/Home';
import ThemeSelector from './components/ThemeSelector';
import { useSelector } from 'react-redux'
import DsList from './components/DsList';

function App() {
  const {backGroundColor,color} = useSelector((state)=>state.theme)

  const router = createBrowserRouter([
    {
      path:'/',
      element: <Home />
    },
    {
      path:'/:dsName',
      element: <DsList />
    }
  ])

  return (
    <div className={`relative min-h-screen overflow-hidden`} style={{backgroundColor:backGroundColor,color:color}}>
      <ThemeSelector />
      <RouterProvider router={router} />
    </div>
  )
}

export default App
