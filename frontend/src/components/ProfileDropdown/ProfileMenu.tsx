import Menu, { MenuItem } from "rc-menu";
import { AiOutlineLogout, AiOutlinePlus } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { TiThListOutline } from "react-icons/ti";
import { Link } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";

export default function ProfileMenu() {
  const { updateUser } = useAuth();

  return (
    <Menu className="menu">
      <MenuItem key="profileSetting">
        <Link className="menuItem" to="/account">
          <BiUserCircle className="mr-3 w-7 h-7" />
          Profile Setting
        </Link>
      </MenuItem>
      <MenuItem key="createNews">
        <Link className="menuItem" to="/account/create_news">
          <AiOutlinePlus className="mr-3 w-6 h-6" />
          Create News
        </Link>
      </MenuItem>
      <MenuItem key="myNews">
        <Link className="menuItem" to="/account/mynews">
          <TiThListOutline className="mr-3 w-6 h-6" />
          My News
        </Link>
      </MenuItem>
      <MenuItem key="logout">
        <button className="menuItem" onClick={() => updateUser(null)}>
          <AiOutlineLogout className="mr-3 w-6 h-6" />
          Logout
        </button>
      </MenuItem>
    </Menu>
  );
}
