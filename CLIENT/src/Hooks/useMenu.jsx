import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useMenu = () => {
  const axiosSecure = useAxiosSecure();
  const { refetch, data: menu = [] } = useQuery({
    queryKey: ["menu"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/menu`);
      return res.data;
    },
    refetchOnWindowFocus: false,
  });
  return [menu, refetch];
};

export default useMenu;
