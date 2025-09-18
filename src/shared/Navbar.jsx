import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from '../assets/logo.png'
import '../App.css'
import useAuth from "../customHook/useAuth";
import useUser from "../customHook/useUser";
import useMyBooking from "../customHook/useMyBooking";
import { ImMenu } from "react-icons/im";
const Navbar = () => {
  const{user,logOut}=useAuth()
  const[isAdmin=[]]=useUser()
  const [bookedEvents]=useMyBooking()
  console.log('Using Tanstack : ',isAdmin)
  const navigate=useNavigate()
  
    const navLink=<>
    <nav className="sm:flex gap-4 items-center sm:text-white text-black">
        <li><NavLink to='/'>Home</NavLink></li>
     {
      !isAdmin &&    <li><NavLink to='/events'>Events</NavLink></li>
     }
       {
        user&& !isAdmin&&<>
       <li><NavLink to='/myBookings' >My Bookings ({bookedEvents?.length})</NavLink></li>
       <li><NavLink to='/profile'>Profile</NavLink></li>
       
        </>
       }
       {
        user && isAdmin&&<>
        <li><NavLink to='/dashboard/adminHome'>Admin DashBoard</NavLink></li>
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
  navigate('/login')
}).catch((error) => {
  console.log('An error happened.')
});
    }
    return (
        
         <div className="navbar bg-[#0c0c0c6e] fixed z-10 md:max-w-5xl lg:max-w-6xl mx-auto ">
  <div className="navbar-start">
    <div className="dropdown ">
      <div tabIndex={0} role="button" className="btn btn-ghost sm:hidden">
       <ImMenu className="text-2xl text-white"/>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
     {navLink}
      </ul>
    </div>
 <Link to='/' className="">   <img className=" w-12 sm:w-24 bg-white rounded-full" src={logo} alt="" /></Link>
  </div>
  <div className="navbar-center hidden sm:flex">
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