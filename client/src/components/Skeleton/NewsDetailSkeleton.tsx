import Skeleton from "react-loading-skeleton";
import AspectRatio from "../AspectRatio";
import CardSkeleton from "./CardSkeleton";

export default function NewsDetailSkeleton() {
  return (
    <section className="w-full max-w-7xl m-auto">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="bg-white p-4 flex-1">
          <div>
            <h1>
              <Skeleton count={1} />
            </h1>
          </div>
          <div className="mt-5 mb-3">
            <Skeleton wrapper={AspectRatio} />
          </div>
          <div className="mb-5">
            <p className="flex">
              <label className="mr-3">
                <Skeleton count={1} className="w-[200px]" />
              </label>
              <label>
                <Skeleton count={1} className="w-[100px]" />
              </label>
            </p>
          </div>
          <div>
            <p>
              <Skeleton count={8} className="mb-3" />
            </p>
          </div>
        </div>
        <div className="w-full lg:w-[400px] bg-white h-fit">
          <div className="p-4">
            <h2 className="text-xl">
              <Skeleton count={1} className="w-[200px]" />
            </h2>
          </div>
          <div>
            {Array(4)
              .fill("")
              .map((_, index) => (
                <div className="p-4 border-b last-of-type:border-none" key={index}>
                  <CardSkeleton variant="row" />
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
