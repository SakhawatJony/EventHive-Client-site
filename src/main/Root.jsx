import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";


const Root = () => {
    return (
    <div className="">
          <div className="md:max-w-5xl lg:max-w-6xl mx-auto">
          <Navbar></Navbar>
          <Outlet></Outlet>
          
        </div>
        <Footer></Footer>
    </div>
    );
};

export default Root;