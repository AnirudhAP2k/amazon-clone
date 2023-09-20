import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ShowItem from './components/ShowItem';

const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route exact path='/:type' element={<Home/>} />
        <Route exact path='/item/:id' element={<ShowItem/>} />
      </Routes>
    </div>
  )
}

export default App
