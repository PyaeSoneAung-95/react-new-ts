import { Link } from "react-router-dom";
import AspectRatio from "../AspectRatio";
import { format } from "date-fns";

export default function NewsCard({ item }: { item: NewsResponse }) {
  return (
    <Link to={`/news/${item._id}`}>
      <div>
        <AspectRatio>
          <img src={item.image} alt="news image" />
        </AspectRatio>
        <div>
          <p className="name-twoLine">{item.title}</p>
          <p className="text-blue-500 text-sm">
            {format(new Date(item.date), "dd MMM yyyy")}
          </p>
        </div>
      </div>
    </Link>
  );
}
