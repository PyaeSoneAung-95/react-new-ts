import CardSkeleton from "./CardSkeleton";

export default function MyNewsSkeleton() {
  return (
    <div className="container">
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array(4)
          .fill("")
          .map((_, index) => (
            <div key={index}>
              <CardSkeleton />
            </div>
          ))}
      </div>
    </div>
  );
}
