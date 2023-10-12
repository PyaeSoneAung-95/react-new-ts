import { useParams } from "react-router-dom";
import AspectRatio from "../components/AspectRatio";
import { format } from "date-fns";
import SEO from "../components/SEO";
import useNewsDetail from "../hooks/useNewsDetail";
import NewsDetailSkeleton from "../components/Skeleton/NewsDetailSkeleton";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance";
import NewsCard from "../components/NewsCard";

const getRelatedNews = (
  name: string | undefined,
  id: string
): Promise<{ news: NewsResponse[] }> =>
  axiosInstance.get(`/api/news/related?category=${name}&id=${id}`);

export default function NewsDetail() {
  const { newsId } = useParams();
  const { data: newsData, isLoading } = useNewsDetail(newsId!);
  const { data } = useQuery({
    queryKey: ["related", newsData?.news.category],
    queryFn: () => getRelatedNews(newsData?.news.category, newsId!),
    enabled: !!newsData,
  });

  if (isLoading) return <NewsDetailSkeleton />;

  return (
    <section className="w-full max-w-7xl m-auto">
      {newsData ? (
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="bg-white p-4 flex-1">
            <SEO title={newsData.news.title} />
            <div>
              <h1 className="text-xl myanmar font-semibold">{newsData.news.title}</h1>
            </div>
            <div className="mt-5 mb-3">
              <AspectRatio>
                <img src={newsData.news.image} alt="" className="w-full h-full" />
              </AspectRatio>
            </div>
            <div className="mb-5">
              <p>
                <label className="font-semibold text-blue-500">
                  {format(new Date(newsData.news.date), "dd MMMM yyyy")}
                </label>
                <label className="font-semibold text-blue-500 ml-3 dot before:bg-blue-500">
                  {newsData.news.category}
                </label>
              </p>
            </div>
            <div
              dangerouslySetInnerHTML={{ __html: newsData.news.content }}
              className="myanmar whitespace-pre-wrap"
            ></div>
          </div>
          <div className="w-full lg:w-[400px] bg-white h-fit">
            <div className="p-4">
              <h2 className="text-xl font-semibold">Related News</h2>
            </div>
            <div>
              {data?.news.map((item) => (
                <div className="p-4 border-b last-of-type:border-none" key={item._id}>
                  <NewsCard item={item} variant="row" />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
