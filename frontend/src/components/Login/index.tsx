import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Submit } from "../../types/formik";
import Input from "../Input";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../providers/AuthProvider";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import { toastOptions } from "../../utils/toastOptions";
import { ThreeDots } from "react-loader-spinner";

const lgoinSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format!")
    .required("Email address is required."),
  password: Yup.string().required("Password is required."),
});

const initialValues = {
  email: "",
  password: "",
};

const login = (data: Login): Promise<LoginResponse> =>
  axiosInstance.post("/employee/login", data);

export default function Login({ handleTag }: AuthTagHandler) {
  const { updateUser } = useAuth();
  const { mutateAsync } = useMutation({
    mutationFn: login,
  });
  const handleSubmit: Submit<Login> = (values, actions) => {
    mutateAsync(values, {
      onSuccess: (data) => {
        actions.setSubmitting(false);
        if (data.success) {
          updateUser(data.user);
          toast.success(data.message, toastOptions);
        } else {
          toast.error(data.message, toastOptions);
        }
      },
    });
  };

  return (
    <div className=" bg-white rounded-md">
      <h2 className="text-2xl mb-6 font-medium text-blue-500">LOGIN</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={lgoinSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Input label="Email Address" name="email" type="email" />
            <Input label="Password" name="password" type="password" />
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-8  w-[120px] h-[50px] rounded-md btn-primary"
            >
              {isSubmitting ? (
                <ThreeDots
                  width="40px"
                  height="30px"
                  color="white"
                  ariaLabel="three-dots-loading"
                  wrapperClass="loadingWrapper"
                  visible={true}
                />
              ) : (
                "Login"
              )}
            </button>
          </Form>
        )}
      </Formik>
      <p className="mt-8">
        Don't have an account?{" "}
        <button
          type="button"
          className="text-blue-500 font-semibold"
          onClick={() => handleTag("signup")}
        >
          Sign up
        </button>
      </p>
    </div>
  );
}
