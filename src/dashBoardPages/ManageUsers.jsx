import { FaTrash } from "react-icons/fa6";
import { useLoaderData } from "react-router-dom";
import useAxiosPublic from "../customHook/useAxiosPublic";
import useUsers from "../customHook/useUsers";
import Swal from "sweetalert2";

const ManageUsers = () => {
    const[users,refetch]=useUsers()
    console.log(users)
  //  const users=useLoaderData()
    const axiosPublic=useAxiosPublic()
    const handleMakeAdmin=(id)=>{
        Swal.fire({
  title: "Are you sure?",
  text: "You want to make this user as a Admin!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, Make Admin!"
}).then((result) => {
 axiosPublic.patch(`http://localhost:5000/users/${id}`)
.then(res=>{
    console.log(res.data)
    if(res.data.modifiedCount>0){
if (result.isConfirmed) {
    Swal.fire({
      title: "Converted to Admin",
      text: "This is Admin From now.",
      icon: "success"
    });
  }
    }
     
    refetch()
})
});

    }

    const handleDeleteUser=(id)=>{
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
    axiosPublic.delete(`/users/${id}`)
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
        <div>
            <h3 className="text-4xl text-center my-4 font-semibold">All Users</h3>
            <h3 className="text-2xl ml-6">Users : {users?.length}</h3>
            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>
         Serial No
        </th>
        <th>User Image</th>
        <th>Name</th>
        <th>Email</th>
        <th>User Role</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        users.map((user,index)=><tr key={user?._id}>
        <th>
         {index+1}
        </th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src={user?.photo}
                  alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
          </div>
        </td>
        <td>
       {user?.name}
        </td>
        <td>{user?.email}</td>
        <th>
         {user?.role==='admin'? 'Admin':<button onClick={()=>handleMakeAdmin(user?._id)}>User</button>}
        </th>
        <th><button onClick={()=>handleDeleteUser(user?._id)}><FaTrash className="text-2xl text-red-500"></FaTrash></button></th>
      </tr>)
      }
    </tbody>
  </table>
</div>
        </div>
    );
};

export default ManageUsers;