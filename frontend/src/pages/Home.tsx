import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { useNewsGroupByCategoryData } from "../hooks/useNewsGroupByCategoryData";
import NewsCard from "../components/NewsCard";
import HomeSkeleton from "../components/Skeleton/HomeSkeleton";

export default function Home() {
  const { data, isLoading } = useNewsGroupByCategoryData();

  if (isLoading) return <HomeSkeleton />;

  return (
    <div className="container">
      <SEO title="Home" />
      {data?.news.map((group: NewsGroupByCategory) => (
        <div key={group.category} className="mb-10 bg-white p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-medium">{group.category}</h2>
            <Link
              to={`/category/${group.category}`}
              className="text-blue-500 font-medium"
            >
              View more
            </Link>
          </div>
          <div className="mt-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {group.list.map((item: NewsResponse) => (
              <NewsCard item={item} key={item._id} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
