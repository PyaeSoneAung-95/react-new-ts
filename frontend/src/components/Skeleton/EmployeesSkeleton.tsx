import Skeleton from "react-loading-skeleton";

export default function EmployeeSkeleton() {
  return (
    <div className="p-3 grid grid-cols-2 gap-6">
      {Array(2)
        .fill("")
        .map((_, index) => (
          <div
            key={index}
            className="p-3 rounded-md bg-white flex gap-3 items-center"
          >
            <Skeleton circle={true} className="w-12 h-12" />
            <div className="flex-1">
              <p className="text-lg font-medium">
                <Skeleton className="w-[50%]" />
              </p>
              <p className="text-base text-gray-500">
                <Skeleton className="w-[50%]" />
              </p>
            </div>
            <div>
              <button>
                <Skeleton count={1} className="w-10 h-10" />
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}
