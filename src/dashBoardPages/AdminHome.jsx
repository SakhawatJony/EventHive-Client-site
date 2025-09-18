import { FaList, FaUsers, FaUserTie } from "react-icons/fa";
import useAdminStats from "../customHook/useAdminStats";
import { FaTicket } from "react-icons/fa6";


const AdminHome = () => {
    const [stats]=useAdminStats()
    console.log('Stats :',stats)
    return (
        <div className="mx-6 md:mx-32">
            <h3 className="text-5xl font-bold text-center my-12">Admin Home</h3>
            <div className="stats shadow w-full ">

  <div className="stat">
    <div className="stat-figure text-secondary">
      <FaUsers className="text-5xl text-cyan-500"></FaUsers>
    </div>
    <div className="stat-title text-3xl font-semibold">Total Users</div>
    <div className="stat-value">{stats?.users}</div>
  </div>

  <div className="stat ">
    <div className="stat-figure text-secondary">
     <FaList className="text-5xl text-cyan-500"></FaList>
    </div>
    <div className="stat-title text-3xl font-semibold">Total Events</div>
    <div className="stat-value">{stats?.events}</div>
  </div>
   
</div>
<div className="stats shadow w-full mt-8">
  <div className="stat ">
    <div className="stat-figure text-secondary">
     <FaTicket className="text-5xl text-cyan-500"></FaTicket>
    </div>
    <div className="stat-title text-3xl font-semibold">Total Booked Ticket</div>
    <div className="stat-value">{stats?.soldTicket}</div>
  </div>
  <div className="stat">
    <div className="stat-figure text-secondary">
      <FaUserTie className="text-5xl text-cyan-500"></FaUserTie>
     
    </div>
    <div className="stat-title text-3xl font-semibold">Total Ticket Ordered Users </div>
    <div className="stat-value">{stats?.orderedPerson}</div>
  </div>
</div>

        </div>
    );
};

export default AdminHome;