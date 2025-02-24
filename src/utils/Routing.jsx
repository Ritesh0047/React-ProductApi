import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../components/Home'
import Details from '../components/Details'
import Create from '../components/Create'
import Edit from '../components/Edit'
const Routing = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/create" element={<Create />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </div>
  )
}

export default Routing