import { useState } from 'react'
import {createBrowserRouter,Route,RouterProvider} from 'react-router-dom';
import './App.css'
import LoginSignup from './pages/loginSignup';
import Landing from './pages/landing';

const router = createBrowserRouter([
  {
    path:"/login",
    element:<LoginSignup/>
  },
  {
    path:"/",
    element:<Landing/>
  }
])

function App() {
  const [count, setCount] = useState(0)

  return (
    <RouterProvider router={router}/>
  )
}

export default App
