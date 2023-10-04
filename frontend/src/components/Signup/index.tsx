import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Submit } from "../../types/formik";
import Input from "../Input";
import axiosInstance from "../../utils/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { toastOptions } from "../../utils/toastOptions";
import { ThreeDots } from "react-loader-spinner";

const signupSchema = Yup.object().shape({
  name: Yup.string().required("Username is required."),
  email: Yup.string().email().required("Email address is required."),
  password: Yup.string().required("Password is required"),
});

const signup = (data: Signup): Promise<SignupResonse> =>
  axiosInstance.post("/employee/signup", data);

export default function Signup({ handleTag }: AuthTagHandler) {
  const { mutateAsync } = useMutation({
    mutationFn: signup,
  });

  const handleSubmit: Submit<Signup> = (values, actions) => {
    mutateAsync(values, {
      onSuccess: (data) => {
        actions.setSubmitting(false);
        if (data.success) {
          toast.success(data.message, toastOptions);
          actions.resetForm();
        } else {
          toast.error(data.message, toastOptions);
        }
      },
    });
  };

  return (
    <div className="bg-white  rounded-md">
      <h2 className="text-2xl mb-6 font-medium text-blue-500">SIGN UP</h2>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
        }}
        validationSchema={signupSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Input label="Username" name="name" type="text" />
            <Input label="Email address" name="email" type="email" />
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
                "Signup"
              )}
            </button>
            <p className="mt-8">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => handleTag("login")}
                className="text-blue-500 font-semibold"
              >
                Login
              </button>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
}
