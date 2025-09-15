import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useEvents = () => {
  //tanstack query
 const axiosPublic=useAxiosPublic()
  const {data:events=[],refetch}=useQuery({
    queryKey:['events'],
    queryFn:async()=>{
        const res=await axiosPublic.get(`/events`)
        return res.data
    }
  })
  return [events,refetch]
};

export default useEvents;