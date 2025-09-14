import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";


const useUser = () => {
  //tanstack query
 const axiosPublic=useAxiosPublic()
  const {user}=useAuth()
  const {data:perUser=[],refetch,isPending:isAdminLoading}=useQuery({
    queryKey:['perUser',user?.email],
    queryFn:async()=>{
        const res=await axiosPublic.get(`/users/admin/${user.email}`)
        return res.data
    }
  })
  return [perUser,refetch,isAdminLoading]
};

export default useUser;