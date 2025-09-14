import { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../customHook/useAuth";
import logo from '../assets/logo.png'
import useTitle from "../customHook/useTitle";

const AdminDashBoard = () => {
   useTitle('EventHive | DashBoard')
      const [open, setOpen] = useState(false);
      const navigate=useNavigate()
      const {logOut}=useAuth()
          const handleLogOut=()=>{
      logOut()
      .then(() => {
  console.log('Sign-out successful.')
  navigate('/')
}).catch((error) => {
  console.log('An error happened.')
});
    }
    return (
        <div className="flex">
          <div className="w-72 menu bg-teal-500 text-xl min-h-screen">
           <Link to='/'> <img className="w-44 h-36"  src={logo} alt="" /></Link>
          <nav className="text-white text-xl">
            <li><NavLink to='/dashboard/adminHome'>Admin Home</NavLink></li>
                   <li className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="hover:text-blue-400"
          >
            Events ▾
          </button>

          {open && (
            <ul className="absolute z-10 bg-white text-black shadow-lg rounded-md ml-20 mt-6 w-44">
              <li>
                <NavLink
                  to='/dashboard/allEvents'
                  className="block px-4 py-2 hover:bg-blue-500 hover:text-white mr-2 mt-2"
                >
                  All Events
                </NavLink>
              </li>
             
              <li>
                <NavLink
                  to='/dashboard/addEvents'
                  className="block px-4 py-2 hover:bg-blue-500 hover:text-white mr-2 mb-2"
                >
                  Add Event
                </NavLink>
              </li>
            </ul>
          )}
        </li>
        <li><NavLink to='/dashboard/manageUsers'>Manage Users</NavLink></li>
        <hr className="my-4" />
        <li><NavLink to='/'>Home</NavLink></li>
          <button  className="text-white text-xl  ml-3" onClick={handleLogOut}>Logout</button>
          </nav>
        
          </div>
          <div className="flex-1">
            <Outlet></Outlet>
          </div>
        </div>
    );
};

export default AdminDashBoard;


/*
import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex justify-between items-center pt-32">
      <h1 className="text-xl font-bold">Event Hive</h1>

      <ul className="flex gap-6">
        <li>
          <a href="/" className="hover:text-blue-400">
            Home
          </a>
        </li>

       
        <li className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="hover:text-blue-400"
          >
            Events ▾
          </button>

          {open && (
            <ul className="absolute bg-white text-black shadow-lg rounded-md mt-2 w-40">
              <li>
                <a
                  href="/events"
                  className="block px-4 py-2 hover:bg-blue-500 hover:text-white"
                >
                  All Events
                </a>
              </li>
              <li>
                <a
                  href="/manage-events"
                  className="block px-4 py-2 hover:bg-blue-500 hover:text-white"
                >
                  Manage Events
                </a>
              </li>
              <li>
                <a
                  href="/add-event"
                  className="block px-4 py-2 hover:bg-blue-500 hover:text-white"
                >
                  Add Event
                </a>
              </li>
            </ul>
          )}
        </li>

        <li>
          <a href="/contact" className="hover:text-blue-400">
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
*/

