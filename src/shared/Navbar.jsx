import { Link, NavLink } from "react-router-dom";
import logo from '../assets/logo.png'
import '../App.css'
import useAuth from "../customHook/useAuth";
import useUser from "../customHook/useUser";
const Navbar = () => {
  const{user,logOut}=useAuth()
  const[perUser]=useUser()
  console.log('Using Tanstack : ',perUser)
  const isAdmin=perUser?.admin;
    const navLink=<>
    <nav className="md:flex gap-4 items-center text-white">
        <li><NavLink to='/'>Home</NavLink></li>
     {
      !isAdmin &&    <li><NavLink to='/events'>Events</NavLink></li>
     }
       {
        user&& !isAdmin&&<>
       <li><NavLink to='/myBookings'>My Bookings</NavLink></li>
       <li><NavLink to='/profile'>Profile</NavLink></li>
        </>
       }
       {
        user && isAdmin&&<>
        <li><NavLink to='/dashboard'>Admin DashBoard</NavLink></li>
       <li><NavLink to='/dashboard/allEvents'>Manage Events</NavLink></li>
       <li><NavLink to='/manageBookings'>Manage Bookings</NavLink></li>
       <li><NavLink to='/reports'>Reports</NavLink></li>
        </>
       }
       {!user && <>
        <li><NavLink to='/about'>About</NavLink></li>
        <li><NavLink to='/contact'>Contact</NavLink></li>
        <li><NavLink to='/login'>Login</NavLink></li>
       </>}
     {/* 

       
     */}
         
    </nav>
    </>
    const handleLogOut=()=>{
      logOut()
      .then(() => {
  console.log('Sign-out successful.')
}).catch((error) => {
  console.log('An error happened.')
});
    }
    return (
        
         <div className="navbar bg-[#0c0c0c6e] fixed z-10 max-w-6xl mx-auto ">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
     {navLink}
      </ul>
    </div>
 <Link to='/'>   <img className="w-24 bg-white rounded-full" src={logo} alt="" /></Link>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {navLink}
    </ul>
  </div>
  <div className="navbar-end">
  {
    user&&!isAdmin&& <><p className="text-white">{user?.email}</p><img title={user?.displayName} className="w-12 h-12 rounded-full mx-2" src={user?.photoURL} alt="" /><button className="btn btn-primary" onClick={handleLogOut}>Logout</button></>
  }
  </div>
</div>
       
    );
};

export default Navbar;