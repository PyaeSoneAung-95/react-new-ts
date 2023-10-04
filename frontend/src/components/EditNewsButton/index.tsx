import Modal from "../Modal";
import { useState } from "react";
import NewsForm from "../NewsForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { HiOutlinePencilAlt } from "react-icons/hi";
import axiosInstance from "../../utils/axiosInstance";
import { toastOptions } from "../../utils/toastOptions";
import { Submit } from "../../types/formik";
import { useAuth } from "../../providers/AuthProvider";

const editNews = (values: FormData): Promise<DeleteNewsResponse> =>
  axiosInstance.put("/news", values);

export default function EditNewsButton({ item }: { item: NewsResponse }) {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: editNews,
  });

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const handleSubmit: Submit<News> = (values, actions) => {
    const formData = new FormData();
    if (values.image instanceof File) {
      formData.append("file", values.image);
    }
    formData.append("data", JSON.stringify(values));
    mutateAsync(formData, {
      onSuccess: (data) => {
        actions.setSubmitting(false);
        if (data.success) {
          queryClient.invalidateQueries({
            queryKey: ["news", { employeeId: user?._id }],
          });
          queryClient.invalidateQueries({
            queryKey: ["news", item._id],
            refetchType: "inactive",
          });
          toast.success(data.message, toastOptions);
          setOpen(false);
        }
      },
    });
  };

  return (
    <>
      <Modal isOpen={open} onClose={handleClose} containerStyles="max-w-2xl">
        <div>
          <h2 className="text-2xl mb-4 font-medium">Edit News</h2>
          <NewsForm
            handleSubmit={handleSubmit}
            initialValues={{ ...item, date: new Date(item.date) }}
          />
        </div>
      </Modal>
      <button
        className="p-2 bg-blue-200 text-blue-600 rounded-full"
        onClick={handleOpen}
      >
        <HiOutlinePencilAlt className="w-5 h-5" />
      </button>
    </>
  );
}
