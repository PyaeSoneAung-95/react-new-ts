import NewsForm from "../components/NewsForm";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";
import { toastOptions } from "../utils/toastOptions";
import { useAuth } from "../providers/AuthProvider";
import SEO from "../components/SEO";
import { Submit } from "../types/formik";

const initialValues = {
  image: "",
  title: "",
  date: new Date(),
  category: "",
  content: "",
};

const createNews = (data: FormData): Promise<CreateNewsResponse> =>
  axiosInstance.post("/api/news", data);

export default function CreateNews() {
  const { user } = useAuth();
  const { mutateAsync } = useMutation({
    mutationFn: createNews,
  });

  const handleSubmit: Submit<News> = (values, actions) => {
    const { image, ...rest } = values;
    const formData = new FormData();
    formData.append("file", image);
    formData.append("data", JSON.stringify({ ...rest, author_id: user?._id }));
    mutateAsync(formData, {
      onSuccess: (data) => {
        actions.setSubmitting(false);
        actions.resetForm();
        if (data.success) {
          toast.success(data.message, toastOptions);
        }
      },
    });
  };

  return (
    <div>
      <SEO title="Account | Create News" />
      <div className="w-full max-w-2xl m-auto md:m-0">
        <h2 className="mb-3 font-medium text-xl">Create News</h2>
        <div className="bg-white p-0 md:p-6">
          <NewsForm handleSubmit={handleSubmit} initialValues={initialValues} />
        </div>
      </div>
    </div>
  );
}
