import { Link } from "react-router-dom";
import AuthButton from "../AuthButton";
import { useAuth } from "../../providers/AuthProvider";
import ProfileDropdown from "../ProfileDropdown";
import "rc-dropdown/assets/index.css";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="navbar">
      <Link to="/" className="text-2xl font-medium">
        NEWS
      </Link>
      <div>{user ? <ProfileDropdown user={user} /> : <AuthButton />}</div>
    </nav>
  );
}
