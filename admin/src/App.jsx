import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import './App.css'
import LoginSignup from './pages/loginSignup';
import Landing from './pages/landing';
import Addevent from './pages/addEvent';
import Projects from './pages/projects';
import MyProvider from './context/provider';
import AddSubAdmin from './pages/addSubAdmin';

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
      },
      {
        path:'/addsubadmin',
        element:<AddSubAdmin/>
      }
    ]
  }
])

function App() {

  return (
    <MyProvider>
      <RouterProvider router={router}/>
    </MyProvider>
  )
}

export default App
