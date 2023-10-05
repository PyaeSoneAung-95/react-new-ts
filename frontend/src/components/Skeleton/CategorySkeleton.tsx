import Skeleton from "react-loading-skeleton";
import CardSkeleton from "./CardSkeleton";

export default function CategorySkeleton() {
  return (
    <section className="container">
      <div className="bg-white p-4">
        <h2 className="text-2xl font-medium">
          <Skeleton count={1} className="w-full max-w-[100px]" />
        </h2>
        <div className="mt-5 grid grid-cols-4 gap-x-6 gap-y-8">
          {Array(4)
            .fill("")
            .map((_item, index) => (
              <CardSkeleton key={index} />
            ))}
        </div>
      </div>
    </section>
  );
}
