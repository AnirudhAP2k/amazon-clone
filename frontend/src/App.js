import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ShowItem from './components/ShowItem';
import SignIn from './components/SignIn';
import Login from './components/Login';

const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route exact path='/item/:id' element={<ShowItem/>} />
        <Route exact path='/signin' element={<SignIn/>} />
        <Route exact path='/login' element={<Login/>} />
      </Routes>
    </div>
  )
}

export default App
