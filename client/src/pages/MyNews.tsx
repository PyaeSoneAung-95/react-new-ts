import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance";
import { useAuth } from "../providers/AuthProvider";
import SEO from "../components/SEO";
import NewsCard from "../components/NewsCard";
import EditNewsButton from "../components/EditNewsButton";
import DeleteNewsButton from "../components/DeleteNewsButton";
import MyNewsSkeleton from "../components/Skeleton/MyNewsSkeleton";
import { Link } from "react-router-dom";
import { useState } from "react";
import ResponsivePagination from "react-responsive-pagination";
import { dropEllipsis } from "react-responsive-pagination/narrowBehaviour";

const getNewsByEmployeeId = ({
  queryKey,
}: NewsByEmployeeId): Promise<NewsByCategory> =>
  axiosInstance.get(
    `/api/news/employee/${queryKey[1].employeeId}?page=${queryKey[2]}&limit=12`
  );

export default function MyNews() {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data, isLoading } = useQuery({
    queryKey: ["news", { employeeId: user?._id }, currentPage],
    queryFn: getNewsByEmployeeId,
    keepPreviousData: true,
  });

  if (isLoading) return <MyNewsSkeleton />;

  return (
    <div className="container">
      <SEO title="Account | My News" />
      {data?.news && data.news.length > 0 ? (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data.news.map((item: NewsResponse) => (
              <div className="relative" key={item._id}>
                <NewsCard item={item} />
                <div className="absolute top-3 right-3 flex flex-col gap-3">
                  <EditNewsButton item={item} />
                  <DeleteNewsButton newsId={item._id} />
                </div>
              </div>
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
      ) : (
        <div className="p-4 w-full text-center flex flex-col gap-8 justify-center">
          <h2 className="text-xl font-semibold text-gray-500">
            You didn't create any news yet!
          </h2>
          <Link
            to="/account/create_news"
            className="text-blue-500 font-semibold bg-blue-100 
            w-fit m-auto p-3 rounded-md hover:bg-blue-200"
          >
            Create News
          </Link>
        </div>
      )}
    </div>
  );
}
