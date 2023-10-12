import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";
import Icon from "../Icon";
import { navList } from "../../utils/navList";

export default function Sidebar() {
  const { pathname } = useLocation();
  const { user } = useAuth();

  return (
    <aside className="sidebar">
      <ul className="my-4 px-2">
        {navList.map((navItem) =>
          navItem.isAuth ? (
            user?.role === "admin" ? (
              <li key={navItem.name}>
                <Link
                  to={navItem.linkTo}
                  className={`sidebarItem ${pathname === navItem.linkTo ? "active" : ""}`}
                >
                  <Icon name={navItem.iconName} className="mr-2 w-6 h-6" />
                  {navItem.name}
                </Link>
              </li>
            ) : null
          ) : (
            <li key={navItem.name}>
              <Link
                to={navItem.linkTo}
                className={`sidebarItem ${pathname === navItem.linkTo ? "active" : ""}`}
              >
                <Icon name={navItem.iconName} className="mr-2 w-6 h-6" />
                {navItem.name}
              </Link>
            </li>
          )
        )}
      </ul>
    </aside>
  );
}
