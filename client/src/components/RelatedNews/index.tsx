import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";
import NewsCard from "../NewsCard";

const getRelatedNews = (name: string, id: string): Promise<{ news: NewsResponse[] }> =>
  axiosInstance.get(`/api/news/related?category=${name}&id=${id}`);

export default function RelatedNews({ name, newsId }: { name: string; newsId: string }) {
  const { data } = useQuery({
    queryKey: ["related", newsId, name],
    queryFn: () => getRelatedNews(name, newsId),
  });

  return (
    <div>
      {data?.news.map((item) => (
        <div className="p-4 border-b last-of-type:border-none" key={item._id}>
          <NewsCard item={item} variant="row" />
        </div>
      ))}
    </div>
  );
}
