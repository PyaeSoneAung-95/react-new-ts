//@ts-ignore
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CustomContainer from "./DatePickerContainer.js";
import { useField } from "formik";
import DatePickerHeader from "./DatePickerHeader.js";

export default function CustomDatePicker({ name }: { name: string }) {
  const [_field, meta, helpers] = useField(name);

  return (
    <DatePicker
      calendarContainer={CustomContainer}
      selected={meta.value}
      showIcon
      className="input-control"
      onChange={(date: Date) => helpers.setValue(date)}
      renderCustomHeader={(props: CustomHeaderProps) => (
        <DatePickerHeader {...props} />
      )}
    />
  );
}
