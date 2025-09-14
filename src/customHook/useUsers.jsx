import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useUsers = () => {
  //tanstack query
 const axiosPublic=useAxiosPublic()
  const {data:users=[],refetch}=useQuery({
    queryKey:['perUser'],
    queryFn:async()=>{
        const res=await axiosPublic.get(`/users`)
        return res.data
    }
  })
  return [users,refetch]
};

export default useUsers;