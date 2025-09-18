import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";

const useUser = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  const { data: isAdmin = false, isLoading, isError, refetch } = useQuery({
    queryKey: ['isAdmin', user?.email],
    queryFn: async () => {
      if (!user?.email) return false;
      try {
        const res = await axiosPublic.get(`/users/admin/${user.email}`);
        console.log("Admin API Response:", res.data);
        return !!res.data?.admin; // boolean
      } catch (err) {
        console.error("Admin API Error:", err);
        return false; // fail safe
      }
    },
    enabled: !!user?.email, // only run if user.email exists
    retry: false,            // avoid infinite retry loops
  });

  // isLoading will be true only when query is running
  const isAdminLoading = isLoading;

  return [isAdmin, isAdminLoading,refetch];
};

export default useUser;

