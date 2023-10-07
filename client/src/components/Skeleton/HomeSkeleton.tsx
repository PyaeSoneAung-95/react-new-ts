import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import CardSkeleton from "./CardSkeleton";

export default function HomeSkeleton() {
  return (
    <SkeletonTheme baseColor="#e9e9ef" highlightColor="rgb(243 244 246)">
      <div className="container">
        {Array(5)
          .fill("")
          .map((_item, index) => (
            <div key={index} className="mb-10 bg-white p-4">
              <div className="flex justify-between items-center">
                <Skeleton height="32px" width="200px" count={1} />
                <Skeleton height="32px" width="80px" count={1} />
              </div>
              <div className="mt-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Array(4)
                  .fill("")
                  .map((_innerItem, index) => (
                    <CardSkeleton key={index} />
                  ))}
              </div>
            </div>
          ))}
      </div>
    </SkeletonTheme>
  );
}
