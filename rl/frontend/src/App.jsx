import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login/pages/Login';
import Signup from './components/Signup/pages/Signup';


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Signup />} />   { /* as default */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>  {/* End Routes */}  {/* End Router */}  {/* End App */}

        {/* Add more routes as needed */}
      </Router>

    </>
  )
}

export default App
