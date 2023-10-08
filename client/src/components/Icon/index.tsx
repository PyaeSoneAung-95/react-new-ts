import { BiUserCircle } from "react-icons/bi";
import {
  AiOutlinePlus,
  AiOutlineLogout,
  AiOutlineCamera,
  AiFillCloseCircle,
  AiFillCheckCircle,
} from "react-icons/ai";
import { TiThListOutline } from "react-icons/ti";
import { HiOutlineUsers, HiOutlinePencilAlt } from "react-icons/hi";
import { BsTrash3 } from "react-icons/bs";

type IconProps = {
  name: string;
  className?: string;
};

export default function Icon({ name, className = "" }: IconProps) {
  switch (name) {
    case "user":
      return <BiUserCircle className={className} />;
    case "users":
      return <HiOutlineUsers className={className} />;
    case "plus":
      return <AiOutlinePlus className={className} />;
    case "list":
      return <TiThListOutline className={className} />;
    case "logout":
      return <AiOutlineLogout className={className} />;
    case "delete":
      return <BsTrash3 className={className} />;
    case "edit":
      return <HiOutlinePencilAlt className={className} />;
    case "camera":
      return <AiOutlineCamera className={className} />;
    case "closeCircle":
      return <AiFillCloseCircle className={className} />;
    case "checkCircle":
      return <AiFillCheckCircle className={className} />;
    default:
      return null;
  }
}
