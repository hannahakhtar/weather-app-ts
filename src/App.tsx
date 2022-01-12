import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.scss'
import Home from './containers/Home'
import Search from './containers/Search'
import { UserContext, username } from "./context/UserContext";

export default function App() {

  return (
    <>
      <BrowserRouter>
        
          <UserContext.Provider value={username}>
          <Routes>
            <Route path="/weather-app-ts" element={<Home />} />
            <Route path="/weather-app-ts/search" element={<Search />} />
            </Routes>
          </UserContext.Provider>
        

      </BrowserRouter>
    </>
  )
}

