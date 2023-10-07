import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import { AiFillCloseCircle } from "react-icons/ai";
import { BiPlus } from "react-icons/bi";
import { useMutation } from "@tanstack/react-query";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
import { useAuth } from "../../providers/AuthProvider";
import { toastOptions } from "../../utils/toastOptions";
import { Submit } from "../../types/formik";
import axiosInstance from "../../utils/axiosInstance";
import Input from "../Input";

const updateInfo = (data: User): Promise<EmployeeFormResponse> =>
  axiosInstance.put("/api/employee", data);

const formSchema = Yup.object({
  name: Yup.string().required("Username is required!"),
  email: Yup.string().required("Email address is required!"),
  phone_numbers: Yup.array().of(
    Yup.string().required("Phone number can't be empty!")
  ),
});

export default function EmployeeForm() {
  const { user, updateUser } = useAuth();
  const { mutateAsync } = useMutation({
    mutationFn: updateInfo,
  });

  const handleSubmit: Submit<User> = (values, { setSubmitting }) => {
    mutateAsync(values, {
      onSuccess: (data) => {
        setSubmitting(false);
        if (data.success) {
          toast.success(data.message, toastOptions);
          updateUser(data.data);
        }
      },
    });
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={user!}
      validationSchema={formSchema}
    >
      {({ values, isSubmitting }) => (
        <Form>
          <Input label="Username" name="name" type="text" />
          <Input label="Email address" name="email" type="email" />
          <FieldArray
            name="phone_numbers"
            render={(arrayHelpers) => (
              <>
                <div className="input-group">
                  <label className="input-label">Phone Number</label>
                  {values.phone_numbers && values.phone_numbers.length > 0
                    ? values.phone_numbers.map((_phone_number, index) => (
                        <div key={index} className="mb-3">
                          <div className="flex items-center gap-4">
                            <Field
                              name={`phone_numbers.${index}`}
                              type="tel"
                              className="input-control flex-1"
                            />
                            <button onClick={() => arrayHelpers.remove(index)}>
                              <AiFillCloseCircle className="w-8 h-8 text-red-400" />
                            </button>
                          </div>
                          <ErrorMessage
                            name={`phone_numbers.${index}`}
                            render={(message) => (
                              <span className="input-label__error">
                                {message}
                              </span>
                            )}
                          />
                        </div>
                      ))
                    : null}
                </div>
                <div>
                  <button
                    disabled={isSubmitting}
                    type="button"
                    className="text-blue-500 flex items-center"
                    onClick={() => arrayHelpers.push("")}
                  >
                    <BiPlus className="w-5 h-5 mr-1" />
                    Add phone number
                  </button>
                </div>
              </>
            )}
          />
          <div className="mt-8 ">
            <button
              type="submit"
              className="w-[120px] h-[50px] rounded-md btn-primary__light"
            >
              {isSubmitting ? (
                <ThreeDots
                  width="40px"
                  height="30px"
                  color="rgb(59, 130, 246, 1)"
                  ariaLabel="three-dots-loading"
                  wrapperClass="loadingWrapper"
                  visible={true}
                />
              ) : (
                "EDIT"
              )}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
