import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance";

const getNewsGroupByCategory = (): Promise<NewsGroupByCategoryResponse> =>
  axiosInstance.get("/api/news/group_by_category");

export const useNewsGroupByCategoryData = () => {
  return useQuery({
    queryKey: ["news", "group_by_category"],
    queryFn: getNewsGroupByCategory,
  });
};
