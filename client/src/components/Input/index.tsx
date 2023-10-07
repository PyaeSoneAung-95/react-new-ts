import { ErrorMessage, Field } from "formik";

export default function Input({ label, name, ...rest }: InputProps) {
  return (
    <div className="input-group">
      <label className="input-label">{label}</label>
      <Field name={name} {...rest} className="input-control" />
      <ErrorMessage
        name={name}
        render={(message) => (
          <span className="input-label__error">{message}</span>
        )}
      />
    </div>
  );
}
