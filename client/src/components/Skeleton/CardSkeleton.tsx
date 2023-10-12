import Skeleton from "react-loading-skeleton";
import AspectRatio from "../AspectRatio";

export default function CardSkeleton({ variant = "col" }) {
  return (
    <div className={variant === "row" ? "flex flex-row gap-6" : ""}>
      <Skeleton
        wrapper={AspectRatio}
        count={1}
        className={variant === "row" ? "w-[100px]" : ""}
      />
      <div className={variant === "row" ? "flex-1" : ""}>
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
