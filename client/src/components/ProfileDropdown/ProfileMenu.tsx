import Menu, { MenuItem } from "rc-menu";
import { Link } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";
import Icon from "../Icon";
import { navList } from "../../utils/navList";

export default function ProfileMenu() {
  const { user, updateUser } = useAuth();

  return (
    <Menu className="menu">
      {navList.map((navItem) =>
        navItem.isAuth ? (
          user?.role === "admin" ? (
            <MenuItem key={navItem.name}>
              <Link className="menuItem" to={navItem.linkTo}>
                <Icon name={navItem.iconName} className="mr-3 w-7 h-7" />
                {navItem.name}
              </Link>
            </MenuItem>
          ) : null
        ) : (
          <MenuItem key={navItem.name}>
            <Link className="menuItem" to={navItem.linkTo}>
              <Icon name={navItem.iconName} className="mr-3 w-7 h-7" />
              {navItem.name}
            </Link>
          </MenuItem>
        )
      )}
      <MenuItem key="logout">
        <button className="menuItem" onClick={() => updateUser(null)}>
          <Icon name="logout" className="mr-3 w-6 h-6" />
          Logout
        </button>
      </MenuItem>
    </Menu>
  );
}
