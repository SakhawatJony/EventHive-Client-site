import { FaFacebook, FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";
import { Link } from "react-router-dom";


const Footer = () => {
    return (
       <footer className="footer footer-center bg-base-200 text-base-content rounded p-10 flex flex-col justify-center">
  <nav className="grid grid-cols-2 md:grid-cols-4 gap-8 text-xl">
    <Link to='/about' className=" hover:bg-blue-600 hover:text-white px-2 rounded-lg">About us</Link>
    <Link to='/contact' className=" hover:bg-blue-600 hover:text-white px-2 rounded-lg">Contact</Link>
    <a className=" hover:bg-blue-600 hover:text-white px-2 rounded-lg">Jobs</a>
    <a className=" hover:bg-blue-600 hover:text-white px-2 rounded-lg">Press kit</a>
  </nav>
  <nav>
    <div className="grid grid-flow-col gap-8">
      <a>
     <FaTwitter className="text-2xl text-blue-600 "></FaTwitter>
      </a>
      <a>
      <FaYoutube className="text-2xl text-red-600"></FaYoutube>
      </a>
      <a>
    <FaFacebook className="text-2xl text-blue-600"></FaFacebook>
      </a>
    </div>
  </nav>
  <aside className="text-xl">
    <p>Copyright © {new Date().getFullYear()} - All right reserved by Event Hive LTD</p>
  </aside>
</footer>
    );
};

export default Footer;