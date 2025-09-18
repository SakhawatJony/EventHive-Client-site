import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAxiosSecure from "./useAxiosSecure";


const useUsers = () => {
  //tanstack query
 const axiosSecure=useAxiosSecure()
//const axiosPublic=useAxiosPublic()
  const {data:users=[],refetch}=useQuery({
    queryKey:['users'],
    queryFn:async()=>{
        const res=await axiosSecure.get(`/users`)
        return res.data
    }
  })
  return [users,refetch]
};

export default useUsers;