import Dropdown from "rc-dropdown";
import AspectRatio from "../AspectRatio";
import ProfileMenu from "./ProfileMenu";

export default function ProfileDropdown({ user }: { user: User }) {
  return (
    <Dropdown trigger={["click"]} overlay={<ProfileMenu />}>
      <button className="h-16  flex items-center">
        <AspectRatio ratio={1 / 1} customStyles="w-[35px] rounded-full mr-2">
          <img
            src={user.image}
            alt="profile image"
            className="rounded-full w-full h-full"
          />
        </AspectRatio>
        <p className="font-medium">{user.name}</p>
      </button>
    </Dropdown>
  );
}
