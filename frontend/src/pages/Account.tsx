import AspectRatio from "../components/AspectRatio";
import { AiOutlineCamera } from "react-icons/ai";
import EmployeeForm from "../components/EmployeeForm";
import SEO from "../components/SEO";
import { useAuth } from "../providers/AuthProvider";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance";
import { toastOptions } from "../utils/toastOptions";
import { toast } from "react-toastify";
import { useRef, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import OverlayLoading from "../components/OverlayLoading";

const uploadProfile = ({
  file,
  id,
}: {
  file: FormData;
  id: string | undefined;
}): Promise<UploadProfileResponse> =>
  axiosInstance.put(`/employee/profile/${id}`, file);

export default function Account() {
  const { user, updateUser } = useAuth();
  const [isImageLoad, setIsImageLoad] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { mutateAsync } = useMutation({
    mutationFn: uploadProfile,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      let values = {
        file: formData,
        id: user?._id,
      };
      setIsImageLoad(true);
      mutateAsync(values, {
        onSuccess: (data) => {
          if (data.success) {
            toast.success(data.message, toastOptions);
            updateUser(data.data);
          }
        },
      });
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleImageLoad = () => setIsImageLoad(false);

  return (
    <div className="flex justify-center py-6">
      <SEO title="Account | Profile" />
      <div className="bg-white p-0 md:p-6 w-full max-w-2xl">
        <div className="flex gap-6 flex-col md:flex-row">
          <div className="w-[130px] relative  h-fit">
            <AspectRatio ratio={1 / 1} customStyles="rounded-full">
              <img
                src={user?.image}
                alt=""
                className="rounded-full w-full h-full"
                onLoad={handleImageLoad}
              />
            </AspectRatio>
            <input
              type="file"
              accept="image/*"
              ref={inputRef}
              hidden
              onChange={handleChange}
            />
            {isImageLoad ? (
              <OverlayLoading color="rgb(59, 130, 246, 1)" />
            ) : null}
            <button
              disabled={isImageLoad}
              onClick={handleClick}
              className="absolute left-[50%] translate-y-[50%] bottom-0 -translate-x-[50%] bg-blue-100 p-2 rounded-full"
            >
              <AiOutlineCamera className="w-5 h-5 text-blue-500" />
            </button>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-medium mb-6">Basic information</h2>
            <div>
              <EmployeeForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
