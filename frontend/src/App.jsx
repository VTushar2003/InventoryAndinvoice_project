import React from 'react'
import { BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from './pages/Home/Home'
import Dashboard from './pages/Dashboard/Dashboard'
import Product from './pages/Product/Product'
import Invoice from './pages/Invoice/Invoice'
import Profile from './pages/Profile/Profile'
import Users from './pages/Users/Users'

const App = () => {
  return (
   <>
   <BrowserRouter>
   <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/Dashboard' element={<Dashboard/>}/>
      <Route path='/Product' element={<Product/>}/>
      <Route path='/Invoice' element={<Invoice/>}/>
      <Route path='/Users' element={<Users/>}/>
      <Route path='/Profile' element={<Profile/>}/>
   </Routes>
   </BrowserRouter>
   </>
  )
}

export default App