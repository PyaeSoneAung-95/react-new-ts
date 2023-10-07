import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance";

export const getNewsById = ({ queryKey }: { queryKey: string[] }):Promise<NewsDetailResponse> =>
  axiosInstance.get(`/api/news/${queryKey[1]}`);

export default function useNewsDetail(newsId: string) {
  return useQuery({
    queryKey: ["news", newsId],
    queryFn: getNewsById,
  });
}
