import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";


const useMyBooking = () => {
  //tanstack query
 const axiosPublic=useAxiosPublic()
  const {user}=useAuth()
  const {data:bookedEvents=[],refetch,isPending:isAdminLoading}=useQuery({
    queryKey:['bookedEvents',user?.email],
    queryFn:async()=>{
        const res=await axiosPublic.get(`/bookedEvents/email/${user.email}`)
        return res.data
    }
  })
  return [bookedEvents,refetch,isAdminLoading]
};

export default useMyBooking;