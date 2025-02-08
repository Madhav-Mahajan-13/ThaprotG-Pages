import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import './App.css'
import LoginSignup from './pages/loginSignup';
import Landing from './pages/landing';
import Addevent from './pages/addEvent';
import Projects from './pages/projects';

const router = createBrowserRouter([
  {
    path:"/login",
    element:<LoginSignup/>,
  },
  {
    path:"/",
    element:<Landing/>,
    children:[
      {
        path:'/addevent',
        element:<Addevent/>
      },
      {
        path:'/projects',
        element:<Projects/>
      }
    ]
  }
])

function App() {

  return (
    <RouterProvider router={router}/>
  )
}

export default App
