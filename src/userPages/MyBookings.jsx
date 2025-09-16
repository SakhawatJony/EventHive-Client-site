import { FaTrash } from "react-icons/fa6";
import useMyBooking from "../customHook/useMyBooking";
import Swal from "sweetalert2";
import useAxiosPublic from "../customHook/useAxiosPublic";


const MyBookings = () => {
    const [bookedEvents,refetch] = useMyBooking();
const axiosPublic=useAxiosPublic()
const totalPrice = bookedEvents.reduce((total, item) => total + item?.price, 0);
    const handleDeleteSelectedEvents=(id)=>{
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
    axiosPublic.delete(`/bookedEvents/${id}`)
        .then(res=>{
            console.log(res.data)
            if(res.data.deletedCount>0){
        Swal.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success"
    });
            }
            refetch()
        })
  }
});
       
    }
    return (
        <div className="pt-32 pb-6">
           <div className="flex justify-evenly my-6"> 
            <h3 className=" text-4xl font-bold ">My Bookings : {bookedEvents.length}</h3>
            <h3 className="text-4xl font-semibold">Total Price: {totalPrice}</h3>
            <button className="btn btn-primary">Pay</button></div>
            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>Serial No</th>
        <th>Category</th>
        <th>Title</th>
        <th>Type</th>
        <th>Price</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        bookedEvents.map((event,index)=><tr key={event?._id}>
        <th>{index+1}</th>
        <td>{event?.category}</td>
        <td>{event?.title}</td>
        <td>{event?.type}</td>
        <td>{event?.price}</td>
        <td><button onClick={()=>handleDeleteSelectedEvents(event?._id)}><FaTrash className="text-2xl text-red-500 hover:text-red-700"></FaTrash></button></td>
      </tr>)
      }
     
    </tbody>
  </table>
</div>
        </div>
    );
};

export default MyBookings;