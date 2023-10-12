import { Link } from "react-router-dom";
import AspectRatio from "../AspectRatio";
import { format } from "date-fns";

export default function NewsCard({
  item,
  variant = "col",
}: {
  item: NewsResponse;
  variant?: string;
}) {
  return (
    <Link to={`/news/${item._id}`}>
      <div className={variant === "row" ? "flex flex-row gap-6" : ""}>
        <AspectRatio customStyles={variant === "row" ? "w-[100px]" : ""}>
          <img src={item.image} alt="news image" />
        </AspectRatio>
        <div className={variant === "row" ? "flex-1" : ""}>
          <p className="name-twoLine">{item.title}</p>
          <p className="text-blue-500 text-sm">
            {format(new Date(item.date), "dd MMM yyyy")}
          </p>
        </div>
      </div>
    </Link>
  );
}
