import Skeleton from "react-loading-skeleton";
import AspectRatio from "../AspectRatio";

export default function NewsDetailSkeleton() {
  return (
    <section className="container__small">
      <div className="bg-white p-4">
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
    </section>
  );
}
