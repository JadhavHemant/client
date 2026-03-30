import { useState } from 'react'
import './App.css'
import  MainRouting  from './Components/MainRouting/MainRouting'
import { Toaster } from 'react-hot-toast'
function App() {

  return (
    <>
    <Toaster position="top-right" />
    <MainRouting/>
    </>
  )
}

export default App
