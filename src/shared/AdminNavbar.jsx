import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from '../assets/logo.png'
import '../App.css'
import useAuth from "../customHook/useAuth";
import { ImMenu } from "react-icons/im";
const AdminNavbar = () => {
  const{logOut}=useAuth()
 const navigate=useNavigate()
    const navLink=<>
    <nav className="flex flex-col gap-4 z-10 items-center text-black rounded-xl bg-white">
        <li><NavLink to='/'>Home</NavLink></li>
       <li><NavLink to='/dashboard/adminHome'>Admin Home</NavLink></li>
       <li><NavLink to='/dashboard/allEvents'>All Events</NavLink></li>
       <li><NavLink to='/dashboard/manageUsers'>Manage Users</NavLink></li>
       <li><NavLink to='/dashboard/addEvents'>Add Events</NavLink></li>
      
         
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
        
         <div className="navbar bg-teal-400 block md:hidden ">
  <div className="navbar-start">
    <div className="dropdown ">
      <div tabIndex={0} role="button" className="btn btn-ghost hover:bg-black sm:hidden">
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
 <button className="btn btn-primary" onClick={handleLogOut}>Logout</button>
 
  </div>
</div>
       
    );
};

export default AdminNavbar;