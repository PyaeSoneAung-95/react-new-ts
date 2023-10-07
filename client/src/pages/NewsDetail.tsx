import { useParams } from "react-router-dom";
import AspectRatio from "../components/AspectRatio";
import { format } from "date-fns";
import SEO from "../components/SEO";
import useNewsDetail from "../hooks/useNewsDetail";
import NewsDetailSkeleton from "../components/Skeleton/NewsDetailSkeleton";

export default function NewsDetail() {
  const { newsId } = useParams();
  const { data, isLoading } = useNewsDetail(newsId!);

  if (isLoading) return <NewsDetailSkeleton />;

  return (
    <section className="container__small">
      {data ? (
        <div className="bg-white p-4">
          <SEO title={data.news.title} />
          <div>
            <h1 className="text-xl myanmar font-semibold">{data.news.title}</h1>
          </div>
          <div className="mt-5 mb-3">
            <AspectRatio>
              <img src={data.news.image} alt="" className="w-full h-full" />
            </AspectRatio>
          </div>
          <div className="mb-5">
            <p>
              <label className="font-semibold text-blue-500">
                {format(new Date(data.news.date), "dd MMMM yyyy")}
              </label>
              <label className="font-semibold text-blue-500 ml-3 dot before:bg-blue-500">
                {data.news.category}
              </label>
            </p>
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: data.news.content }}
            className="myanmar whitespace-pre-wrap"
          ></div>
        </div>
      ) : null}
    </section>
  );
}
