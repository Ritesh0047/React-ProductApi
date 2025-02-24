import React from 'react'
import Nav from './Nav'
import Cards from './Cards'
import { Link } from 'react-router-dom'
const Home = () => {
  return ( 
    
      
    <div className='p-2 w-full h-screen flex '>
      <Nav />
      <Cards />
    </div>
   
  )
}

export default Home