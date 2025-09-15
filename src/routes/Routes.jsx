import {
  createBrowserRouter,
} from "react-router-dom";

import Root from "../main/Root";
import Home from "../publicPages/Home";
import About from "../publicPages/About";
import Login from "../publicPages/Login";
import Register from "../publicPages/Register";
import Events from "../publicPages/Events";
import Contact from "../publicPages/Contact";
import MyBookings from "../userPages/MyBookings";
import Profile from "../userPages/Profile";
import PrivateRoute from "../privateRoute/PrivateRoute";
import AdminDashBoard from "../adminPages/AdminDashBoard";
import ManageBookings from "../adminPages/ManageBookings";
import ManageEvents from "../adminPages/ManageEvents";
import Reports from "../adminPages/Reports";
import AdminHome from "../dashBoardPages/AdminHome";
import AllEvents from "../dashBoardPages/AllEvents";
import CreateEvents from "../dashBoardPages/CreateEvents";
import ManageUsers from "../dashBoardPages/ManageUsers";
import UpdateEvents from "../dashBoardPages/UpdateEvents";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children:[
      {
        path:'/',
        element:<Home></Home>
      },
       {
        path:'/about',
        element:<About></About>
      },
       {
        path:'/login',
        element:<Login></Login>
      },
       {
        path:'/register',
        element:<Register></Register>
      },
       {
        path:'/events',
        element:<Events></Events>
      },
       {
        path:'/contact',
        element:<Contact></Contact>
      },
      {
        path:'/myBookings',
        element:<MyBookings></MyBookings>
      },
        {
        path:'/profile',
        element:<PrivateRoute><Profile></Profile></PrivateRoute>
      },
      {
        path:'/manageBookings',
        element:<ManageBookings></ManageBookings>
      },
      {
        path:'/reports',
        element:<Reports></Reports>
      }
    ]
  },{
    path:'/dashboard',
    element:<AdminDashBoard></AdminDashBoard>,
    children:[
      {
        path:'adminHome',
        element:<AdminHome></AdminHome>
      },
       {
        path:'allEvents',
        element:<AllEvents></AllEvents>
      },
       {
        path:'addEvents',
        element:<CreateEvents></CreateEvents>
      },
       {
        path:'manageUsers',
        element:<ManageUsers></ManageUsers>,
       // loader:()=>fetch('http://localhost:5000/users')
      },
      {
        path:'updateEvents/:id',
        element:<UpdateEvents></UpdateEvents>,
        loader:({params})=>fetch(`http://localhost:5000/events/${params.id}`)
      }
    ]
  }
]);
export default router;