import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useEvent = (id) => {
  const axiosPublic = useAxiosPublic();

  const { data:event = { ticketTypes: [] }, refetch, isLoading } = useQuery({
    queryKey: ["event", id],   //
    queryFn: async () => {
      const res = await axiosPublic.get(`/events/${id}`);
      return res.data;
    },
    enabled: !!id 
  });

  return [event, refetch, isLoading];
};

export default useEvent;
