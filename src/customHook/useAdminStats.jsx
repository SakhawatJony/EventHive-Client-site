import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useAdminStats = () => {
  //tanstack query
 const axiosPublic=useAxiosPublic()
  const {data:stats=[],refetch,}=useQuery({
    queryKey:['stats'],
    queryFn:async()=>{
        const res=await axiosPublic.get(`/admin-stats`)
        return res.data
    }
  })
  return [stats,refetch]
};

export default useAdminStats;