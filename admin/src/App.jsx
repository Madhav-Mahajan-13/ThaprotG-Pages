import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import './App.css'
import LoginSignup from './pages/loginSignup';
import Landing from './pages/landing';
import Addevent from './pages/addEvent';
import Projects from './pages/projects';
import MyProvider from './context/provider';
import AddSubAdmin from './pages/addSubAdmin';
import ProjectsPending from './pages/projectsPending';
import ProjectsDenied from './pages/projectsDenied';
import Carousel from './pages/carousel';
import Users from './pages/users';
import SubAdmins from './pages/subAdmins';
import Events from './pages/events';
import Forgot from "./pages/forgot.jsx";
import OTP from "./pages/OTP.jsx";
import Insights from './pages/insights.jsx';
import InsightForm from './pages/addInsights.jsx';

const router = createBrowserRouter([
  {
    path:"/login",
    element:<LoginSignup/>,
  },
  {
    path:"/forgot",
    element:<Forgot/>
  },
  {
    path:"/OTP/:email",
    element:<OTP/>
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
      },
      {
        path:'/pendingprojects',
        element:<ProjectsPending/>
      },
      {
        path:'/rejectedprojects',
        element:<ProjectsDenied/>
      },
      {
        path:'/carousel',
        element:<Carousel/>
      },
      {
        path:'/users',
        element:<Users/>
      },
      {
        path:"/subadmins",
        element:<SubAdmins/>
      },
      {
        path:"/events",
        element:<Events/>
      },
      {
        path:"/insights",
        element:<Insights/>
      },
      {
        path:"/addInsight",
        element:<InsightForm/>
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
