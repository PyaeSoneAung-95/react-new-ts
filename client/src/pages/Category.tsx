import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import NewsCard from "../components/NewsCard";
import SEO from "../components/SEO";
import CategorySkeleton from "../components/Skeleton/CategorySkeleton";
import { useState } from "react";
import ResponsivePagination from "react-responsive-pagination";
import { dropEllipsis } from "react-responsive-pagination/narrowBehaviour";

const getNewsByCategory = (
  name: string,
  currentPage: number
): Promise<NewsByCategory> =>
  axiosInstance.get(
    `/api/news/category?name=${name}&page=${currentPage}&limit=12`
  );

export default function Category() {
  const { name } = useParams();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data, isLoading } = useQuery({
    queryKey: ["news", name!, currentPage],
    queryFn: () => getNewsByCategory(name!, currentPage),
    keepPreviousData: true,
  });

  if (isLoading) return <CategorySkeleton />;

  return (
    <section className="container">
      <div className="bg-white p-4">
        <SEO title={`News | ${name}`} />
        <h2 className="text-2xl font-medium">{name}</h2>
        {data ? (
          <>
            <div className="mt-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8">
              {data.news.map((item: NewsResponse) => (
                <NewsCard item={item} key={item._id} />
              ))}
            </div>
            {data.total_page > 1 ? (
              <div className="flex justify-center p-6 mt-8">
                <div className="w-full max-w-md">
                  <ResponsivePagination
                    narrowBehaviour={dropEllipsis}
                    total={data.total_page}
                    current={currentPage}
                    onPageChange={(page) => setCurrentPage(page)}
                  />
                </div>
              </div>
            ) : null}
          </>
        ) : null}
      </div>
    </section>
  );
}
