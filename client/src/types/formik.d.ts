import { FormikHelpers } from "formik";

type Submit<T> =(values: T, actions: FormikHelpers<T>) => void;

type FormikFormProps<T> = {
    initialValues: T,
    handleSubmit: Submit<T>
}