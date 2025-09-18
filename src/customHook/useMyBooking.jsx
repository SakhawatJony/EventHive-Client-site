import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";
import axios from "axios";


const useMyBooking = () => {
  //tanstack query
 //const axiosPublic=useAxiosPublic()
  const {user}=useAuth()
  const {data:bookedEvents=[],refetch}=useQuery({
    queryKey:['bookedEvents',user?.email],
    enabled: !!user?.email,
    queryFn:async()=>{
        const res=await axios.get(`http://localhost:5000/bookedEvents/email/${user.email}`)
        return res.data
    }
  })
  return [bookedEvents,refetch]
};

export default useMyBooking;