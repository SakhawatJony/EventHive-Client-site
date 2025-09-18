import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAxiosSecure from "./useAxiosSecure";


const useAdminStats = () => {
  //tanstack query
const axiosSecure=useAxiosSecure()
//const axiosPublic=useAxiosPublic()
  const {data:stats=[],refetch,}=useQuery({
    queryKey:['stats'],
    queryFn:async()=>{
        const res=await axiosSecure.get(`/admin-stats`)
        return res.data
    }
  })
  return [stats,refetch]
};

export default useAdminStats;