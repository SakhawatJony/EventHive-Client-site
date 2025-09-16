import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";


const usePaymentHistory = () => {
  //tanstack query
 const axiosPublic=useAxiosPublic()
  const {user}=useAuth()
  const {data:paymentHistory=[],refetch}=useQuery({
    queryKey:['paymentHistory',user?.email],
    queryFn:async()=>{
        const res=await axiosPublic.get(`/paymentHistory/${user.email}`)
        return res.data
    }
  })
  return [paymentHistory,refetch]
};

export default usePaymentHistory;