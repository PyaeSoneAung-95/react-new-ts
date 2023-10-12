import { useInfiniteQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance";
import { useAuth } from "../providers/AuthProvider";
import SEO from "../components/SEO";
import NewsCard from "../components/NewsCard";
import EditNewsButton from "../components/EditNewsButton";
import DeleteNewsButton from "../components/DeleteNewsButton";
import MyNewsSkeleton from "../components/Skeleton/MyNewsSkeleton";
import { Link } from "react-router-dom";

type MyNewsFun = (pageParam: number, id: string | undefined) => Promise<NewsByCategory>;

const getMyNews: MyNewsFun = (pageParam, id) =>
  axiosInstance.get(`/api/news/employee/${id}?page=${pageParam}&limit=12`);

export default function MyNews() {
  const { user } = useAuth();

  const { data, hasNextPage, fetchNextPage, isLoading, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["mynews"],
      queryFn: ({ pageParam = 1 }) => getMyNews(pageParam, user?._id),
      getNextPageParam: (lastPage, pages) => {
        return pages.length < lastPage.total_page ? pages.length + 1 : undefined;
      },
    });

  if (isLoading) return <MyNewsSkeleton />;

  return (
    <div className="container">
      <SEO title="Account | My News" />
      {data && data.pages[0].news.length > 0 ? (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data.pages.map((page) =>
              page.news.map((item) => (
                <div className="relative" key={item._id}>
                  <NewsCard item={item} />
                  <div className="absolute top-3 right-3 flex flex-col gap-3">
                    <EditNewsButton item={item} />
                    <DeleteNewsButton newsId={item._id} />
                  </div>
                </div>
              ))
            )}
          </div>
          {hasNextPage ? (
            <div className="px-4 pt-8 flex justify-center">
              <button
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className="bg-blue-100 p-3 rounded-md text-blue-500 enabled:hover:bg-blue-200"
              >
                {isFetchingNextPage ? "Loading..." : "View More"}
              </button>
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
