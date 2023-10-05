import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import NewsCard from "../components/NewsCard";
import SEO from "../components/SEO";
import CategorySkeleton from "../components/Skeleton/CategorySkeleton";

const getNewsByCategory = ({
  queryKey,
}: {
  queryKey: string[];
}): Promise<NewsByCategory> =>
  axiosInstance.get(`/news/category?name=${queryKey[1]}`);

export default function Category() {
  const { name } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["news", name!],
    queryFn: getNewsByCategory,
  });

  if (isLoading) {
    console.log(data);
    return <CategorySkeleton />;
  }

  return (
    <section className="container">
      <div className="bg-white p-4">
        <SEO title={`News | ${name}`} />
        <h2 className="text-2xl font-medium">{name}</h2>
        <div className="mt-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8">
          {data?.news.map((item: NewsResponse) => (
            <NewsCard item={item} key={item._id} />
          ))}
        </div>
      </div>
    </section>
  );
}
