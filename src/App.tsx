import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './containers/Home'

import './App.scss'

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/weather-app-ts" element={<Home/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

