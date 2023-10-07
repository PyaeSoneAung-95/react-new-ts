import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import ImageUpload from "../ImageUpload";
import CustomDatePicker from "../CustomDatePicker";
import ContentEditor from "../ContentEditor";
import CategorySelect from "../CategorySelect";
import { ThreeDots } from "react-loader-spinner";
import { FormikFormProps } from "../../types/formik";
import Input from "../Input";

const newsFormSchema = Yup.object().shape({
  image: Yup.mixed().required("Image is required!"),
  title: Yup.string().required("Title is required!"),
  date: Yup.date().required("Date is required!"),
  category: Yup.string().required("Category is required!"),
  content: Yup.string().required("Content is required!"),
});

export default function NewsForm({
  handleSubmit,
  initialValues,
}: FormikFormProps<News>) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={newsFormSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="input-group">
            <ImageUpload name="image" />
            <ErrorMessage
              name="image"
              render={(message) => (
                <span className="input-label__error">{message}</span>
              )}
            />
          </div>
          <Input label="Title" name="title" type="text" />
          <div className="grid grid-cols-2 gap-6">
            <div className="input-group">
              <label className="input-label">Date</label>
              <CustomDatePicker name="date" />
              <ErrorMessage
                name="date"
                render={(message) => (
                  <span className="input-label__error">{message}</span>
                )}
              />
            </div>
            <div className="input-group h-fit">
              <label className="input-label">Category</label>
              <CategorySelect name="category" />
              <ErrorMessage
                name="category"
                render={(message) => (
                  <span className="input-label__error">{message}</span>
                )}
              />
            </div>
          </div>
          <div className="input-group">
            <label className="input-label">Content</label>
            <ContentEditor name="content" />
            <ErrorMessage
              name="content"
              render={(message) => (
                <span className="input-label__error">{message}</span>
              )}
            />
          </div>
          <div className="mt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary__light w-[140px] h-[50px] rounded-sm"
            >
              {isSubmitting ? (
                <ThreeDots
                  width="40px"
                  height="100%"
                  color="rgb(59, 130, 246, 1)"
                  ariaLabel="three-dots-loading"
                  wrapperClass="loadingWrapper"
                  visible={true}
                />
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
