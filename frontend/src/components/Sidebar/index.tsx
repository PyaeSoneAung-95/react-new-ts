import { Link, useLocation } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { TiThListOutline } from "react-icons/ti";

export default function Sidebar() {
  const { pathname } = useLocation();

  return (
    <aside className="sidebar">
      <ul className="my-4 px-2">
        <li>
          <Link
            to="/account"
            className={`sidebarItem ${pathname === "/account" ? "active" : ""}`}
          >
            <BiUserCircle className="mr-2 w-7 h-7" />
            Profile Setting
          </Link>
        </li>
        <li>
          <Link
            to="/account/create_news"
            className={`sidebarItem ${
              pathname === "/account/create_news" ? "active" : ""
            }`}
          >
            <AiOutlinePlus className="mr-2 w-6 h-6" />
            Create News
          </Link>
        </li>
        <li>
          <Link
            to="/account/mynews"
            className={`sidebarItem ${
              pathname === "/account/mynews" ? "active" : ""
            }`}
          >
            <TiThListOutline className="mr-2 w-6 h-6" />
            My News
          </Link>
        </li>
      </ul>
    </aside>
  );
}
