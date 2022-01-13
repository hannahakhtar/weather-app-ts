import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.scss'
import Home from './containers/Home'
import Search from './containers/Search'
import { UserContext, username, UserProvider } from "./context/UserContext";

export default function App() {
  // second option would be to use useContext.provider and then add the state here.
  return (
    <>
      <BrowserRouter>
          {/* <UserContext.Provider value={username}> */}
          <UserProvider>
          <Routes>
            <Route path="/weather-app-ts" element={<Home />} />
            <Route path="/weather-app-ts/search" element={<Search />} />
            </Routes>
          {/* </UserContext.Provider> */}
          </UserProvider>
      </BrowserRouter>
    </>
  )
}

