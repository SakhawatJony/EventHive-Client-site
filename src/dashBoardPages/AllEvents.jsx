import { FaTrash, FaUtensils } from "react-icons/fa6";
import useEvents from "../customHook/useEvents";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosPublic from "../customHook/useAxiosPublic";
import { Link } from "react-router-dom";


const AllEvents = () => {
    const[events,refetch]=useEvents()
    const axiosPublic=useAxiosPublic()
    const handleDeleteEvent=(id)=>{
          Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        }).then((result) => {
          if (result.isConfirmed) {
            axiosPublic.delete(`/events/${id}`)
                .then(res=>{
                    console.log(res.data)
                    if(res.data.deletedCount>0){
                Swal.fire({
              title: "Deleted!",
              text: "Your event has been deleted.",
              icon: "success"
            });
                    }
                    refetch()
                })
          }
        });
               
    }
    return (
         <div className="mx-12">
                   <h3 className="text-4xl text-center my-4 font-semibold">All Events</h3>
                   <h3 className="text-2xl ml-6">Events : {events?.length}</h3>
                   <div className="overflow-x-auto">
         <table className="table">
           {/* head */}
           <thead>
             <tr>
               <th>
                Serial No
               </th>
               <th>Event Image</th>
               <th>Title</th>
               <th>Category</th>
               <th>Date</th>
               <th>Update</th>
               <th>Delete</th>
             </tr>
           </thead>
           <tbody>
             {/* row 1 */}
             {
               events.map((event,index)=><tr key={event?._id}>
               <th>
                {index+1}
               </th>
               <td>
                 <div className="flex items-center gap-3">
                   <div className="avatar">
                     <div className="mask mask-squircle h-12 w-12">
                       <img
                         src={event?.image}
                         alt="Avatar Tailwind CSS Component" />
                     </div>
                   </div>
                 </div>
               </td>
               <td>
              {event?.title}
               </td>
               <td>{event?.category}</td>
               <td>{event?.date}</td>
               <th>
                <Link to={`/dashboard/updateEvents/${event?._id}`}><FaEdit className="text-2xl text-teal-600"></FaEdit></Link>
               </th>
               <th><button onClick={()=>handleDeleteEvent(event?._id)}><FaTrash className="text-2xl text-red-500"></FaTrash></button></th>
             </tr>)
             }
           </tbody>
         </table>
       </div>
               </div>
    );
};

export default AllEvents;