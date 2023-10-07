import Skeleton from "react-loading-skeleton";
import AspectRatio from "../AspectRatio";

export default function CardSkeleton() {
  return (
    <div>
      <Skeleton wrapper={AspectRatio} count={1} />
      <div>
        <p className="mt-3">
          <Skeleton count={2} />
        </p>
        <p className="mt-3">
          <Skeleton height="20px" count={1} width="50%" />
        </p>
      </div>
    </div>
  );
}
