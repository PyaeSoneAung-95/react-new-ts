import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance";
import { useAuth } from "../providers/AuthProvider";
import SEO from "../components/SEO";
import NewsCard from "../components/NewsCard";
import EditNewsButton from "../components/EditNewsButton";
import DeleteNewsButton from "../components/DeleteNewsButton";
import MyNewsSkeleton from "../components/Skeleton/MyNewsSkeleton";

const getNewsByEmployeeId = (
  employeeId: string | undefined
): Promise<NewsByCategory> => axiosInstance.get(`/news/employee/${employeeId}`);

export default function MyNews() {
  const { user } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["news", { employeeId: user?._id }],
    queryFn: () => getNewsByEmployeeId(user?._id),
  });

  if (isLoading) return <MyNewsSkeleton />;

  return (
    <div className="container">
      <SEO title="Account | My News" />
      <div className="grid grid-cols-4 gap-6">
        {data?.news && data.news.length > 0 ? (
          data.news.map((item: NewsResponse) => (
            <div className="relative" key={item._id}>
              <NewsCard item={item} />
              <div className="absolute top-3 right-3 flex flex-col gap-3">
                <EditNewsButton item={item} />
                <DeleteNewsButton newsId={item._id} />
              </div>
            </div>
          ))
        ) : (
          <div>No data found</div>
        )}
      </div>
    </div>
  );
}
