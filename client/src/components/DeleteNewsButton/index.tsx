import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";
import { toastOptions } from "../../utils/toastOptions";
import { toast } from "react-toastify";
import Modal from "../Modal";
import { useState } from "react";
import { useAuth } from "../../providers/AuthProvider";
import Icon from "../Icon";

const deleteNews = (id: string): Promise<DeleteNewsResponse> =>
  axiosInstance.delete(`/api/news/${id}`);

export default function DeleteNewsButton({ newsId }: { newsId: string }) {
  const [show, setShow] = useState<boolean>(false);
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: deleteNews,
  });

  const handleDelete = () => {
    mutateAsync(newsId, {
      onSuccess: (data) => {
        if (data.success) {
          setShow(false);
          toast.success(data.message, toastOptions);
          queryClient.invalidateQueries(["news", { employeeId: user?._id }]);
        }
      },
    });
  };

  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);

  return (
    <>
      <Modal
        isOpen={show}
        onClose={handleClose}
        containerStyles="min-w-[400px]"
      >
        <div>
          <h3 className="font-semibold text-red-500 text-xl text-center">
            Are you sure want to delete?
          </h3>
          <div className="flex justify-center gap-4 mt-6">
            <button
              className="bg-gray-200 p-3 rounded-md"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-100 text-red-500 p-3 rounded-md"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
      <button
        onClick={handleOpen}
        className="p-2 rounded-full bg-red-200 text-red-600"
      >
        <Icon name="delete" className="w-5 h-5" />
      </button>
    </>
  );
}
